# 📋 PROJECT RULES - Portfolio Bruno Guimarães

> **Status**: Fase 1 - Documentação dos Padrões Atuais  
> **Versão**: 1.0.0  
> **Última Atualização**: Janeiro 2025

---

## 🎯 Objetivo

Este documento define as regras e padrões de desenvolvimento para o projeto Portfolio Bruno Guimarães, garantindo consistência, qualidade e manutenibilidade do código.

---

## 📊 Stack Tecnológica Atual

### Core Technologies
- **Next.js**: 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.7.2
- **Tailwind CSS**: 3.4.17
- **Shadcn/ui**: Componentes base
- **Framer Motion**: Animações
- **Lucide React**: Ícones

### Ferramentas de Desenvolvimento
- **ESLint**: Linting
- **Playwright**: Testes E2E
- **PostCSS**: Processamento CSS
- **Class Variance Authority (CVA)**: Variantes de componentes

---

## 🏗️ Estrutura de Diretórios

```
src/
├── app/                    # Next.js App Router (páginas)
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/
│   ├── layout/            # Componentes de layout
│   ├── sections/          # Seções da página
│   ├── seo/              # Componentes SEO
│   └── ui/               # Componentes UI reutilizáveis
├── constants/             # Constantes e dados estáticos
├── lib/                   # Utilitários e configurações
├── styles/               # Estilos adicionais
└── types/                # Definições TypeScript
```

---

## 💻 Padrões de Código Atuais

### 1. Componentes React

#### ✅ Padrão Atual - Definição de Componentes
```typescript
// ✅ USADO: function keyword
export function ComponentName({ prop1, prop2 }: Props) {
  return <div>{content}</div>
}

// ❌ NÃO USADO: arrow functions para componentes
const ComponentName = ({ prop1, prop2 }: Props) => {
  return <div>{content}</div>
}
```

#### ✅ Padrão Atual - Client Components
```typescript
// ✅ USADO: "use client" apenas quando necessário
"use client"

import React from "react"
// ... resto do componente que usa hooks ou eventos
```

#### ✅ Padrão Atual - Destructuring de Props
```typescript
// ✅ USADO: Destructuring direto
function Component({ title, description, onClick }: ComponentProps) {
  // ...
}

// ❌ NÃO USADO: props object
function Component(props: ComponentProps) {
  return <div>{props.title}</div>
}
```

### 2. Imports e Organização

#### ✅ Padrão Atual - Ordem de Imports
```typescript
// 1. React e Next.js
import React from "react"
import { motion } from "framer-motion"

// 2. Bibliotecas externas
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// 3. Componentes internos
import { TypingEffect } from "@/components/ui/typing-effect"

// 4. Constantes e tipos
import { PERSONAL_INFO } from "@/constants"
import type { ComponentProps } from "./types"
```

### 3. Styling com Tailwind CSS

