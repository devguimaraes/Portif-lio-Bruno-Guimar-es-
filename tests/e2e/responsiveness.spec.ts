import { test, expect } from '@playwright/test'

test.describe('Responsividade do Portfólio', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 720 },
    { name: 'Desktop Large', width: 1920, height: 1080 }
  ]

  viewports.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height })
        await page.goto('/')
      })

      test('deve carregar corretamente', async ({ page }) => {
        // Verifica se a página carrega sem erros
        await expect(page.locator('body')).toBeVisible()
        
        // Verifica se não há overflow horizontal
        const bodyWidth = await page.locator('body').boundingBox()
        expect(bodyWidth?.width).toBeLessThanOrEqual(width + 20) // 20px de tolerância
      })

      test('deve ter navegação adequada', async ({ page }) => {
        const header = page.locator('header')
        await expect(header).toBeVisible()
        
        if (width < 768) {
          // Mobile: deve ter menu hambúrguer
          const menuButton = page.locator('button[aria-label*="menu"], .menu-toggle, [data-testid="menu-toggle"]')
          if (await menuButton.count() > 0) {
            await expect(menuButton).toBeVisible()
          }
        } else {
          // Desktop: deve ter menu horizontal
          const navLinks = page.locator('nav a, header a')
          const linksCount = await navLinks.count()
          if (linksCount > 0) {
            await expect(navLinks.first()).toBeVisible()
          }
        }
      })

      test('deve ter texto legível', async ({ page }) => {
        // Verifica se os textos principais estão visíveis
        const headings = page.locator('h1, h2, h3')
        const headingsCount = await headings.count()
        
        if (headingsCount > 0) {
          for (let i = 0; i < Math.min(headingsCount, 3); i++) {
            const heading = headings.nth(i)
            await expect(heading).toBeVisible()
            
            // Verifica se o texto não está cortado
            const boundingBox = await heading.boundingBox()
            if (boundingBox) {
              expect(boundingBox.width).toBeGreaterThan(0)
              expect(boundingBox.height).toBeGreaterThan(0)
            }
          }
        }
      })

      test('deve ter imagens responsivas', async ({ page }) => {
        const images = page.locator('img')
        const imageCount = await images.count()
        
        if (imageCount > 0) {
          for (let i = 0; i < Math.min(imageCount, 3); i++) {
            const img = images.nth(i)
            const boundingBox = await img.boundingBox()
            
            if (boundingBox) {
              // Verifica se a imagem não ultrapassa a largura da viewport
              expect(boundingBox.width).toBeLessThanOrEqual(width)
              expect(boundingBox.height).toBeGreaterThan(0)
            }
          }
        }
      })

      test('deve ter botões clicáveis', async ({ page }) => {
        const buttons = page.locator('button, a[role="button"], .btn')
        const buttonCount = await buttons.count()
        
        if (buttonCount > 0) {
          const firstButton = buttons.first()
          await expect(firstButton).toBeVisible()
          
          // Verifica se o botão tem tamanho adequado para touch (mínimo 44px)
          const boundingBox = await firstButton.boundingBox()
          if (boundingBox && width < 768) {
            expect(Math.min(boundingBox.width, boundingBox.height)).toBeGreaterThanOrEqual(40)
          }
        }
      })

      test('deve ter espaçamento adequado', async ({ page }) => {
        const sections = page.locator('section, main > div')
        const sectionCount = await sections.count()
        
        if (sectionCount > 1) {
          // Verifica se há espaçamento entre seções
          const firstSection = sections.first()
          const secondSection = sections.nth(1)
          
          const firstBox = await firstSection.boundingBox()
          const secondBox = await secondSection.boundingBox()
          
          if (firstBox && secondBox) {
            const gap = secondBox.y - (firstBox.y + firstBox.height)
            expect(gap).toBeGreaterThanOrEqual(0) // Não deve haver sobreposição
          }
        }
      })

      if (width < 768) {
        test('deve ter interações touch-friendly', async ({ page }) => {
          // Testa scroll vertical
          await page.mouse.wheel(0, 500)
          await page.waitForTimeout(500)
          
          const scrollY = await page.evaluate(() => window.scrollY)
          expect(scrollY).toBeGreaterThan(0)
          
          // Testa se links são clicáveis com touch
          const links = page.locator('a')
          const linkCount = await links.count()
          
          if (linkCount > 0) {
            const firstLink = links.first()
            if (await firstLink.isVisible()) {
              // Simula toque
              await firstLink.tap()
              await page.waitForTimeout(500)
            }
          }
        })
      }

      test('deve manter funcionalidade do formulário', async ({ page }) => {
        // Navega para seção de contato
        const contactLink = page.locator('a[href="#contact"]')
        if (await contactLink.count() > 0) {
          await contactLink.click()
          await page.waitForTimeout(1000)
          
          const form = page.locator('form')
          if (await form.count() > 0) {
            await expect(form).toBeVisible()
            
            // Verifica se campos são acessíveis
            const inputs = form.locator('input, textarea')
            const inputCount = await inputs.count()
            
            if (inputCount > 0) {
              const firstInput = inputs.first()
              await expect(firstInput).toBeVisible()
              
              // Testa se é possível focar no campo
              await firstInput.focus()
              const isFocused = await firstInput.evaluate(el => document.activeElement === el)
              expect(isFocused).toBe(true)
            }
          }
        }
      })

      test('deve ter performance adequada', async ({ page }) => {
        // Mede tempo de carregamento
        const startTime = Date.now()
        await page.goto('/', { waitUntil: 'networkidle' })
        const loadTime = Date.now() - startTime
        
        // Deve carregar em menos de 5 segundos
        expect(loadTime).toBeLessThan(5000)
        
        // Verifica se não há erros de console críticos
        const errors: string[] = []
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text())
          }
        })
        
        await page.waitForTimeout(2000)
        
        // Filtra erros conhecidos/aceitáveis
        const criticalErrors = errors.filter(error => 
          !error.includes('favicon') && 
          !error.includes('404') &&
          !error.includes('net::ERR_FAILED')
        )
        
        expect(criticalErrors.length).toBe(0)
      })
    })
  })

  test.describe('Testes de Orientação', () => {
    test('deve funcionar em mudança de orientação', async ({ page }) => {
      // Inicia em portrait
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      
      // Verifica se carregou
      await expect(page.locator('body')).toBeVisible()
      
      // Muda para landscape
      await page.setViewportSize({ width: 667, height: 375 })
      await page.waitForTimeout(1000)
      
      // Verifica se ainda funciona
      await expect(page.locator('body')).toBeVisible()
      
      // Testa navegação
      const navLink = page.locator('a[href="#about"]')
      if (await navLink.count() > 0) {
        await navLink.click()
        await page.waitForTimeout(500)
      }
    })
  })

  test.describe('Testes de Zoom', () => {
    test('deve funcionar com zoom 150%', async ({ page }) => {
      await page.goto('/')
      
      // Aplica zoom de 150%
      await page.evaluate(() => {
        document.body.style.zoom = '1.5'
      })
      
      await page.waitForTimeout(1000)
      
      // Verifica se ainda é navegável
      await expect(page.locator('body')).toBeVisible()
      
      // Testa se botões ainda são clicáveis
      const buttons = page.locator('button, a')
      const buttonCount = await buttons.count()
      
      if (buttonCount > 0) {
        const firstButton = buttons.first()
        if (await firstButton.isVisible()) {
          await firstButton.click()
          await page.waitForTimeout(500)
        }
      }
    })
  })
})