import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Configuração global para testes
beforeAll(() => {
  // Configurações que devem ser executadas antes de todos os testes
  console.log('🧪 Iniciando testes unitários...')
})

// Limpeza após cada teste
afterEach(() => {
  // Limpa o DOM após cada teste
  cleanup()
})

// Limpeza final
afterAll(() => {
  console.log('✅ Testes unitários finalizados')
})

// Mock de APIs do navegador que podem não estar disponíveis no ambiente de teste
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock do IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Mock do ResizeObserver  
const mockResizeObserver = vi.fn()
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.ResizeObserver = mockResizeObserver