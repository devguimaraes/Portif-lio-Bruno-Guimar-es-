import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    // Ambiente de teste
    environment: 'jsdom',
    
    // Arquivos de setup
    setupFiles: ['./tests/setup.ts'],
    
    // Padrões de arquivos de teste
    include: [
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    
    // Excluir arquivos
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'coverage',
      'tests/e2e/**'
    ],
    
    // Configuração de cobertura
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '.next/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/node_modules/**'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Configurações globais
    globals: true,
    
    // Timeout para testes
    testTimeout: 10000,
    
    // Configuração de reporters
    reporters: ['verbose', 'json', 'html']
  },
  
  // Resolver aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/types': resolve(__dirname, './src/types'),
      '@/constants': resolve(__dirname, './src/constants')
    }
  }
})