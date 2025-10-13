# Guia de Refatoração Next.js - Auditoria e Otimização

## 📋 Contexto do Projeto

Este projeto Next.js já foi desenvolvido seguindo boas práticas modernas. O objetivo é realizar uma **auditoria técnica completa** para:

- ✅ Identificar e corrigir inconsistências
- ✅ Remover código não utilizado
- ✅ Otimizar performance
- ✅ Melhorar legibilidade e manutenibilidade
- ✅ Garantir aplicação de boas práticas em 100% do código

---

## 🎯 Objetivos Principais

### 1. Auditoria de Código
- Identificar padrões inconsistentes
- Encontrar código duplicado
- Verificar implementações que podem ser simplificadas
- Garantir convenções em todo o código

### 2. Limpeza e Otimização
- Remover imports, componentes e funções não utilizadas
- Eliminar dependências desnecessárias
- Otimizar bundle size
- Limpar console.logs e código comentado

### 3. Performance
- Verificar se otimizações estão funcionando corretamente
- Identificar gargalos de performance
- Validar Core Web Vitals

### 4. Correções Pontuais
- Corrigir bugs sutis ou edge cases
- Melhorar tratamento de erros
- Ajustar acessibilidade onde necessário

---

## 📊 Fase 1: Auditoria Automatizada (2-3 dias)

### 1.1 Análise de Código Não Utilizado

Execute as seguintes ferramentas e documente os resultados:

```bash
# Dependências não utilizadas
npx depcheck

# Arquivos não importados
npx unimported

# Exports TypeScript não utilizados
npx ts-prune

# Análise de bundle
npm run build
npx @next/bundle-analyzer
```

**Checklist:**
- [ ] Documentar todas dependências não utilizadas
- [ ] Listar componentes órfãos (arquivos não importados)
- [ ] Identificar exports TypeScript não utilizados
- [ ] Verificar código duplicado

### 1.2 Análise de Performance

```bash
# Build de produção
npm run build
npm run start

# Lighthouse (executar em produção)
npx lighthouse http://localhost:3000 --view --output=html --output-path=./lighthouse-report.html
```

**Métricas a capturar:**
- [ ] LCP (Largest Contentful Paint) - Meta: < 2.5s
- [ ] FID (First Input Delay) - Meta: < 100ms
- [ ] CLS (Cumulative Layout Shift) - Meta: < 0.1
- [ ] Lighthouse Score - Meta: > 90
- [ ] Bundle size por rota
- [ ] Tamanho total do build

### 1.3 Lint e Type Check

```bash
# Zero warnings permitidos
npm run lint -- --max-warnings 0

# Verificar erros TypeScript
npx tsc --noEmit

# Verificar formato do código
npx prettier --check "src/**/*.{ts,tsx,js,jsx}"
```

**Ações:**
- [ ] Corrigir TODOS os warnings do ESLint
- [ ] Resolver tipos `any` e tipos mal definidos
- [ ] Formatar código com Prettier
- [ ] Documentar exceções necessárias (com comentários do tipo `// eslint-disable-next-line`)

---

## 🔍 Fase 2: Auditoria Manual (3-5 dias)

### 2.1 Code Review Sistemático por Componente

**Para CADA componente, verificar:**

```typescript
// Checklist de Componente
□ Nome em PascalCase? (ex: UserProfile, not userProfile)
□ Localização correta na estrutura de pastas?
□ Props tipadas com interface TypeScript?
□ Lógica complexa extraída para hooks customizados?
□ Há duplicação com outros componentes?
□ Performance: precisa de React.memo()?
□ useCallback para funções passadas como props?
□ useMemo para cálculos pesados?
□ HTML semântico (header, main, section, etc)?
□ ARIA labels para acessibilidade?
□ Sem console.log() ou debuggers?
□ Sem código comentado desnecessário?
□ Imports organizados (externos → internos → tipos)?
□ Componente < 200 linhas? (se maior, considerar quebrar)
```

**Exemplo de componente bem estruturado:**

