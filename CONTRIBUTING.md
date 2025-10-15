# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Portfolio Bruno Guimarães**! Este documento fornece diretrizes e informações sobre como contribuir efetivamente para o projeto.

## 📋 Índice

- [🌿 Git Flow](#-git-flow)
- [🔧 Configuração do Ambiente](#-configuração-do-ambiente)
- [📝 Convenções de Commit](#-convenções-de-commit)
- [🔄 Processo de Contribuição](#-processo-de-contribuição)
- [🧪 Testes](#-testes)
- [📊 Code Review](#-code-review)
- [🎨 Padrões de Código](#-padrões-de-código)

## 🌿 Git Flow

Este projeto utiliza **Git Flow** para organizar o desenvolvimento:

### Branches Principais

- **`main`** 🌟 - Produção (sempre estável)
- **`develop`** 🚧 - Desenvolvimento (integração de features)

### Branches de Trabalho

- **`feature/nome-da-funcionalidade`** ✨ - Novas funcionalidades
- **`hotfix/nome-da-correcao`** 🐛 - Correções urgentes em produção
- **`release/v1.0.0`** 🚀 - Preparação de versões

### Fluxo de Trabalho

```bash
# 1. Clone o repositório
git clone https://github.com/devguimaraes/Portif-lio-Bruno-Guimar-es-.git

# 2. Crie uma branch de feature a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/minha-nova-funcionalidade

# 3. Desenvolva e faça commits
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# 4. Push e abra Pull Request
git push origin feature/minha-nova-funcionalidade
```

## 🔧 Configuração do Ambiente

### Pré-requisitos

- **Node.js** 20+ 
- **npm** ou **yarn**
- **Git**

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/devguimaraes/Portif-lio-Bruno-Guimar-es-.git
cd Portif-lio-Bruno-Guimar-es-

# 2. Instale as dependências
npm install

# 3. Execute o projeto em desenvolvimento
npm run dev

# 4. Execute os testes
npm run test
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run test         # Testes E2E
npm run test:ui      # Interface dos testes
npm run lint         # Verificação de código (deprecated)
```

## 📝 Convenções de Commit

Utilizamos **Conventional Commits** para padronizar as mensagens:

### Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos

- **`feat`** ✨ - Nova funcionalidade
- **`fix`** 🐛 - Correção de bug
- **`docs`** 📚 - Documentação
- **`style`** 🎨 - Formatação (não afeta lógica)
- **`refactor`** ♻️ - Refatoração
- **`test`** 🧪 - Testes
- **`chore`** 🔧 - Tarefas de build/config

### Exemplos

```bash
feat(hero): adiciona animação de typing effect
fix(navigation): corrige menu mobile responsivo
docs(readme): atualiza instruções de instalação
style(button): ajusta espaçamento dos componentes
refactor(utils): simplifica função de formatação
test(hero): adiciona testes para componente Hero
chore(deps): atualiza dependências do projeto
```

## 🔄 Processo de Contribuição

### 1. 📋 Planejamento

- Verifique se existe uma **issue** relacionada
- Se não existir, **crie uma issue** descrevendo a mudança
- Discuta a abordagem nos comentários da issue

### 2. 🚀 Desenvolvimento

```bash
# Crie uma branch específica
git checkout -b feature/nome-descritivo

# Desenvolva seguindo os padrões do projeto
# Faça commits pequenos e frequentes
git commit -m "feat: implementa funcionalidade X"

# Mantenha sua branch atualizada
git fetch origin
git rebase origin/develop
```

### 3. ✅ Validação

Antes de abrir o Pull Request:

```bash
# Execute os testes
npm run test

# Verifique o build
npm run build

# Verifique TypeScript
npx tsc --noEmit

# Verifique formatação
npx prettier --check .
```

### 4. 📤 Pull Request

- Use o **template de PR** fornecido
- Preencha **todas as seções** relevantes
- Adicione **screenshots** para mudanças visuais
- Referencie a **issue relacionada**

### 5. 🔍 Code Review

- Aguarde pelo menos **1 aprovação** (develop)
- Aguarde pelo menos **2 aprovações** (main)
- Responda aos comentários construtivamente
- Faça as correções solicitadas

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
npm run test

# Testes com interface
npm run test:ui

# Testes em modo debug
npm run test:debug

# Apenas Chrome (mais rápido)
npm run test:local
```

### Escrevendo Testes

- **Teste funcionalidades críticas**
- **Use seletores semânticos** (role, label)
- **Teste diferentes viewports**
- **Inclua casos de erro**

Exemplo:

```typescript
test('deve exibir informações do projeto corretamente', async ({ page }) => {
  await page.goto('/')
  
  // Testa se o título está visível
  await expect(page.getByRole('heading', { name: /bruno guimarães/i })).toBeVisible()
  
  // Testa responsividade
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.getByRole('button', { name: /menu/i })).toBeVisible()
})
```

## 📊 Code Review

### Para Revisores

#### ✅ Checklist de Revisão

**Funcionalidade:**
- [ ] A funcionalidade funciona conforme esperado
- [ ] Não quebra funcionalidades existentes
- [ ] Trata casos de erro adequadamente

**Código:**
- [ ] Segue os padrões do projeto
- [ ] Está bem documentado (comentários em português)
- [ ] Não tem código duplicado
- [ ] Performance adequada

**Testes:**
- [ ] Testes passam
- [ ] Cobertura adequada
- [ ] Testa casos importantes

**UI/UX:**
- [ ] Design consistente
- [ ] Responsivo
- [ ] Acessível

### Para Contribuidores

- **Seja receptivo** ao feedback
- **Faça perguntas** se não entender
- **Explique decisões** técnicas quando necessário
- **Mantenha discussões** construtivas

## 🎨 Padrões de Código

### TypeScript

```typescript
// ✅ Bom - função com JSDoc em português
/**
 * Formata valores monetários para o padrão brasileiro
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como moeda (R$ 1.234,56)
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// ❌ Ruim - sem documentação
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
```

### React Components

```typescript
// ✅ Bom - componente bem estruturado
/**
 * Componente de card de produto com informações básicas
 * Suporta diferentes variantes e ações customizáveis
 */
function ProductCard({ product, variant = 'default', onAction }: ProductCardProps) {
  // Early return para casos especiais
  if (!product) return null
  
  return (
    <div className={cn('product-card', variants[variant])}>
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
    </div>
  )
}
```

### Styling

```typescript
// ✅ Use CVA para variantes
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

## 🚨 Regras Importantes

### ❌ Não Faça

- **Push direto** para `main` ou `develop`
- **Commits** sem mensagem descritiva
- **PRs** sem testes
- **Código** sem documentação
- **Breaking changes** sem discussão

### ✅ Sempre Faça

- **Teste** suas mudanças localmente
- **Documente** código complexo
- **Siga** as convenções estabelecidas
- **Comunique** mudanças significativas
- **Seja respeitoso** nas discussões

## 🆘 Precisa de Ajuda?

- 📖 Consulte a [documentação do projeto](./README.md)
- 🐛 Abra uma [issue](https://github.com/devguimaraes/Portif-lio-Bruno-Guimar-es-/issues)
- 💬 Participe das discussões no repositório

---

**Obrigado por contribuir! 🚀**

Sua contribuição ajuda a tornar este projeto melhor para todos.