import { z } from 'zod'

/**
 * Schema de validação para formulário de contato
 * Valida nome, email, assunto e mensagem com regras específicas
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  
  subject: z
    .string()
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(200, 'Assunto deve ter no máximo 200 caracteres'),
  
  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres'),
  
  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone) return true
      // Valida formato brasileiro: (11) 99999-9999 ou 11999999999
      return /^(\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{10,11})$/.test(phone)
    }, 'Telefone deve ter formato válido: (11) 99999-9999'),
})

/**
 * Schema de validação para dados de projeto
 * Usado para validar informações de projetos no portfólio
 */
export const projectSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  
  technologies: z
    .array(z.string())
    .min(1, 'Pelo menos uma tecnologia deve ser especificada')
    .max(10, 'Máximo de 10 tecnologias permitidas'),
  
  image: z
    .string()
    .url('Imagem deve ser uma URL válida')
    .optional(),
  
  demoUrl: z
    .string()
    .url('URL de demo deve ser válida')
    .optional(),
  
  githubUrl: z
    .string()
    .url('URL do GitHub deve ser válida')
    .optional(),
  
  category: z.enum(['web', 'mobile', 'desktop', 'api', 'other'], {
    errorMap: () => ({ message: 'Categoria deve ser: web, mobile, desktop, api ou other' })
  }),
  
  status: z.enum(['completed', 'in-progress', 'planned'], {
    errorMap: () => ({ message: 'Status deve ser: completed, in-progress ou planned' })
  }),
  
  featured: z.boolean().default(false),
  
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

/**
 * Schema de validação para dados pessoais/profissionais
 * Usado para validar informações do desenvolvedor
 */
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  title: z
    .string()
    .min(5, 'Título profissional deve ter pelo menos 5 caracteres')
    .max(150, 'Título profissional deve ter no máximo 150 caracteres'),
  
  bio: z
    .string()
    .min(50, 'Biografia deve ter pelo menos 50 caracteres')
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres'),
  
  email: z
    .string()
    .email('Email deve ter um formato válido'),
  
  phone: z
    .string()
    .regex(/^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/, 'Telefone deve ter formato brasileiro válido')
    .optional(),
  
  location: z
    .string()
    .min(3, 'Localização deve ter pelo menos 3 caracteres')
    .max(100, 'Localização deve ter no máximo 100 caracteres'),
  
  website: z
    .string()
    .url('Website deve ser uma URL válida')
    .optional(),
  
  socialLinks: z.object({
    github: z.string().url('GitHub deve ser uma URL válida').optional(),
    linkedin: z.string().url('LinkedIn deve ser uma URL válida').optional(),
    twitter: z.string().url('Twitter deve ser uma URL válida').optional(),
    instagram: z.string().url('Instagram deve ser uma URL válida').optional(),
  }).optional(),
  
  skills: z
    .array(z.object({
      name: z.string().min(1, 'Nome da skill é obrigatório'),
      level: z.number().min(1).max(100, 'Nível deve estar entre 1 e 100'),
      category: z.enum(['frontend', 'backend', 'mobile', 'devops', 'design', 'other'])
    }))
    .max(20, 'Máximo de 20 skills permitidas'),
})

/**
 * Schema de validação para configurações do site
 * Usado para validar configurações gerais da aplicação
 */
export const siteConfigSchema = z.object({
  title: z.string().min(1, 'Título do site é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  keywords: z.array(z.string()).max(20, 'Máximo de 20 palavras-chave'),
  author: z.string().min(1, 'Autor é obrigatório'),
  siteUrl: z.string().url('URL do site deve ser válida'),
  ogImage: z.string().url('Imagem OG deve ser uma URL válida').optional(),
  twitterHandle: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
})

// Tipos TypeScript derivados dos schemas
export type ContactFormData = z.infer<typeof contactFormSchema>
export type ProjectData = z.infer<typeof projectSchema>
export type PersonalInfoData = z.infer<typeof personalInfoSchema>
export type SiteConfigData = z.infer<typeof siteConfigSchema>

/**
 * Função utilitária para validar dados com schema específico
 * @param schema - Schema Zod para validação
 * @param data - Dados a serem validados
 * @returns Resultado da validação com dados ou erros
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      )
      return { success: false, errors }
    }
    return { success: false, errors: ['Erro de validação desconhecido'] }
  }
}

/**
 * Função utilitária para validação assíncrona com schema
 * @param schema - Schema Zod para validação
 * @param data - Dados a serem validados
 * @returns Promise com resultado da validação
 */
export async function validateDataAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: string[] }> {
  try {
    const validatedData = await schema.parseAsync(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      )
      return { success: false, errors }
    }
    return { success: false, errors: ['Erro de validação assíncrona desconhecido'] }
  }
}