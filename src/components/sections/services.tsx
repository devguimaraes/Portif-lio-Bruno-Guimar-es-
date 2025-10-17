"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code2,
  Globe,
  Database,
  Headphones,
  Rocket,
  Check,
  Users,
  Settings,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Services() {
  // Hook de tradução
  const t = useTranslations('servicesDetailed');
  
  // Gera ID único para este componente
  const componentId = React.useId();

  // Serviços oferecidos com traduções
  const services = [
    {
      id: 1,
      icon: Globe,
      title: t('items.webDevelopment.title'),
      description: t('items.webDevelopment.description'),
      features: (t.raw('items.webDevelopment.features') as string[]) || [],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      icon: Database,
      title: t('items.corporateSystems.title'),
      description: t('items.corporateSystems.description'),
      features: (t.raw('items.corporateSystems.features') as string[]) || [],
      technologies: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    },
    {
      id: 3,
      icon: Code2,
      title: t('items.wordpressCustom.title'),
      description: t('items.wordpressCustom.description'),
      features: (t.raw('items.wordpressCustom.features') as string[]) || [],
      technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    },
  ];

  // Processo de trabalho com traduções
  const workProcess = [
    {
      step: 1,
      title: t('workProcess.steps.briefing.title'),
      description: t('workProcess.steps.briefing.description'),
      icon: Users,
    },
    {
      step: 2,
      title: t('workProcess.steps.planning.title'),
      description: t('workProcess.steps.planning.description'),
      icon: Settings,
    },
    {
      step: 3,
      title: t('workProcess.steps.development.title'),
      description: t('workProcess.steps.development.description'),
      icon: Code2,
    },
    {
      step: 4,
      title: t('workProcess.steps.delivery.title'),
      description: t('workProcess.steps.delivery.description'),
      icon: Rocket,
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
                    <h5 className="font-semibold mb-2 text-base">{t('labels.includes')}</h5>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li
                          key={`${componentId}-feature-${service.id}-${i}`}
                          className="flex items-center gap-2 text-base text-muted-foreground"
                        >
                          <Check className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2 text-base">{t('labels.technologies')}</h5>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Processo de trabalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('workProcess.title')}
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('workProcess.subtitle')}
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
                <p className="text-lg text-muted-foreground">
                  {process.description}
                </p>
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
          <h3 className="text-2xl font-bold mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#contact">
                <Headphones className="h-4 w-4 mr-2" />
                {t('cta.requestQuote')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://wa.me/5521969715247"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cta.whatsapp')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