```typescript
// ✅ BOM EXEMPLO
import { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/lib/hooks/useUserData';
import type { UserProfileProps } from './types';

/**
 * Componente de perfil do usuário
 * @param userId - ID do usuário a ser exibido
 * @param onEdit - Callback quando usuário clica em editar
 */
export const UserProfile = memo<UserProfileProps>(({ 
  userId, 
  onEdit 
}) => {
  // 1. Hooks
  const { data, loading, error } = useUserData(userId);

  // 2. Valores derivados/computados
  const fullName = useMemo(() => 
    `${data?.firstName} ${data?.lastName}`, 
    [data]
  );

  // 3. Handlers
  const handleEditClick = useCallback(() => {
    onEdit(userId);
  }, [userId, onEdit]);

  // 4. Early returns
  if (loading) return <ProfileSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  // 5. Render
  return (
    <section className="profile" aria-label="Perfil do usuário">
      <h1>{fullName}</h1>
      <Button onClick={handleEditClick}>
        Editar Perfil
      </Button>
    </section>
  );
});

UserProfile.displayName = 'UserProfile';
```

### 2.2 Buscar Padrões Problemáticos

**Comandos úteis:**

```bash
# Encontrar console.logs esquecidos
grep -r "console\." src/ --exclude-dir=node_modules

# Encontrar TODOs/FIXMEs não resolvidos
grep -rn "TODO\|FIXME\|HACK\|XXX" src/

# Encontrar uso de <img> ao invés de <Image>
grep -rn "<img" src/

# Encontrar uso de any (TypeScript)
grep -rn ": any" src/

# Encontrar imports de lodash não otimizados
grep -rn "from 'lodash'" src/
```

**Problemas comuns a corrigir:**

```typescript
// ❌ RUIM: dependências faltando no useEffect
useEffect(() => {
  fetchData(userId);
}, []); // userId deveria estar aqui!

// ✅ BOM
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ RUIM: lógica complexa no componente
const Component = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  
  useEffect(() => {
    // 50 linhas de lógica de fetching...
  }, []);
  
  return <div>{data}</div>;
}

// ✅ BOM: extraído para hook customizado
const Component = () => {
  const { data, loading, error } = useData();
  return <div>{data}</div>;
}

// ❌ RUIM: import não otimizado
import _ from 'lodash';
import moment from 'moment';

// ✅ BOM: imports específicos
import { debounce } from 'lodash-es';
import { format } from 'date-fns';

// ❌ RUIM: <img> comum
<img src="/photo.jpg" alt="Foto" />

// ✅ BOM: Next.js Image
import Image from 'next/image';
<Image 
  src="/photo.jpg" 
  alt="Foto"
  width={500}
  height={300}
  priority={isAboveFold}
/>
```

### 2.3 Auditoria de Hooks Customizados

**Para cada hook customizado, verificar:**

- [ ] Nome começa com "use"? (ex: useUserData)
- [ ] Lógica pode ser mais genérica/reutilizável?
- [ ] Array de dependências correto em todos useEffect?
- [ ] Retorna interface clara e consistente?
- [ ] Tem JSDoc explicando uso?
- [ ] Trata erros adequadamente?

**Exemplo de hook bem feito:**

```typescript
// ✅ BOM EXEMPLO: lib/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Hook que debounce um valor
 * @param value - Valor a ser debouncado
 * @param delay - Delay em ms (padrão: 500ms)
 * @returns Valor debouncado
 * 
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### 2.4 Auditoria de Rotas (App Router)

**Para cada rota em app/, verificar:**

```typescript
// Checklist de Rota
□ É Server Component por padrão?
□ Tem metadata export para SEO?
□ Tem loading.tsx para loading state?
□ Tem error.tsx para error boundary?
□ Data fetching está otimizado (cache, revalidate)?
□ Usa Suspense para partes assíncronas?
□ Imagens têm priority se above-the-fold?
```

**Exemplo de rota otimizada:**

```typescript
// ✅ app/products/[id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/features/products/ProductDetails';
import { RelatedProducts } from '@/components/features/products/RelatedProducts';
import { ProductSkeleton } from '@/components/features/products/ProductSkeleton';

