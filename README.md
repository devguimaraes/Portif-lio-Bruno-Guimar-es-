# 🚀 Portfólio Bruno Guimarães

> **Desenvolvedor Frontend & Especialista em Marketing Digital**

Um portfólio moderno e responsivo desenvolvido com as mais recentes tecnologias web, apresentando projetos, habilidades e experiência profissional de Bruno Guimarães.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Executar](#-como-executar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎨 Design e UX](#-design-e-ux)
- [📱 Responsividade](#-responsividade)
- [⚡ Performance](#-performance)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [🚀 Deploy](#-deploy)
- [📞 Contato](#-contato)
- [📄 Licença](#-licença)

## 🎯 Sobre o Projeto

Este portfólio foi desenvolvido para apresentar de forma profissional e interativa o trabalho de **Bruno Guimarães**, desenvolvedor frontend com mais de 6 anos de experiência e especialista em marketing digital. O projeto combina design moderno, performance otimizada e experiência do usuário excepcional.

### 🎨 Características Principais

- **Design Moderno**: Interface limpa e profissional com modo escuro/claro
- **Totalmente Responsivo**: Adaptado para todos os dispositivos
- **Performance Otimizada**: Carregamento rápido e experiência fluida
- **Acessibilidade**: Seguindo as melhores práticas de acessibilidade web
- **SEO Otimizado**: Estruturado para melhor indexação nos motores de busca

## ✨ Funcionalidades

### 🏠 Seções Principais

- **Hero Section**: Apresentação impactante com call-to-action
- **Sobre Mim**: Perfil profissional detalhado com foto
- **Habilidades**: Showcase de tecnologias e competências
- **Projetos**: Portfólio de trabalhos realizados
- **Experiência**: Histórico profissional e formação
- **Serviços**: Serviços oferecidos com detalhes
- **Contato**: Formulário de contato e informações

### 🎛️ Funcionalidades Interativas

- **Tema Escuro/Claro**: Alternância entre modos de visualização
- **Animações Suaves**: Transições e efeitos com Framer Motion
- **Navegação Fluida**: Menu responsivo com scroll suave
- **Formulário de Contato**: Sistema de envio de mensagens
- **Indicadores de Progresso**: Barras de habilidades animadas

## 🛠️ Tecnologias Utilizadas

### 🎯 Core Technologies

- **[Next.js 15.5.4](https://nextjs.org/)** - Framework React com App Router
- **[React 19.1.0](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Framework CSS utility-first

### 🎨 UI/UX Libraries

- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e customizáveis
  - Avatar, Dialog, Label, Navigation Menu
  - Progress, Separator, Slot, Tabs
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e consistentes
- **[Framer Motion](https://www.framer.com/motion/)** - Animações e transições

### 🔧 Utilities & Tools

- **[Class Variance Authority](https://cva.style/)** - Gerenciamento de variantes CSS
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes
- **[Critters](https://github.com/GoogleChromeLabs/critters)** - Otimização de CSS crítico

### 🛠️ Development Tools

- **[ESLint](https://eslint.org/)** - Linting e qualidade de código
- **[Turbopack](https://turbo.build/pack)** - Bundler ultra-rápido
- **[PostCSS](https://postcss.org/)** - Processamento de CSS

## 🚀 Como Executar

### 📋 Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm**, **yarn**, **pnpm** ou **bun**

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/devguimaraes/Portif-lio-Bruno-Guimar-es-.git
   cd portfolio-bruno
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

4. **Abra no navegador**
   
   Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

### 🔄 Desenvolvimento

- O projeto utiliza **Turbopack** para compilação ultra-rápida
- Hot reload automático ao editar arquivos
- Arquivo principal: `src/app/page.tsx`

## 📁 Estrutura do Projeto

```
portfolio-bruno/
├── 📁 public/                 # Arquivos estáticos
│   ├── 🖼️ profile.jpg        # Foto de perfil
│   └── 🎨 *.svg              # Ícones e imagens SVG
├── 📁 src/
│   ├── 📁 app/               # App Router (Next.js 13+)
│   │   ├── 📄 layout.tsx     # Layout principal
│   │   ├── 📄 page.tsx       # Página inicial
│   │   └── 📄 globals.css    # Estilos globais
│   ├── 📁 components/        # Componentes React
│   │   ├── 📁 ui/           # Componentes de UI (Shadcn)
│   │   └── 📁 features/     # Componentes específicos
│   ├── 📁 lib/              # Utilitários e configurações
│   ├── 📁 hooks/            # Custom React Hooks
│   ├── 📁 services/         # Serviços e APIs
│   ├── 📁 types/            # Definições TypeScript
│   └── 📁 constants/        # Constantes da aplicação
├── 📄 components.json        # Configuração Shadcn UI
├── 📄 tailwind.config.js     # Configuração Tailwind
├── 📄 tsconfig.json         # Configuração TypeScript
└── 📄 next.config.ts        # Configuração Next.js
```

## 🎨 Design e UX

### 🎯 Princípios de Design

- **Minimalismo**: Interface limpa e focada no conteúdo
- **Consistência**: Padrões visuais uniformes em todo o site
- **Hierarquia Visual**: Organização clara da informação
- **Microinterações**: Feedback visual para ações do usuário

### 🌈 Sistema de Cores

- **Modo Claro**: Tons neutros com acentos azuis
- **Modo Escuro**: Paleta escura com contrastes otimizados
- **Acessibilidade**: Contraste WCAG AA compliant

## 📱 Responsividade

O portfólio é totalmente responsivo e otimizado para:

- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 768px - 1024px
- 💻 **Desktop**: 1024px+
- 🖥️ **Large Desktop**: 1440px+

### 🎯 Breakpoints Tailwind

```css
sm: 640px   /* Smartphones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large Desktops */
```

## ⚡ Performance

### 🚀 Otimizações Implementadas

- **Turbopack**: Bundling ultra-rápido
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Carregamento sob demanda
- **CSS Critical**: Inlining de CSS crítico
- **Font Optimization**: Carregamento otimizado de fontes

### 📊 Métricas Alvo

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting do código
npm run lint
```

## 🚀 Deploy

### 🌐 Vercel (Recomendado)

1. **Deploy automático via GitHub**
   - Conecte o repositório à Vercel
   - Deploy automático a cada push

2. **Deploy manual**
   ```bash
   npm run build
   npx vercel --prod
   ```

### 🔧 Outras Plataformas

- **Netlify**: Build command: `npm run build`
- **GitHub Pages**: Requer configuração adicional
- **Docker**: Dockerfile incluído para containerização

### 🌍 Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://seudominio.com
NEXT_PUBLIC_ANALYTICS_ID=seu-analytics-id
```

## 📞 Contato

### 👨‍💻 Bruno Guimarães

- **Portfolio**: [Em breve]
- **GitHub**: [@devguimaraes](https://github.com/devguimaraes)
- **LinkedIn**: [Bruno Guimarães](https://linkedin.com/in/bruno-guimaraes)
- **Email**: contato@brunoguimaraes.dev
- **Localização**: Rio de Janeiro, RJ

### 💼 Serviços Oferecidos

- **Desenvolvimento Frontend**: React, Next.js, Vue.js
- **Marketing Digital**: SEO, Google Ads, Analytics
- **Consultoria Web**: Performance, UX/UI, Conversão
- **Projetos Completos**: Do design ao deploy

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Desenvolvido com ❤️ por [Bruno Guimarães](https://github.com/devguimaraes)**

*Transformando ideias em experiências digitais excepcionais*

</div>
