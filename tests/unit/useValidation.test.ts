import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { z } from 'zod'
import { useValidation } from '@/hooks/useValidation'

// Schema de teste simples
const testSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade deve ser pelo menos 18')
})

describe('useValidation Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Validação básica', () => {
    it('deve inicializar com estado padrão', () => {
      const { result } = renderHook(() => useValidation(testSchema))

      expect(result.current.data).toBeNull()
      expect(result.current.errors).toEqual({})
      expect(result.current.isValid).toBe(false)
      expect(result.current.isValidating).toBe(false)
    })

    it('deve validar dados válidos corretamente', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        const validationResult = result.current.validate(validData)
        expect(validationResult.isValid).toBe(true)
        expect(validationResult.data).toEqual(validData)
        expect(validationResult.errors).toEqual({})
      })
    })

    it('deve capturar erros de validação', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const invalidData = {
        name: 'J', // Muito curto
        email: 'email-invalido', // Email inválido
        age: 16 // Muito jovem
      }

      act(() => {
        const validationResult = result.current.validate(invalidData)
        expect(validationResult.isValid).toBe(false)
        expect(validationResult.data).toBeNull()
        expect(validationResult.errors).toEqual({
          name: 'Nome deve ter pelo menos 2 caracteres',
          email: 'Email inválido',
          age: 'Idade deve ser pelo menos 18'
        })
      })
    })
  })

  describe('Validação com debounce', () => {
    it('deve aplicar debounce na validação', () => {
      const { result } = renderHook(() => 
        useValidation(testSchema, { debounceMs: 500 })
      )
      
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.validateWithDebounce(validData)
      })

      // Deve estar validando imediatamente
      expect(result.current.isValidating).toBe(true)
      expect(result.current.isValid).toBe(false)

      // Avança o timer
      act(() => {
        vi.advanceTimersByTime(500)
      })

      // Agora deve ter validado
      expect(result.current.isValidating).toBe(false)
      expect(result.current.isValid).toBe(true)
      expect(result.current.data).toEqual(validData)
    })

    it('deve cancelar validação anterior no debounce', () => {
      const { result } = renderHook(() => 
        useValidation(testSchema, { debounceMs: 500 })
      )
      
      const invalidData = {
        name: 'J',
        email: 'invalid',
        age: 16
      }

      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        // Primeira validação
        result.current.validateWithDebounce(invalidData)
        
        // Segunda validação antes do debounce terminar
        vi.advanceTimersByTime(200)
        result.current.validateWithDebounce(validData)
      })

      // Avança o timer completo
      act(() => {
        vi.advanceTimersByTime(500)
      })

      // Deve ter validado apenas os dados válidos (segunda chamada)
      expect(result.current.isValid).toBe(true)
      expect(result.current.data).toEqual(validData)
    })
  })

  describe('Validação de campos específicos', () => {
    it('deve validar campo específico', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      // Estado inicial
      expect(result.current.errors).toEqual({})
      expect(result.current.isValid).toBe(false)
      
      // Valida campo específico com act
      let isValid: boolean
      act(() => {
        isValid = result.current.validateField('name', 'A')
      })
      
      // Deve retornar false imediatamente
      expect(isValid!).toBe(false)
      
      // Estado deve ser atualizado
      expect(result.current.errors.name).toBe('Nome deve ter pelo menos 2 caracteres')
      expect(result.current.isValid).toBe(false)
    })
  })

  describe('Controle de erros', () => {
    it('deve limpar todos os erros', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const invalidData = {
        name: 'J',
        email: 'invalid',
        age: 16
      }

      act(() => {
        result.current.validate(invalidData)
      })

      // Verifica se há erros
      expect(Object.keys(result.current.errors)).toHaveLength(3)

      act(() => {
        result.current.clearErrors()
      })

      // Verifica se erros foram limpos
      expect(result.current.errors).toEqual({})
    })

    it('deve limpar erro de campo específico', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const invalidData = {
        name: 'J',
        email: 'invalid',
        age: 16
      }

      act(() => {
        result.current.validate(invalidData)
      })

      // Verifica se há erro no campo name
      expect(result.current.errors.name).toBeTruthy()

      act(() => {
        result.current.clearFieldError('name')
      })

      // Verifica se erro do campo name foi limpo
      expect(result.current.errors.name).toBe('')
      // Outros erros devem permanecer
      expect(result.current.errors.email).toBeTruthy()
      expect(result.current.errors.age).toBeTruthy()
    })

    it('deve definir erro customizado', () => {
      const { result } = renderHook(() => useValidation(testSchema))

      act(() => {
        result.current.setFieldError('name', 'Erro customizado')
      })

      expect(result.current.errors.name).toBe('Erro customizado')
      expect(result.current.isValid).toBe(false)
    })
  })

  describe('Handlers de eventos', () => {
    it('deve validar no onChange quando habilitado', () => {
      const { result } = renderHook(() => 
        useValidation(testSchema, { validateOnChange: true, debounceMs: 100 })
      )
      
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.handleChange(validData)
      })

      // Deve estar validando
      expect(result.current.isValidating).toBe(true)

      act(() => {
        vi.advanceTimersByTime(100)
      })

      // Deve ter validado
      expect(result.current.isValid).toBe(true)
    })

    it('deve validar no onBlur quando habilitado', () => {
      const { result } = renderHook(() => 
        useValidation(testSchema, { validateOnBlur: true })
      )
      
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.handleBlur(validData)
      })

      // Deve ter validado imediatamente
      expect(result.current.isValid).toBe(true)
      expect(result.current.data).toEqual(validData)
    })
  })

  describe('Helpers', () => {
    it('deve verificar se campo tem erro', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const invalidData = {
        name: 'J',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.validate(invalidData)
      })

      expect(result.current.hasError('name')).toBe(true)
      expect(result.current.hasError('email')).toBe(false)
    })

    it('deve obter erro de campo específico', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      const invalidData = {
        name: 'J',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.validate(invalidData)
      })

      expect(result.current.getError('name')).toBe('Nome deve ter pelo menos 2 caracteres')
      expect(result.current.getError('email')).toBe('')
    })

    it('deve verificar se há algum erro', () => {
      const { result } = renderHook(() => useValidation(testSchema))
      
      // Sem erros inicialmente
      expect(result.current.hasAnyError).toBe(false)

      const invalidData = {
        name: 'J',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        result.current.validate(invalidData)
      })

      // Deve ter erro
      expect(result.current.hasAnyError).toBe(true)
    })
  })

  describe('Cleanup', () => {
    it('deve limpar timer no cleanup', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      
      const { result } = renderHook(() => 
        useValidation(testSchema, { debounceMs: 500 })
      )
      
      const validData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      }

      act(() => {
        // Inicia validação com debounce para criar um timer
        result.current.validateWithDebounce(validData)
      })

      act(() => {
        // Chama cleanup que deve limpar o timer
        result.current.cleanup()
      })

      expect(clearTimeoutSpy).toHaveBeenCalled()
      clearTimeoutSpy.mockRestore()
    })
  })
})