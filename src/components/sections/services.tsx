'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Database, 
  Zap, 
  Shield, 
  Headphones, 
  Rocket,
  Check,
  Star,
  ArrowRight,
  Clock,
  Users,
  Settings
} from 'lucide-react'

// Serviços oferecidos
const services = [
  {
    id: 1,
    icon: Globe,
    title: 'Desenvolvimento Web',
    description: 'Sites e aplicações web modernas com React, Next.js e tecnologias atuais.',
    features: [
      'Design responsivo e moderno',
      'SEO otimizado',
      'Performance de alta velocidade',
      'Integração com APIs',
      'Painel administrativo'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    startingPrice: 'R$ 2.500'
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'Aplicativos Mobile',
    description: 'Apps nativos e híbridos para iOS e Android com React Native.',
    features: [
      'Interface nativa',
      'Notificações push',
      'Integração com APIs',
      'Publicação nas lojas',
      'Suporte multiplataforma'
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    startingPrice: 'R$ 4.000'
  },
  {
    id: 3,
    icon: Database,
    title: 'Sistemas Corporativos',
    description: 'ERPs, CRMs e sistemas de gestão personalizados para sua empresa.',
    features: [
      'Módulos personalizados',
      'Relatórios avançados',
      'Sistema de permissões',
      'Integração com sistemas existentes',
      'Backup automático'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    startingPrice: 'R$ 8.000'
  },
  {
    id: 4,
    icon: Code2,
    title: 'WordPress Personalizado',
    description: 'Sites WordPress com temas e plugins desenvolvidos sob medida.',
    features: [
      'Tema 100% personalizado',
      'Plugins exclusivos',
      'Painel administrativo intuitivo',
      'SEO otimizado',
      'Treinamento incluído'
    ],
    technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
    startingPrice: 'R$ 1.800'
  }
]

// Pacotes de preços
const pricingPlans = [
  {
    id: 1,
    name: 'Básico',
    description: 'Ideal para pequenos negócios e projetos simples',
    price: 'R$ 1.500',
    period: 'projeto',
    popular: false,
    features: [
      'Site responsivo até 5 páginas',
      'Design moderno e profissional',
      'Formulário de contato',
      'SEO básico',
      'Hospedagem por 1 ano',
      '2 revisões incluídas',
      'Suporte por 30 dias'
    ],
    deliveryTime: '7-10 dias',
    buttonText: 'Começar Projeto'
  },
  {
    id: 2,
    name: 'Profissional',
    description: 'Para empresas que precisam de mais funcionalidades',
    price: 'R$ 3.500',
    period: 'projeto',
    popular: true,
    features: [
      'Site responsivo até 10 páginas',
      'Design personalizado',
      'Blog integrado',
      'SEO avançado',
      'Integração com redes sociais',
      'Painel administrativo',
      'Hospedagem por 1 ano',
      '5 revisões incluídas',
      'Suporte por 60 dias'
    ],
    deliveryTime: '15-20 dias',
    buttonText: 'Escolher Plano'
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'Soluções completas para grandes projetos',
    price: 'R$ 8.000',
    period: 'projeto',
    popular: false,
    features: [
      'Aplicação web completa',
      'Design system personalizado',
      'Múltiplas integrações',
      'Dashboard avançado',
      'Sistema de usuários',
      'API personalizada',
      'Hospedagem premium',
      'Revisões ilimitadas',
      'Suporte por 90 dias',
      'Treinamento da equipe'
    ],
    deliveryTime: '30-45 dias',
    buttonText: 'Solicitar Orçamento'
  }
]

// Processo de trabalho
const workProcess = [
  {
    step: 1,
    title: 'Briefing',
    description: 'Entendemos suas necessidades e objetivos',
    icon: Users
  },
  {
    step: 2,
    title: 'Planejamento',
    description: 'Criamos a estratégia e arquitetura do projeto',
    icon: Settings
  },
  {
    step: 3,
    title: 'Desenvolvimento',
    description: 'Codificamos sua solução com as melhores práticas',
    icon: Code2
  },
  {
    step: 4,
    title: 'Entrega',
    description: 'Testamos, otimizamos e colocamos no ar',
    icon: Rocket
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meus Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofereço soluções completas de desenvolvimento, desde sites simples até 
            sistemas corporativos complexos, sempre com foco na qualidade e resultados.
          </p>
        </motion.div>

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-sm">Inclui:</h5>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2 text-sm">Tecnologias:</h5>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">A partir de</p>
                    <p className="text-lg font-bold text-primary">{service.startingPrice}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pacotes de preços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Pacotes Populares</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha o pacote que melhor se adequa ao seu projeto e orçamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Entrega em {plan.deliveryTime}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full mt-6" 
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <a href="#contact">
                        {plan.buttonText}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Processo de trabalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Como Trabalhamos</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Um processo estruturado para garantir o sucesso do seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <process.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{process.title}</h4>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-primary/5 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Pronto para começar seu projeto?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Entre em contato para discutirmos sua ideia e criarmos algo incrível juntos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#contact">
                <Headphones className="h-4 w-4 mr-2" />
                Solicitar Orçamento
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/5521987670200" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}