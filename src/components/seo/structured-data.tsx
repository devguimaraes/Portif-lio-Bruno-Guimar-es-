// Componente para dados estruturados JSON-LD para SEO
export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bruno Guimarães',
    jobTitle: 'Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress.',
    url: 'https://brunoguimaraes.dev',
    sameAs: [
      'https://linkedin.com/in/bruno-guimaraes',
      'https://github.com/bruno-guimaraes',
      'https://instagram.com/bruno.guimaraes.dev',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'WordPress',
      'PHP',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Tailwind CSS',
      'Desenvolvimento Web',
      'E-commerce',
      'APIs REST',
      'GraphQL',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelancer',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'Brasil',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional',
      email: 'contato@brunoguimaraes.dev',
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Desenvolvimento de Aplicações Web',
        description: 'Desenvolvimento de sites, sistemas web, e-commerce e aplicações personalizadas.',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}