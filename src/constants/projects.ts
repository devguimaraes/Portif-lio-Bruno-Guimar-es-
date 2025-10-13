// Substitua por seus projetos reais quando quiser.
// Estrutura esperada pelo componente :
// { id: number, title: string, description: string, technologies: string[], category: "web"|"mobile"|"wordpress", features: string[], status: "completed"|"in-progress", year: string, liveUrl?: string, githubUrl?: string }
export const PROJECTS = [
  {
    id: 1,
    title: "Painel de Gestão de Clínicas",
    description:
      "Aplicação web para agendamento online, gestão de pacientes e indicadores de desempenho em tempo real.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
    category: "web",
    features: [
      "Agendamento online com confirmação",
      "Dashboard de métricas",
      "Autenticação com OTP",
      "Integração com WhatsApp",
    ],
    status: "completed",
    year: "2024",
    liveUrl: "https://exemplo-clinicas.app",
    githubUrl: "https://github.com/seuusuario/clinicas-dashboard",
  },
  {
    id: 2,
    title: "E-commerce Moda Fit",
    description:
      "Loja virtual com catálogo, carrinho e checkout otimizado, focado em performance e conversão.",
    technologies: ["WordPress", "WooCommerce", "Elementor", "GA4", "SEO"],
    category: "wordpress",
    features: [
      "Checkout otimizado",
      "Integração com meios de pagamento",
      "Tags e eventos GA4",
      "Otimizações de SEO on-page",
    ],
    status: "completed",
    year: "2023",
    liveUrl: "https://exemplo-modafit.com",
  },
  {
    id: 3,
    title: "Landing Page Agência Criativa",
    description:
      "Página institucional moderna com captação de leads e integração com ferramentas de marketing.",
    technologies: ["WordPress", "Elementor", "CSS", "Cloudflare"],
    category: "wordpress",
    features: [
      "Formulário integrado",
      "PageSpeed otimizado",
      "Hospedagem e CDN",
      "SEO técnico básico",
    ],
    status: "completed",
    year: "2022",
    liveUrl: "https://exemplo-agencia.com",
  },
  {
    id: 4,
    title: "Catálogo Offline para Vendedores",
    description:
      "Aplicativo mobile de catálogo com sincronização e modo offline para equipes comerciais.",
    technologies: ["React Native", "Expo", "SQLite", "TypeScript"],
    category: "mobile",
    features: [
      "Sincronização de dados",
      "Pesquisa e filtros",
      "Favoritos e listas",
      "Modo offline",
    ],
    status: "in-progress",
    year: "2025",
  },
];