// Metadata para SEO
export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.id);
  
  if (!product) return {};
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

// Data fetching com cache
async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    next: { 
      revalidate: 3600, // ISR: revalidar a cada hora
      tags: ['products', `product-${id}`] // Para revalidação sob demanda
    },
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  
  if (!product) notFound();

  return (
    <main>
      <ProductDetails product={product} />
      
      {/* Suspense para conteúdo secundário */}
      <Suspense fallback={<ProductSkeleton />}>
        <RelatedProducts productId={params.id} />
      </Suspense>
    </main>
  );
}
```

### 2.5 Auditoria de Performance - Imagens

```bash
# Verificar todas as tags <img>
grep -rn "<img" src/

# Verificar Image sem sizes
grep -rn "<Image" src/ | grep -v "sizes="
```

**Checklist de Imagens:**
- [ ] Todas usam `next/image`?
- [ ] `sizes` definido para responsive?
- [ ] `priority` em imagens above-the-fold?
- [ ] `loading="lazy"` nas outras?
- [ ] Alt text descritivo?
- [ ] Formato otimizado (WebP/AVIF via Next.js)?

---

## 🔧 Fase 3: Correções Prioritárias (3-5 dias)

### 3.1 Remoção de Código Morto (PRIORIDADE ALTA)

**Ordem de execução (do mais seguro ao mais arriscado):**

1. **Limpar imports não utilizados**
```bash
# Auto-fix com ESLint
npx eslint --fix src/

# Ou configurar no VSCode para remover automaticamente
```

2. **Remover funções/componentes não utilizados**
```bash
# Usar resultado do ts-prune
npx ts-prune > unused-exports.txt
# Revisar e remover manualmente
```

3. **Remover dependências do package.json**
```bash
# Usar resultado do depcheck
npx depcheck
# Remover manualmente e testar
npm uninstall <package-name>
```

4. **Remover arquivos órfãos**
```bash
# Usar resultado do unimported
npx unimported
# Revisar e deletar arquivos não importados
```

**⚠️ IMPORTANTE:** Após cada remoção:
```bash
npm run build  # Verificar se build ainda funciona
npm test       # Rodar testes
```

### 3.2 Padronização e Consistência (PRIORIDADE MÉDIA)

**1. Formatar todo o código**
```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,scss,md}"
```

**2. Organizar imports em todos os arquivos**

Padrão a seguir:
```typescript
// 1. Imports externos (React, Next, libs)
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 2. Imports internos (absolute paths)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { api } from '@/lib/services/api';

// 3. Imports relativos
import { LocalComponent } from './LocalComponent';
import { helper } from '../utils';

// 4. Imports de tipos
import type { User } from '@/types/user';
import type { Props } from './types';

// 5. Imports de estilos
import styles from './Component.module.css';
```

**3. Padronizar nomenclatura**

- Componentes: `PascalCase` (UserProfile)
- Funções: `camelCase` (getUserData)
- Constantes: `UPPER_SNAKE_CASE` (API_BASE_URL)
- Arquivos de componentes: `PascalCase.tsx`
- Arquivos de utils: `camelCase.ts`
- Hooks: `useCamelCase.ts`

### 3.3 Otimizações de Performance (PRIORIDADE MÉDIA)

**Quick wins que você deve implementar:**

#### 1. Otimizar Re-renders

```typescript
// ❌ ANTES: Re-renderiza desnecessariamente
export const ExpensiveComponent = ({ data, onAction }) => {
  return <div>{/* conteúdo pesado */}</div>;
};

// ✅ DEPOIS: Memoizado
export const ExpensiveComponent = memo(({ data, onAction }) => {
  return <div>{/* conteúdo pesado */}</div>;
});

// ✅ Para callbacks
const Parent = () => {
  const handleClick = useCallback(() => {
    // lógica
  }, [/* deps */]);
  
  return <ExpensiveComponent onAction={handleClick} />;
};