#### ✅ Padrão Atual - CVA para Variantes
```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes", // classes base
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

#### ✅ Padrão Atual - Utility Classes
```typescript
// ✅ USADO: Classes utilitárias do Tailwind
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ USADO: cn() para merge de classes
import { cn } from "@/lib/utils"
<div className={cn("base-classes", conditionalClasses)}>
```

### 4. Performance e Otimização

#### ✅ Padrão Atual - Dynamic Imports
```typescript
// ✅ USADO: Dynamic imports para componentes pesados
const HeavyComponent = dynamic(
  () => import("@/components/heavy-component"),
  { ssr: false }
)
```

#### ✅ Padrão Atual - Metadata SEO
```typescript
// ✅ USADO: Metadata completa no layout
export const metadata: Metadata = {
  title: "Título da Página",
  description: "Descrição detalhada",
  keywords: "palavras, chave, relevantes",
  openGraph: { /* configuração OG */ },
  twitter: { /* configuração Twitter */ },
}
```

---

## 📝 Convenções de Nomenclatura Atuais

### Arquivos e Pastas
- **Componentes**: `kebab-case.tsx` (ex: `typing-effect.tsx`)
- **Pastas**: `kebab-case` (ex: `components/ui/`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `PERSONAL_INFO`)

### Variáveis e Funções
- **Componentes**: `PascalCase` (ex: `TypingEffect`)
- **Funções**: `camelCase` (ex: `formatCurrency`)
- **Variáveis**: `camelCase` (ex: `isLoading`)
- **Booleans**: `is/has/should/can + descriptor` (ex: `isVisible`)

---

## 🔧 Configurações Atuais

### TypeScript
- **Strict mode**: Habilitado
- **Path mapping**: `@/*` para `./src/*`
- **Target**: ES2017

### ESLint
- **Extends**: `@next/eslint-config-next`
- **Rules**: Configuração padrão Next.js

### Tailwind CSS
- **Content**: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- **Theme**: Configuração personalizada com variáveis CSS

---

## 🚀 Roadmap de Implementação

### ✅ Fase 1: Base Documentation (CONCLUÍDA)
- [x] Análise de padrões existentes
- [x] Criação do PROJECT_RULES.md
- [x] Mapeamento da estrutura atual
- [x] Definição de fases futuras

### ✅ Fase 2: Documentation & Comments (CONCLUÍDA)
- [x] Comentários em português nos componentes principais
- [x] JSDoc para funções exportadas
- [x] Templates de documentação padronizados
- [x] Validação de build e funcionamento

**Arquivos Implementados:**
- `src/lib/utils.ts` - JSDoc e comentários
- `src/components/ui/button.tsx` - JSDoc e comentários
- `src/components/ui/typing-effect.tsx` - JSDoc e comentários
- `JSDOC_TEMPLATES.md` - Templates padronizados

### 🔄 Fase 3: Quality & Validation (PRÓXIMA)
- [ ] Implementar validação com Zod
- [ ] Configurar testes unitários
- [ ] Melhorar linting (ESLint + Prettier)
- [ ] Adicionar pre-commit hooks

### 📋 Fase 4: Automation & Workflow (FUTURA)
- [ ] Scripts de desenvolvimento
- [ ] CI/CD pipeline
- [ ] Documentação automática
- [ ] Code review templates

---

## 📋 Status de Implementação

| Categoria | Status | Observações |
|-----------|--------|-------------|
| **Estrutura de Diretórios** | ✅ Implementado | Organização clara e consistente |
| **Convenções de Nomenclatura** | ✅ Implementado | Padrões bem definidos |
| **Padrões React/Next.js** | ✅ Implementado | Uso correto de hooks e componentes |
| **Organização de Imports** | ✅ Implementado | Ordem consistente |
| **Styling (Tailwind + CVA)** | ✅ Implementado | Variantes bem estruturadas |
| **Performance** | ✅ Implementado | Otimizações aplicadas |
| **SEO** | ✅ Implementado | Metadata configurado |
| **TypeScript** | ✅ Implementado | Tipagem forte |
| **Comentários em Português** | ✅ **FASE 2 CONCLUÍDA** | Implementado em componentes principais |
| **JSDoc** | ✅ **FASE 2 CONCLUÍDA** | Templates criados e aplicados |
| **Validação com Zod** | ⚠️ Parcial | Configurado mas não usado |
| **Testes** | ❌ Não implementado | **Prioridade para Fase 3** |
| **Linting Avançado** | ⚠️ Parcial | ESLint básico configurado |

---

## 🔍 Observações Importantes

### Pontos Fortes Identificados
1. **Estrutura consistente** de componentes e imports
2. **Performance otimizada** com dynamic imports
3. **SEO bem implementado** com metadata completa
4. **Styling organizado** com CVA e Tailwind
5. **TypeScript bem configurado**

### Áreas para Melhoria (Fases Futuras)
1. **Documentação**: Adicionar comentários em português
2. **Validação**: Implementar schemas Zod
3. **Testes**: Expandir além de E2E
4. **Componentes**: Alguns muito grandes (>200 linhas)

---

**📌 Nota**: Este documento será atualizado incrementalmente conforme as fases de implementação avançam.