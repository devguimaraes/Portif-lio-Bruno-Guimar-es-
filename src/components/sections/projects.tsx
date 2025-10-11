'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ExternalLink, 
  Github, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Building2,
  Palette,
  Code2,
  Database,
  Zap
} from 'lucide-react'

// Dados dos projetos
const projects = [
  {
    id: 1,
    title: 'E-commerce Moderno',
    description: 'Plataforma completa de e-commerce com carrinho, pagamentos, gestão de produtos e painel administrativo.',
    image: '/api/placeholder/600/400',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
    features: [
      'Sistema de pagamentos integrado',
      'Painel administrativo completo',
      'Gestão de estoque em tempo real',
      'SEO otimizado'
    ],
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/brunoguimaraes/ecommerce',
    status: 'completed',
    year: '2024'
  },
  {
    id: 2,
    title: 'App de Delivery',
    description: 'Aplicativo mobile para delivery de comida com geolocalização, pagamentos e tracking em tempo real.',
    image: '/api/placeholder/600/400',
    category: 'mobile',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
    features: [
      'Geolocalização em tempo real',
      'Sistema de pagamentos',
      'Chat entre cliente e entregador',
      'Notificações push'
    ],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.delivery',
    githubUrl: 'https://github.com/brunoguimaraes/delivery-app',
    status: 'completed',
    year: '2024'
  },
  {
    id: 3,
    title: 'Sistema Corporativo',
    description: 'ERP completo para gestão empresarial com módulos de vendas, estoque, financeiro e relatórios.',
    image: '/api/placeholder/600/400',
    category: 'web',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Módulos integrados de gestão',
      'Relatórios avançados',
      'Sistema de permissões',
      'API REST completa'
    ],
    liveUrl: 'https://erp-demo.com',
    githubUrl: null, // Projeto privado
    status: 'completed',
    year: '2023'
  },
  {
    id: 4,
    title: 'Site Institucional Premium',
    description: 'Website institucional moderno com CMS personalizado, blog e sistema de contato.',
    image: '/api/placeholder/600/400',
    category: 'wordpress',
    technologies: ['WordPress', 'PHP', 'MySQL', 'SCSS', 'JavaScript'],
    features: [
      'CMS personalizado',
      'Blog integrado',
      'SEO otimizado',
      'Design responsivo'
    ],
    liveUrl: 'https://empresa-premium.com.br',
    githubUrl: null,
    status: 'completed',
    year: '2023'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para análise de dados com gráficos em tempo real e relatórios customizáveis.',
    image: '/api/placeholder/600/400',
    category: 'web',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSocket'],
    features: [
      'Gráficos interativos',
      'Dados em tempo real',
      'Relatórios customizáveis',
      'Exportação de dados'
    ],
    liveUrl: 'https://analytics-dashboard.vercel.app',
    githubUrl: 'https://github.com/brunoguimaraes/analytics-dashboard',
    status: 'completed',
    year: '2024'
  },
  {
    id: 6,
    title: 'Plataforma de Cursos',
    description: 'LMS completo com sistema de aulas, exercícios, certificados e pagamentos.',
    image: '/api/placeholder/600/400',
    category: 'web',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Tailwind', 'TypeScript'],
    features: [
      'Sistema de aulas em vídeo',
      'Exercícios interativos',
      'Certificados automáticos',
      'Área do aluno completa'
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/brunoguimaraes/lms-platform',
    status: 'in-progress',
    year: '2024'
  }
]

// Categorias de filtro
const categories = [
  { id: 'all', label: 'Todos', icon: Code2 },
  { id: 'web', label: 'Web Apps', icon: Globe },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'wordpress', label: 'WordPress', icon: Building2 }
]

// Status dos projetos
const statusConfig = {
  completed: { label: 'Concluído', color: 'bg-green-500' },
  'in-progress': { label: 'Em Desenvolvimento', color: 'bg-yellow-500' }
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // Filtrar projetos por categoria
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Projetos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, incluindo aplicações web, 
            mobile e soluções corporativas desenvolvidas com as mais modernas tecnologias.
          </p>
        </motion.div>

        {/* Filtros de categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                {/* Imagem do projeto */}
                <div className="relative overflow-hidden bg-muted aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Code2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Preview do Projeto</p>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant="secondary" 
                      className={`${statusConfig[project.status].color} text-white`}
                    >
                      {statusConfig[project.status].label}
                    </Badge>
                  </div>

                  {/* Overlay com links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0 
                    }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                  >
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Ver Projeto
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Código
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {project.year}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tecnologias */}
                  <div>
                    <h5 className="text-sm font-semibold mb-2">Tecnologias:</h5>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features principais */}
                  <div>
                    <h5 className="text-sm font-semibold mb-2">Principais features:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links de ação */}
                  <div className="flex gap-2 pt-2">
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1" asChild>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ver Projeto
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Código
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Gostou do que viu?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Estes são apenas alguns dos meus projetos. Vamos conversar sobre como 
            posso ajudar a transformar sua ideia em realidade.
          </p>
          <Button size="lg" asChild>
            <a href="#contact">
              Vamos Conversar
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}