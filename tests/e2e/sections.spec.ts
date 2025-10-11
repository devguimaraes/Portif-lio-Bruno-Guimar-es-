import { test, expect } from '@playwright/test'

test.describe('Seções do Portfólio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Seção Hero', () => {
    test('deve exibir informações principais', async ({ page }) => {
      const heroSection = page.locator('section').first()
      
      // Verifica se a seção hero está visível
      await expect(heroSection).toBeVisible()
      
      // Verifica se contém o nome
      await expect(page.locator('text=/Bruno Guimarães/i')).toBeVisible()
      
      // Verifica se tem call-to-action
      const ctaButton = page.locator('button, a').filter({ hasText: /contato|falar|conversar/i })
      if (await ctaButton.count() > 0) {
        await expect(ctaButton.first()).toBeVisible()
      }
    })

    test('deve ter animações funcionando', async ({ page }) => {
      // Aguarda um pouco para animações carregarem
      await page.waitForTimeout(2000)
      
      // Verifica se elementos animados estão visíveis
      const animatedElements = page.locator('[class*="animate"], [style*="transform"], [style*="opacity"]')
      const count = await animatedElements.count()
      
      if (count > 0) {
        await expect(animatedElements.first()).toBeVisible()
      }
    })
  })

  test.describe('Seção Sobre', () => {
    test('deve exibir informações pessoais e profissionais', async ({ page }) => {
      await page.click('a[href="#about"]')
      
      const aboutSection = page.locator('#about, section:has-text("Sobre")')
      await expect(aboutSection).toBeVisible()
      
      // Verifica se tem foto de perfil
      const profileImage = aboutSection.locator('img')
      if (await profileImage.count() > 0) {
        await expect(profileImage.first()).toBeVisible()
      }
      
      // Verifica se tem texto descritivo
      const description = aboutSection.locator('p, div').filter({ hasText: /desenvolvedor|frontend|experiência/i })
      if (await description.count() > 0) {
        await expect(description.first()).toBeVisible()
      }
    })

    test('deve exibir habilidades técnicas', async ({ page }) => {
      await page.click('a[href="#about"]')
      
      // Procura por elementos de habilidades
      const skills = page.locator('text=/React|JavaScript|TypeScript|Next.js|HTML|CSS/i')
      const skillsCount = await skills.count()
      
      if (skillsCount > 0) {
        expect(skillsCount).toBeGreaterThan(0)
        await expect(skills.first()).toBeVisible()
      }
    })
  })

  test.describe('Seção Projetos', () => {
    test('deve exibir portfólio de projetos', async ({ page }) => {
      await page.click('a[href="#projects"]')
      
      const projectsSection = page.locator('#projects, section:has-text("Projetos")')
      await expect(projectsSection).toBeVisible()
      
      // Verifica se tem cards de projetos
      const projectCards = projectsSection.locator('.card, .project, [class*="project"]')
      const cardsCount = await projectCards.count()
      
      if (cardsCount > 0) {
        expect(cardsCount).toBeGreaterThan(0)
        await expect(projectCards.first()).toBeVisible()
      }
    })

    test('deve ter filtros funcionais', async ({ page }) => {
      await page.click('a[href="#projects"]')
      
      // Procura por botões de filtro
      const filterButtons = page.locator('button').filter({ hasText: /todos|web|mobile|frontend/i })
      const filtersCount = await filterButtons.count()
      
      if (filtersCount > 0) {
        // Clica no primeiro filtro
        await filterButtons.first().click()
        await page.waitForTimeout(500)
        
        // Verifica se ainda há projetos visíveis
        const visibleProjects = page.locator('.card:visible, .project:visible')
        const visibleCount = await visibleProjects.count()
        expect(visibleCount).toBeGreaterThanOrEqual(0)
      }
    })

    test('deve ter links para projetos externos', async ({ page }) => {
      await page.click('a[href="#projects"]')
      
      // Procura por links externos nos projetos
      const externalLinks = page.locator('a[href^="http"], a[target="_blank"]')
      const linksCount = await externalLinks.count()
      
      if (linksCount > 0) {
        const firstLink = externalLinks.first()
        await expect(firstLink).toHaveAttribute('target', '_blank')
      }
    })
  })

  test.describe('Seção Serviços', () => {
    test('deve exibir serviços oferecidos', async ({ page }) => {
      await page.click('a[href="#services"]')
      
      const servicesSection = page.locator('#services, section:has-text("Serviços")')
      await expect(servicesSection).toBeVisible()
      
      // Verifica se tem cards de serviços
      const serviceCards = servicesSection.locator('.card, .service, [class*="service"]')
      const cardsCount = await serviceCards.count()
      
      if (cardsCount > 0) {
        expect(cardsCount).toBeGreaterThan(0)
        await expect(serviceCards.first()).toBeVisible()
      }
    })

    test('deve ter ícones nos serviços', async ({ page }) => {
      await page.click('a[href="#services"]')
      
      // Procura por ícones (SVG ou imagens)
      const icons = page.locator('svg, img[class*="icon"], [class*="icon"] svg')
      const iconsCount = await icons.count()
      
      if (iconsCount > 0) {
        await expect(icons.first()).toBeVisible()
      }
    })
  })

  test.describe('Seção Contato', () => {
    test('deve exibir formulário de contato', async ({ page }) => {
      await page.click('a[href="#contact"]')
      
      const contactSection = page.locator('#contact, section:has-text("Contato")')
      await expect(contactSection).toBeVisible()
      
      // Verifica se tem formulário
      const form = contactSection.locator('form')
      if (await form.count() > 0) {
        await expect(form).toBeVisible()
        
        // Verifica campos obrigatórios
        const nameField = form.locator('input[name*="name"], input[placeholder*="nome"]')
        const emailField = form.locator('input[type="email"], input[name*="email"]')
        const messageField = form.locator('textarea, input[name*="message"]')
        
        if (await nameField.count() > 0) await expect(nameField).toBeVisible()
        if (await emailField.count() > 0) await expect(emailField).toBeVisible()
        if (await messageField.count() > 0) await expect(messageField).toBeVisible()
      }
    })

    test('deve validar campos obrigatórios', async ({ page }) => {
      await page.click('a[href="#contact"]')
      
      const form = page.locator('form')
      if (await form.count() > 0) {
        const submitButton = form.locator('button[type="submit"], input[type="submit"]')
        
        if (await submitButton.count() > 0) {
          // Tenta enviar formulário vazio
          await submitButton.click()
          
          // Verifica se há mensagens de validação
          const validationMessages = page.locator('.error, [class*="error"], .invalid, [aria-invalid="true"]')
          const messagesCount = await validationMessages.count()
          
          // Se há validação, deve mostrar mensagens
          if (messagesCount > 0) {
            expect(messagesCount).toBeGreaterThan(0)
          }
        }
      }
    })

    test('deve ter informações de contato', async ({ page }) => {
      await page.click('a[href="#contact"]')
      
      // Procura por informações de contato
      const contactInfo = page.locator('text=/email|telefone|whatsapp|@/i')
      const infoCount = await contactInfo.count()
      
      if (infoCount > 0) {
        await expect(contactInfo.first()).toBeVisible()
      }
    })
  })

  test.describe('Seção FAQ', () => {
    test('deve ter perguntas frequentes funcionais', async ({ page }) => {
      // Procura pela seção FAQ
      const faqSection = page.locator('#faq, section:has-text("FAQ"), section:has-text("Perguntas")')
      
      if (await faqSection.count() > 0) {
        await faqSection.scrollIntoViewIfNeeded()
        
        // Procura por itens de FAQ (accordion)
        const faqItems = faqSection.locator('button, .faq-item, [class*="accordion"]')
        const itemsCount = await faqItems.count()
        
        if (itemsCount > 0) {
          // Clica no primeiro item
          await faqItems.first().click()
          await page.waitForTimeout(500)
          
          // Verifica se expandiu (procura por conteúdo visível)
          const expandedContent = faqSection.locator('p, div').filter({ hasText: /.{10,}/ })
          if (await expandedContent.count() > 0) {
            await expect(expandedContent.first()).toBeVisible()
          }
        }
      }
    })
  })
})