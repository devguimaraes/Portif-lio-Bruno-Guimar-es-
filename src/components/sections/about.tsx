"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Database,
  Globe,
  Smartphone,
  Server,
  Palette,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { useTranslations } from "next-intl";

// Tipos para experiência profissional
interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

// Tipos para educação
interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export function About() {
  // Hook de tradução
  const t = useTranslations('about');
  
  // Gera ID único para este componente
  const componentId = React.useId();

  // Dados das skills técnicas
  const technicalSkills = [
    { name: t('skills.items.react'), level: 95, icon: Code2, color: "bg-blue-500" },
    { name: t('skills.items.typescript'), level: 90, icon: Code2, color: "bg-blue-600" },
    { name: t('skills.items.nodejs'), level: 85, icon: Server, color: "bg-green-500" },
    { name: t('skills.items.wordpress'), level: 92, icon: Globe, color: "bg-blue-700" },
    { name: t('skills.items.php'), level: 75, icon: Code2, color: "bg-purple-500" },
    { name: t('skills.items.supabase'), level: 85, icon: Database, color: "bg-green-600" },
    { name: t('skills.items.seo'), level: 99, icon: Globe, color: "bg-yellow-500" },
    { name: t('skills.items.tailwind'), level: 95, icon: Palette, color: "bg-cyan-500" },
    { name: t('skills.items.reactnative'), level: 75, icon: Smartphone, color: "bg-blue-400" },
  ];

  // Dados de experiência traduzidos
  const experiences = t.raw('experience.jobs') as Experience[];
  
  // Dados de educação traduzidos
  const education = t.raw('education.courses') as Education[];

  return (
    <section id="about" className="py-20 bg-muted/30">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Informações pessoais e resumo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t('profile.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Foto de perfil circular */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                    <img
                      src="/profile.png"
                      alt="Bruno Guimarães - Desenvolvedor Full Stack"
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <p className="text-muted-foreground">
                  {t('profile.description')}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{t('profile.experience')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{t('profile.location')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <span>{t('profile.projects')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{t('profile.status')}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('profile.specialties')}</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{t('profile.badges.webDev')}</Badge>
                    <Badge variant="secondary">{t('profile.badges.ecommerce')}</Badge>
                    <Badge variant="secondary">{t('profile.badges.apis')}</Badge>
                    <Badge variant="secondary">{t('profile.badges.wordpress')}</Badge>
                    <Badge variant="secondary">{t('profile.badges.react')}</Badge>
                    <Badge variant="secondary">{t('profile.badges.mobile')}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills técnicas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  {t('skills.title')}
                </CardTitle>
                <CardDescription>
                  {t('skills.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <skill.icon className="h-4 w-4" />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-base text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experiência profissional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t('experience.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp: Experience, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex flex-col gap-2">
                      <div>
                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                        <CardDescription className="flex flex-col gap-1 mt-1">
                          <span className="font-medium">{exp.company}</span>
                          <div className="flex items-center gap-3 text-base">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-base">
                      {exp.description}
                    </p>
                    <div>
                      <h5 className="font-semibold mb-2 text-base">
                        {t('experience.achievements')}
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                        {exp.achievements.map((achievement: string, i: number) => (
                          <li
                            key={`${componentId}-achievement-${exp.title}-${i}`}
                          >
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formação acadêmica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">{t('education.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu: Education, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="font-medium">{edu.institution}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
