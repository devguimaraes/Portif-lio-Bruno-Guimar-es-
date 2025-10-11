import { defineConfig, devices } from '@playwright/test'

/**
 * Configuração do Playwright para testes E2E do Portfólio Bruno Guimarães
 * Testa funcionalidades principais, responsividade e performance
 */
export default defineConfig({
  // Diretório dos testes
  testDir: './tests/e2e',
  
  // Timeout para cada teste (30 segundos)
  timeout: 30 * 1000,
  
  // Configurações globais de expect
  expect: {
    // Timeout para assertions (5 segundos)
    timeout: 5000
  },
  
  // Configuração de execução
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Configuração de relatórios
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  // Configurações globais de uso
  use: {
    // URL base do projeto
    baseURL: 'http://localhost:3000',
    
    // Configurações de trace para debug
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Configurações de navegador
    actionTimeout: 10000,
    navigationTimeout: 30000
  },

  // Projetos de teste para diferentes navegadores e dispositivos
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] }
    }
  ],

  // Servidor de desenvolvimento
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})