// ✅ Para valores computados
const Parent = () => {
  const filteredData = useMemo(() => 
    data.filter(item => item.active),
    [data]
  );
  
  return <ExpensiveComponent data={filteredData} />;
};
```

#### 2. Lazy Loading de Componentes

```typescript
// ❌ ANTES: Carrega tudo de uma vez
import HeavyChart from '@/components/HeavyChart';
import HeavyModal from '@/components/HeavyModal';

// ✅ DEPOIS: Dynamic imports
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Se não precisa de SSR
});

const HeavyModal = dynamic(() => import('@/components/HeavyModal'));
```

#### 3. Otimizar Fontes

```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

// ✅ Configurar fontes otimizadas
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### 4. Preload de Recursos Críticos

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preload de imagens críticas */}
        <link
          rel="preload"
          href="/hero-image.jpg"
          as="image"
          type="image/jpeg"
        />
        
        {/* Preconnect para APIs externas */}
        <link rel="preconnect" href="https://api.example.com" />
        <link rel="dns-prefetch" href="https://api.example.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3.4 Melhorar Tratamento de Erros

**Implementar Error Boundaries:**

```typescript
// app/error.tsx (Error Boundary para rotas)
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log para serviço de monitoramento
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>Algo deu errado!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>404 - Página não encontrada</h2>
      <Link href="/">Voltar para home</Link>
    </div>
  );
}
```

---

## ✅ Fase 4: Validação Final (2 dias)

### 4.1 Checklist de Build

```bash
# Build limpo sem warnings
npm run build

# Deve passar sem erros
npm run lint
npm run type-check

# Testes devem passar
npm test
npm run test:coverage
```

**Requisitos mínimos:**
- [ ] Zero warnings no build
- [ ] Zero erros de TypeScript
- [ ] Todos os testes passando
- [ ] Cobertura de testes > 70% (se aplicável)

### 4.2 Comparação de Performance

**Métricas Before/After:**

```markdown
| Métrica           | Antes | Depois | Delta |
|-------------------|-------|--------|-------|
| Bundle Size (KB)  | XXX   | XXX    | -X%   |
| First Load JS     | XXX   | XXX    | -X%   |
| LCP (s)          | X.XX  | X.XX   | -X%   |
| FID (ms)         | XXX   | XXX    | -X%   |
| CLS              | 0.XX  | 0.XX   | -X%   |
| Lighthouse Score | XX    | XX     | +X    |
```

### 4.3 Checklist Final de Qualidade

**Código:**
- [ ] ✅ Zero `console.log()` em produção
- [ ] ✅ Zero código comentado desnecessário
- [ ] ✅ Zero `any` types (ou justificados)
- [ ] ✅ Zero imports não utilizados
- [ ] ✅ Todos os TODOs resolvidos ou documentados

**Performance:**
- [ ] ✅ Todas imagens usam `next/image`
- [ ] ✅ Code splitting implementado
- [ ] ✅ Fonts otimizadas
- [ ] ✅ Core Web Vitals dentro das metas

**Acessibilidade:**
- [ ] ✅ HTML semântico
- [ ] ✅ ARIA labels onde necessário
- [ ] ✅ Contraste adequado
- [ ] ✅ Navegação por teclado funcional

**SEO:**
- [ ] ✅ Metadata em todas as páginas
- [ ] ✅ robots.txt configurado
- [ ] ✅ sitemap.xml gerado

---

## 🛠️ Scripts Úteis para package.json

Adicione estes scripts para facilitar auditorias futuras:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,scss,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,scss,md}\"",
    "audit:deps": "depcheck",
    "audit:imports": "unimported",
    "audit:exports": "ts-prune",
    "audit:duplicates": "jscpd src/",
    "audit:all": "npm run audit:deps && npm run audit:imports && npm run audit:exports",
    "analyze": "ANALYZE=true next build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 📝 Template de Relatório de Auditoria

Após completar a auditoria, preencha este template:

