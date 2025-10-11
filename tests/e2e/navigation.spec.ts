import { test, expect } from '@playwright/test'

test.describe('Navegação do Portfólio', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página inicial antes de cada teste
    await page.goto('/')
  })

  test('deve carregar a página inicial corretamente', async ({ page }) => {
    // Verifica se o título da página está correto
    await expect(page).toHaveTitle(/Bruno Guimarães/)
    
    // Verifica se elementos principais estão visíveis
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })

  test('deve navegar pelo menu principal', async ({ page }) => {
    // Testa navegação para seção Sobre
    await page.click('a[href="#about"]')
    await expect(page.locator('#about')).toBeInViewport()
    
    // Testa navegação para seção Projetos
    await page.click('a[href="#projects"]')
    await expect(page.locator('#projects')).toBeInViewport()
    
    // Testa navegação para seção Serviços
    await page.click('a[href="#services"]')
    await expect(page.locator('#services')).toBeInViewport()
    
    // Testa navegação para seção Contato
    await page.click('a[href="#contact"]')
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('deve funcionar o scroll suave', async ({ page }) => {
    // Clica no link para uma seção
    await page.click('a[href="#about"]')
    
    // Aguarda um pouco para o scroll acontecer
    await page.waitForTimeout(1000)
    
    // Verifica se a seção está visível
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('deve funcionar o logo como link para o topo', async ({ page }) => {
    // Navega para uma seção mais abaixo
    await page.click('a[href="#contact"]')
    await page.waitForTimeout(500)
    
    // Clica no logo
    await page.click('header img, header svg, .logo')
    await page.waitForTimeout(1000)
    
    // Verifica se voltou ao topo
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })

  test('deve funcionar menu responsivo em mobile', async ({ page }) => {
    // Redimensiona para mobile
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Procura pelo botão do menu hambúrguer
    const menuButton = page.locator('button[aria-label*="menu"], .menu-toggle, [data-testid="menu-toggle"]')
    
    if (await menuButton.isVisible()) {
      // Clica no menu hambúrguer
      await menuButton.click()
      
      // Verifica se o menu mobile apareceu
      const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav ul')
      await expect(mobileMenu).toBeVisible()
      
      // Testa um link do menu mobile
      await page.click('a[href="#about"]')
      await expect(page.locator('#about')).toBeInViewport()
    }
  })

  test('deve ter links externos funcionando', async ({ page }) => {
    // Procura por links externos (GitHub, LinkedIn, etc.)
    const externalLinks = page.locator('a[href^="http"], a[target="_blank"]')
    const count = await externalLinks.count()
    
    if (count > 0) {
      // Verifica se pelo menos um link externo existe
      expect(count).toBeGreaterThan(0)
      
      // Verifica se o primeiro link tem target="_blank"
      const firstLink = externalLinks.first()
      await expect(firstLink).toHaveAttribute('target', '_blank')
    }
  })

  test('deve ter elementos de acessibilidade', async ({ page }) => {
    // Verifica se existem elementos com aria-label
    const ariaElements = page.locator('[aria-label]')
    const ariaCount = await ariaElements.count()
    expect(ariaCount).toBeGreaterThan(0)
    
    // Verifica se imagens têm alt text
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})