import { describe, it, expect } from 'vitest'
import {
  contactFormSchema,
  projectSchema,
  personalInfoSchema,
  siteConfigSchema,
  validateData,
  validateDataAsync,
  type ContactFormData,
  type ProjectData
} from '@/lib/validations'

describe('Validações Zod', () => {
  describe('contactFormSchema', () => {
    it('deve validar formulário de contato válido', () => {
      const validData: ContactFormData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Solicitação de orçamento',
        message: 'Gostaria de solicitar um orçamento para desenvolvimento de site.',
        phone: '(11) 99999-9999'
      }

      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar nome muito curto', () => {
      const invalidData = {
        name: 'J',
        email: 'joao@example.com',
        subject: 'Assunto válido',
        message: 'Mensagem válida com mais de 10 caracteres.'
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Nome deve ter pelo menos 2 caracteres')
      }
    })

    it('deve rejeitar email inválido', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'email-invalido',
        subject: 'Assunto válido',
        message: 'Mensagem válida com mais de 10 caracteres.'
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Email deve ter um formato válido')
      }
    })

    it('deve validar telefone brasileiro', () => {
      const validPhones = [
        '(11) 99999-9999',
        '11999999999',
        '(21) 8888-8888',
        undefined // telefone opcional
      ]

      validPhones.forEach(phone => {
        const data = {
          name: 'João Silva',
          email: 'joao@example.com',
          subject: 'Assunto válido',
          message: 'Mensagem válida com mais de 10 caracteres.',
          phone
        }

        const result = contactFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('deve rejeitar telefone inválido', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Assunto válido',
        message: 'Mensagem válida com mais de 10 caracteres.',
        phone: '123'
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Telefone deve ter formato válido: (11) 99999-9999')
      }
    })
  })

  describe('projectSchema', () => {
    it('deve validar projeto válido', () => {
      const validProject: ProjectData = {
        id: 'projeto-1',
        title: 'Meu Projeto',
        description: 'Descrição detalhada do projeto com mais de 10 caracteres.',
        technologies: ['React', 'TypeScript', 'Next.js'],
        image: 'https://example.com/image.jpg',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/user/repo',
        category: 'web',
        status: 'completed',
        featured: true
      }

      const result = projectSchema.safeParse(validProject)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar categoria inválida', () => {
      const invalidProject = {
        id: 'projeto-1',
        title: 'Meu Projeto',
        description: 'Descrição detalhada do projeto.',
        technologies: ['React'],
        category: 'categoria-invalida',
        status: 'completed'
      }

      const result = projectSchema.safeParse(invalidProject)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Categoria deve ser: web, mobile, desktop, api ou other')
      }
    })

    it('deve rejeitar array de tecnologias vazio', () => {
      const invalidProject = {
        id: 'projeto-1',
        title: 'Meu Projeto',
        description: 'Descrição detalhada do projeto.',
        technologies: [],
        category: 'web',
        status: 'completed'
      }

      const result = projectSchema.safeParse(invalidProject)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Pelo menos uma tecnologia deve ser especificada')
      }
    })

    it('deve validar URLs opcionais', () => {
      const projectWithoutUrls = {
        id: 'projeto-1',
        title: 'Meu Projeto',
        description: 'Descrição detalhada do projeto.',
        technologies: ['React'],
        category: 'web',
        status: 'completed'
      }

      const result = projectSchema.safeParse(projectWithoutUrls)
      expect(result.success).toBe(true)
    })
  })

  describe('personalInfoSchema', () => {
    it('deve validar informações pessoais válidas', () => {
      const validInfo = {
        name: 'Bruno Guimarães',
        title: 'Desenvolvedor Full Stack',
        bio: 'Desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência em desenvolvimento web.',
        email: 'bruno@example.com',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        website: 'https://brunoguimaraes.dev',
        socialLinks: {
          github: 'https://github.com/brunoguimaraes',
          linkedin: 'https://linkedin.com/in/brunoguimaraes'
        },
        skills: [
          { name: 'React', level: 90, category: 'frontend' },
          { name: 'Node.js', level: 85, category: 'backend' }
        ]
      }

      const result = personalInfoSchema.safeParse(validInfo)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar biografia muito curta', () => {
      const invalidInfo = {
        name: 'Bruno Guimarães',
        title: 'Desenvolvedor Full Stack',
        bio: 'Bio curta',
        email: 'bruno@example.com',
        location: 'São Paulo, SP',
        skills: []
      }

      const result = personalInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Biografia deve ter pelo menos 50 caracteres')
      }
    })

    it('deve validar nível de skill entre 1 e 100', () => {
      const invalidInfo = {
        name: 'Bruno Guimarães',
        title: 'Desenvolvedor Full Stack',
        bio: 'Desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência.',
        email: 'bruno@example.com',
        location: 'São Paulo, SP',
        skills: [
          { name: 'React', level: 150, category: 'frontend' } // Nível inválido
        ]
      }

      const result = personalInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Nível deve estar entre 1 e 100')
      }
    })
  })

  describe('siteConfigSchema', () => {
    it('deve validar configuração do site válida', () => {
      const validConfig = {
        title: 'Portfolio Bruno Guimarães',
        description: 'Portfolio profissional de Bruno Guimarães, desenvolvedor full stack.',
        keywords: ['desenvolvedor', 'portfolio', 'react', 'next.js'],
        author: 'Bruno Guimarães',
        siteUrl: 'https://brunoguimaraes.dev',
        ogImage: 'https://brunoguimaraes.dev/og-image.jpg',
        twitterHandle: '@brunoguimaraes',
        googleAnalyticsId: 'GA-123456789'
      }

      const result = siteConfigSchema.safeParse(validConfig)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar URL inválida', () => {
      const invalidConfig = {
        title: 'Portfolio Bruno Guimarães',
        description: 'Portfolio profissional.',
        keywords: ['desenvolvedor'],
        author: 'Bruno Guimarães',
        siteUrl: 'url-invalida'
      }

      const result = siteConfigSchema.safeParse(invalidConfig)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('URL do site deve ser válida')
      }
    })
  })

  describe('validateData utility', () => {
    it('deve retornar sucesso para dados válidos', () => {
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Assunto válido',
        message: 'Mensagem válida com mais de 10 caracteres.'
      }

      const result = validateData(contactFormSchema, validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('João Silva')
      }
    })

    it('deve retornar erros para dados inválidos', () => {
      const invalidData = {
        name: 'J',
        email: 'email-invalido',
        subject: 'A',
        message: 'M'
      }

      const result = validateData(contactFormSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors).toHaveLength(4)
        expect(result.errors[0]).toContain('Nome deve ter pelo menos 2 caracteres')
      }
    })
  })

  describe('validateDataAsync utility', () => {
    it('deve validar dados assincronamente', async () => {
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        subject: 'Assunto válido',
        message: 'Mensagem válida com mais de 10 caracteres.'
      }

      const result = await validateDataAsync(contactFormSchema, validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('João Silva')
      }
    })

    it('deve retornar erros assincronamente', async () => {
      const invalidData = {
        name: '',
        email: 'email-invalido'
      }

      const result = await validateDataAsync(contactFormSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0)
      }
    })
  })
})