```markdown
# Relatório de Auditoria - [Data]

## 📊 Resumo Executivo
- Arquivos analisados: XXX
- Issues encontrados: XXX
- Issues corrigidos: XXX
- Tempo total: XX dias

## 🗑️ Código Removido

### Dependências (package.json)
- [ ] `library-name` (12.5kb) - nunca importada
- [ ] `another-lib` (8.3kb) - substituída por built-in

### Componentes
- [ ] `src/components/OldModal.tsx` - substituído por NewModal
- [ ] `src/components/legacy/` - pasta inteira não usada

### Funções/Exports
- [ ] `src/utils/helper.ts::oldFunction` - não usada
- [ ] `src/lib/deprecated.ts` - arquivo inteiro

### Total Removido
- XXX linhas de código
- XXX KB de dependências
- XX arquivos

## ⚡ Performance

### Bundle Size
- **Antes:** 250kb
- **Depois:** 220kb
- **Redução:** -12% (-30kb)

### Core Web Vitals
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| LCP     | 2.1s  | 1.8s   | -14%     |
| FID     | 85ms  | 70ms   | -17%     |
| CLS     | 0.05  | 0.03   | -40%     |

### Lighthouse Score
- **Antes:** 85
- **Depois:** 93
- **Melhoria:** +8 pontos

## 🔧 Inconsistências Corrigidas

### Nomenclatura
- Renomeados 5 componentes para PascalCase
- Padronizados 8 nomes de funções

### Estrutura
- Reorganizados 12 componentes nas pastas corretas
- Criada estrutura consistente de imports

### TypeScript
- Corrigidos 15 usos de `any`
- Adicionadas interfaces em 20 componentes

### ESLint
- Corrigidos 47 warnings
- Removidos 8 `eslint-disable` desnecessários

## ✅ Otimizações Implementadas

### Imagens
- Convertidas 23 tags `<img>` para `<Image>`
- Adicionado `priority` em 5 imagens above-fold
- Definidos `sizes` em todas as imagens

### Code Splitting
- Implementado dynamic import em 8 componentes pesados
- Lazy loading de 3 bibliotecas grandes

### Memoization
- Adicionado `React.memo` em 12 componentes
- Implementado `useCallback` em 18 handlers
- Implementado `useMemo` em 9 computações

## 🚀 Próximos Passos (Opcional)

- [ ] Implementar testes E2E com Playwright
- [ ] Configurar Storybook para componentes
- [ ] Adicionar CI/CD com checks automáticos
- [ ] Implementar monitoramento de performance (Sentry, etc)
- [ ] Revisar estratégia de cache (Redis, etc)

## 📚 Lições Aprendidas

1. **O que funcionou bem:**
   - Ferramentas automatizadas economizaram muito tempo
   - Remoção de dependências não usadas reduziu 15% do bundle

2. **Desafios encontrados:**
   - Alguns componentes tinham lógica muito acoplada
   - Falta de testes dificultou algumas refatorações

3. **Recomendações para o futuro:**
   - Rodar `audit:all` semanalmente
   - Fazer code review focado em performance
   - Documentar decisões arquiteturais importantes
```

---

## 🎯 Metas de Qualidade

Seu código refatorado deve atingir:

- ✅ **Build:** Zero warnings
- ✅ **TypeScript:** Zero erros, mínimo de `any`
- ✅ **Bundle:** < 200KB first load
- ✅ **Lighthouse:** Score > 90
- ✅ **LCP:** < 2.5s
- ✅ **FID:** < 100ms
- ✅ **CLS:** < 0.1
- ✅ **Acessibilidade:** WCAG 2.1 Level AA

---

## 🔗 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Web.dev Performance](https://web.dev/performance/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)

---

## ⚠️ Avisos Importantes

1. **Sempre faça backup antes de grandes mudanças**
2. **Teste após cada remoção de código**
3. **Commits pequenos e descritivos**
4. **Code review antes de merge**
5. **Documente decisões importantes**

---

**Boa refatoração! 🚀**