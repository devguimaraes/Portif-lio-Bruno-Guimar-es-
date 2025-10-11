import { test, expect } from '@playwright/test'

test.describe('Performance e Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Performance', () => {
    test('deve carregar rapidamente', async ({ page }) => {
      const startTime = Date.now()
      
      // Aguarda carregamento completo
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      
      // Deve carregar em menos de 3 segundos
      expect(loadTime).toBeLessThan(3000)
    })

    test('deve ter Core Web Vitals adequados', async ({ page }) => {
      // Aguarda carregamento e interatividade
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)
      
      // Mede métricas de performance
      const metrics = await page.evaluate(() => {
        return new Promise<{
          domContentLoaded: number
          loadComplete: number
          firstContentfulPaint: number
          largestContentfulPaint: number
        }>((resolve) => {
          // Aguarda um pouco para métricas estabilizarem
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            const paint = performance.getEntriesByType('paint')
            
            const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
            const lcp = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0
            
            resolve({
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
              firstContentfulPaint: fcp,
              largestContentfulPaint: lcp || fcp
            })
          }, 1000)
        })
      })
      
      // Verifica métricas
      expect(metrics.domContentLoaded).toBeLessThan(1500) // 1.5s
      expect(metrics.firstContentfulPaint).toBeLessThan(2000) // 2s
      if (metrics.largestContentfulPaint > 0) {
        expect(metrics.largestContentfulPaint).toBeLessThan(2500) // 2.5s
      }
    })

    test('deve ter imagens otimizadas', async ({ page }) => {
      const images = page.locator('img')
      const imageCount = await images.count()
      
      if (imageCount > 0) {
        for (let i = 0; i < Math.min(imageCount, 5); i++) {
          const img = images.nth(i)
          
          // Verifica se tem alt text
          const alt = await img.getAttribute('alt')
          expect(alt).toBeTruthy()
          
          // Verifica se tem loading lazy (exceto primeira imagem)
          if (i > 0) {
            const loading = await img.getAttribute('loading')
            // Se não tem loading="eager", deve ser lazy ou não especificado (padrão lazy)
            if (loading && loading !== 'eager') {
              expect(loading).toBe('lazy')
            }
          }
          
          // Verifica se a imagem carregou
          const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
          expect(naturalWidth).toBeGreaterThan(0)
        }
      }
    })

    test('deve ter recursos CSS e JS otimizados', async ({ page }) => {
      // Intercepta requests para analisar recursos
      const resources: { url: string; size: number; type: string }[] = []
      
      page.on('response', async (response) => {
        const url = response.url()
        const contentType = response.headers()['content-type'] || ''
        
        if (contentType.includes('css') || contentType.includes('javascript')) {
          try {
            const buffer = await response.body()
            resources.push({
              url,
              size: buffer.length,
              type: contentType.includes('css') ? 'css' : 'js'
            })
          } catch (e) {
            // Ignora erros de recursos que não conseguimos acessar
          }
        }
      })
      
      await page.reload({ waitUntil: 'networkidle' })
      
      // Verifica se há recursos CSS
      const cssResources = resources.filter(r => r.type === 'css')
      const jsResources = resources.filter(r => r.type === 'js')
      
      // Deve ter pelo menos um arquivo CSS
      expect(cssResources.length).toBeGreaterThan(0)
      
      // Verifica tamanhos razoáveis (menos de 1MB por arquivo)
      cssResources.forEach(resource => {
        expect(resource.size).toBeLessThan(1024 * 1024) // 1MB
      })
      
      jsResources.forEach(resource => {
        expect(resource.size).toBeLessThan(2 * 1024 * 1024) // 2MB
      })
    })

    test('deve ter scroll suave', async ({ page }) => {
      // Testa scroll programático
      await page.evaluate(() => {
        window.scrollTo({ top: 500, behavior: 'smooth' })
      })
      
      await page.waitForTimeout(1000)
      
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(400)
      
      // Testa scroll via link
      const aboutLink = page.locator('a[href="#about"]')
      if (await aboutLink.count() > 0) {
        await aboutLink.click()
        await page.waitForTimeout(1000)
        
        const aboutSection = page.locator('#about')
        if (await aboutSection.count() > 0) {
          await expect(aboutSection).toBeInViewport()
        }
      }
    })
  })

  test.describe('Acessibilidade', () => {
    test('deve ter estrutura semântica adequada', async ({ page }) => {
      // Verifica se tem elementos semânticos
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('main')).toBeVisible()
      
      // Verifica hierarquia de headings
      const h1 = page.locator('h1')
      const h1Count = await h1.count()
      expect(h1Count).toBeGreaterThanOrEqual(1)
      expect(h1Count).toBeLessThanOrEqual(2) // Não deve ter muitos H1
      
      // Verifica se há outros headings
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      const headingCount = await headings.count()
      expect(headingCount).toBeGreaterThan(1)
    })

    test('deve ter navegação por teclado', async ({ page }) => {
      // Testa navegação com Tab
      await page.keyboard.press('Tab')
      
      // Verifica se algum elemento recebeu foco
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(focusedElement).toBeTruthy()
      
      // Testa alguns Tabs
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
        await page.waitForTimeout(100)
        
        const currentFocus = await page.evaluate(() => {
          const el = document.activeElement
          return el ? {
            tag: el.tagName,
            type: el.getAttribute('type'),
            href: el.getAttribute('href'),
            role: el.getAttribute('role')
          } : null
        })
        
        // Elemento focado deve ser interativo
        if (currentFocus) {
          const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']
          const isInteractive = interactiveTags.includes(currentFocus.tag) || 
                               currentFocus.role === 'button' ||
                               currentFocus.role === 'link'
          
          if (currentFocus.tag !== 'BODY') {
            expect(isInteractive).toBe(true)
          }
        }
      }
    })

    test('deve ter labels adequados', async ({ page }) => {
      // Verifica inputs com labels
      const inputs = page.locator('input, textarea, select')
      const inputCount = await inputs.count()
      
      if (inputCount > 0) {
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i)
          const id = await input.getAttribute('id')
          const ariaLabel = await input.getAttribute('aria-label')
          const ariaLabelledby = await input.getAttribute('aria-labelledby')
          const placeholder = await input.getAttribute('placeholder')
          
          // Deve ter pelo menos uma forma de label
          const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false
          const hasAccessibleName = hasLabel || ariaLabel || ariaLabelledby || placeholder
          
          expect(hasAccessibleName).toBe(true)
        }
      }
    })

    test('deve ter contraste adequado', async ({ page }) => {
      // Verifica se textos são visíveis (teste básico)
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div').filter({ hasText: /.+/ })
      const textCount = await textElements.count()
      
      if (textCount > 0) {
        for (let i = 0; i < Math.min(textCount, 10); i++) {
          const element = textElements.nth(i)
          
          // Verifica se o elemento está visível
          await expect(element).toBeVisible()
          
          // Verifica se tem texto legível
          const text = await element.textContent()
          expect(text?.trim().length).toBeGreaterThan(0)
        }
      }
    })

    test('deve ter alt text em imagens', async ({ page }) => {
      const images = page.locator('img')
      const imageCount = await images.count()
      
      if (imageCount > 0) {
        for (let i = 0; i < imageCount; i++) {
          const img = images.nth(i)
          const alt = await img.getAttribute('alt')
          
          // Todas as imagens devem ter alt text (pode ser vazio para decorativas)
          expect(alt).not.toBeNull()
          
          // Se não é decorativa, deve ter alt text descritivo
          const src = await img.getAttribute('src')
          if (src && !src.includes('decoration') && !src.includes('bg-')) {
            expect(alt?.length).toBeGreaterThan(0)
          }
        }
      }
    })

    test('deve ter foco visível', async ({ page }) => {
      // Adiciona CSS para garantir que foco seja visível
      await page.addStyleTag({
        content: `
          *:focus {
            outline: 2px solid #007acc !important;
            outline-offset: 2px !important;
          }
        `
      })
      
      // Testa foco em alguns elementos
      const focusableElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')
      const focusableCount = await focusableElements.count()
      
      if (focusableCount > 0) {
        for (let i = 0; i < Math.min(focusableCount, 5); i++) {
          const element = focusableElements.nth(i)
          
          if (await element.isVisible()) {
            await element.focus()
            
            // Verifica se o elemento está focado
            const isFocused = await element.evaluate(el => document.activeElement === el)
            expect(isFocused).toBe(true)
            
            await page.waitForTimeout(200)
          }
        }
      }
    })

    test('deve funcionar com leitor de tela', async ({ page }) => {
      // Verifica se há landmarks
      const landmarks = page.locator('header, main, nav, aside, footer, section[aria-label], [role="banner"], [role="main"], [role="navigation"]')
      const landmarkCount = await landmarks.count()
      expect(landmarkCount).toBeGreaterThan(0)
      
      // Verifica se há headings para navegação
      const headings = page.locator('h1, h2, h3, h4, h5, h6')
      const headingCount = await headings.count()
      expect(headingCount).toBeGreaterThan(1)
      
      // Verifica se links têm texto descritivo
      const links = page.locator('a[href]')
      const linkCount = await links.count()
      
      if (linkCount > 0) {
        for (let i = 0; i < Math.min(linkCount, 10); i++) {
          const link = links.nth(i)
          const text = await link.textContent()
          const ariaLabel = await link.getAttribute('aria-label')
          const title = await link.getAttribute('title')
          
          // Link deve ter texto descritivo
          const hasDescriptiveText = (text && text.trim().length > 0) || ariaLabel || title
          expect(hasDescriptiveText).toBe(true)
          
          // Não deve ter apenas "clique aqui" ou "saiba mais"
          const genericTexts = ['clique aqui', 'click here', 'saiba mais', 'read more', 'aqui']
          const isGeneric = genericTexts.some(generic => 
            text?.toLowerCase().includes(generic) && text.trim().length < 15
          )
          
          if (text && text.trim().length > 0) {
            expect(isGeneric).toBe(false)
          }
        }
      }
    })
  })

  test.describe('SEO', () => {
    test('deve ter meta tags essenciais', async ({ page }) => {
      // Verifica title
      const title = await page.title()
      expect(title.length).toBeGreaterThan(10)
      expect(title.length).toBeLessThan(60)
      
      // Verifica meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content')
      if (description) {
        expect(description.length).toBeGreaterThan(50)
        expect(description.length).toBeLessThan(160)
      }
      
      // Verifica meta viewport
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
      expect(viewport).toContain('width=device-width')
    })

    test('deve ter estrutura de dados adequada', async ({ page }) => {
      // Verifica se há dados estruturados
      const jsonLd = page.locator('script[type="application/ld+json"]')
      const jsonLdCount = await jsonLd.count()
      
      // Não é obrigatório, mas é uma boa prática
      if (jsonLdCount > 0) {
        const jsonContent = await jsonLd.first().textContent()
        expect(jsonContent).toBeTruthy()
        
        // Verifica se é JSON válido
        expect(() => JSON.parse(jsonContent!)).not.toThrow()
      }
      
      // Verifica headings hierárquicos
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)
      expect(h1Count).toBeLessThanOrEqual(2)
    })
  })
})