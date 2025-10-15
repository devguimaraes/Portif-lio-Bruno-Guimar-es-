import { useState, useCallback } from 'react'
import { z } from 'zod'

// Interface para resultado de validação
interface ValidationResult<T> {
  data: T | null
  errors: Record<string, string>
  isValid: boolean
  isValidating: boolean
}

// Interface para opções do hook
interface UseValidationOptions {
  validateOnChange?: boolean
  validateOnBlur?: boolean
  debounceMs?: number
}

/**
 * Hook personalizado para validação de formulários com Zod
 * Fornece validação em tempo real com debounce e controle de estado
 * @param schema - Schema Zod para validação
 * @param options - Opções de configuração da validação
 * @returns Objeto com estado de validação e funções de controle
 */
export function useValidation<T>(
  schema: z.ZodSchema<T>,
  options: UseValidationOptions = {}
) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options

  // Estado da validação
  const [validationState, setValidationState] = useState<ValidationResult<T>>({
    data: null,
    errors: {},
    isValid: false, // Inicia como inválido até que seja validado
    isValidating: false
  })

  // Timer para debounce
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  // Função de validação principal
  const validateData = useCallback((data: unknown): ValidationResult<T> => {
    try {
      const validatedData = schema.parse(data)
      return {
        data: validatedData,
        errors: {},
        isValid: true,
        isValidating: false
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          fieldErrors[path] = err.message
        })

        return {
          data: null,
          errors: fieldErrors,
          isValid: false,
          isValidating: false
        }
      }
      
      return {
        data: null,
        errors: { general: 'Erro de validação desconhecido' },
        isValid: false,
        isValidating: false
      }
    }
  }, [schema])

  // Função para validar com debounce
  const validateWithDebounce = useCallback((data: unknown) => {
    // Limpa timer anterior se existir
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    // Define estado como validando
    setValidationState(prev => ({ ...prev, isValidating: true }))

    // Cria novo timer
    const timer = setTimeout(() => {
      const result = validateData(data)
      setValidationState(result)
    }, debounceMs)

    setDebounceTimer(timer)
  }, [debounceTimer, debounceMs, validateData])

  // Função para validar imediatamente
  const validateImmediate = useCallback((data: unknown) => {
    const result = validateData(data)
    setValidationState(result)
    return result
  }, [validateData])

  // Função para validar campo específico
  const validateField = useCallback((fieldName: string, value: unknown, allData?: unknown) => {
    try {
      // Se allData foi fornecido, valida o objeto completo
      if (allData) {
        const result = validateData(allData)
        
        setValidationState(prev => {
          const newErrors = { ...prev.errors }
          if (result.errors[fieldName]) {
            newErrors[fieldName] = result.errors[fieldName]
          } else {
            delete newErrors[fieldName]
          }
          
          return {
            ...prev,
            errors: newErrors,
            isValid: !result.errors[fieldName]
          }
        })
        
        return !result.errors[fieldName]
      }
      
      // Se allData não foi fornecido, valida apenas o campo específico
      // Extrai o schema do campo específico usando type assertion mais segura
      const objectSchema = schema as unknown as z.ZodObject<Record<string, z.ZodTypeAny>>
      const fieldSchema = objectSchema.shape[fieldName]
      if (!fieldSchema) {
        return false
      }
      
      // Valida apenas o campo
      const fieldResult = fieldSchema.safeParse(value)
      const hasError = !fieldResult.success
      const errorMessage = hasError ? fieldResult.error.errors[0]?.message : undefined
      
      setValidationState(prev => {
        const newErrors = { ...prev.errors }
        if (errorMessage) {
          newErrors[fieldName] = errorMessage
        } else {
          delete newErrors[fieldName]
        }
        
        return {
          ...prev,
          errors: newErrors,
          isValid: !hasError
        }
      })
      
      return !hasError
    } catch {
      return false
    }
  }, [validateData, schema])

  // Função para limpar erros
  const clearErrors = useCallback(() => {
    setValidationState(prev => ({
      ...prev,
      errors: {}
    }))
  }, [])

  // Função para limpar erro específico
  const clearFieldError = useCallback((fieldName: string) => {
    setValidationState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: ''
      }
    }))
  }, [])

  // Função para definir erro customizado
  const setFieldError = useCallback((fieldName: string, message: string) => {
    setValidationState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: message
      },
      isValid: false
    }))
  }, [])

  // Handlers para eventos de formulário
  const handleChange = useCallback((data: unknown) => {
    if (validateOnChange) {
      validateWithDebounce(data)
    }
  }, [validateOnChange, validateWithDebounce])

  const handleBlur = useCallback((data: unknown) => {
    if (validateOnBlur) {
      validateImmediate(data)
    }
  }, [validateOnBlur, validateImmediate])

  // Cleanup do timer no unmount
  const cleanup = useCallback(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      setDebounceTimer(null)
    }
  }, [debounceTimer])

  return {
    // Estado
    ...validationState,
    
    // Funções de validação
    validate: validateImmediate,
    validateWithDebounce,
    validateField,
    
    // Funções de controle de erros
    clearErrors,
    clearFieldError,
    setFieldError,
    
    // Handlers para eventos
    handleChange,
    handleBlur,
    
    // Utilitários
    cleanup,
    
    // Helpers
    hasError: (fieldName: string) => !!validationState.errors[fieldName],
    getError: (fieldName: string) => validationState.errors[fieldName] || '',
    hasAnyError: Object.keys(validationState.errors).some(key => 
      validationState.errors[key] && validationState.errors[key].length > 0
    )
  }
}