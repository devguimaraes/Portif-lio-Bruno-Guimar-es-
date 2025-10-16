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

// Dados das skills técnicas
const technicalSkills = [
  { name: "React/Next.js", level: 95, icon: Code2, color: "bg-blue-500" },
  { name: "TypeScript", level: 90, icon: Code2, color: "bg-blue-600" },
  { name: "Node.js", level: 85, icon: Server, color: "bg-green-500" },
  { name: "WordPress", level: 92, icon: Globe, color: "bg-blue-700" },
  { name: "PHP", level: 75, icon: Code2, color: "bg-purple-500" },
  { name: "Supabase", level: 85, icon: Database, color: "bg-green-600" },
  { name: "SEO", level: 99, icon: Globe, color: "bg-yellow-500" },
  { name: "Tailwind CSS", level: 95, icon: Palette, color: "bg-cyan-500" },
  { name: "React Native", level: 75, icon: Smartphone, color: "bg-blue-400" },
];

// Experiências profissionais
const experiences = [
  {
    title: "Desenvolvedor Full Stack Freelancer",
    company: "Autônomo",
    period: "2020 - Presente",
    location: "Rio de Janeiro, RJ",
    description:
      "Desenvolvimento de aplicações web e mobile para diversos clientes, especializado em React, Next.js, WordPress e soluções personalizadas.",
    achievements: [
      "Mais de 50 projetos entregues com sucesso",
      "Desenvolvimento de e-commerces e sistemas corporativos",
      "Integração com APIs e sistemas de pagamento",
      "Otimização de performance e SEO",
    ],
  },
  {
    title: "Desenvolvedor WordPress",
    company: "Agências de Marketing",
    period: "2023 - Presente",
    location: "Rio de Janeiro, RJ",
    description:
      "Desenvolvimento de temas e plugins personalizados para WordPress, criação de sites institucionais e e-commerces.",
    achievements: [
      "Criação de mais de 30 temas personalizados",
      "Otimização de sites para performance e SEO",
      "Treinamento de equipe em WordPress",
    ],
  },
];

// Formação acadêmica
const education = [
  {
    degree: "Programador Web, Tecnologia da Informação",
    institution: "Senac RJ",
    period: "2019 - 2019",
    description:
      "Graduação profissional com 240 horas de duração, focada no desenvolvimento de sites e sistemas web. Durante o curso, adquiri conhecimentos sólidos em HTML5, CSS3, lógica de programação, JavaScript, frameworks modernos (React, Vite, NextJS, Tailwind), PHP, design responsivo e bancos de dados MySQL.",
  },
  {
    degree: "Certificações em Desenvolvimento Web",
    institution: "Alura e Cursos Online/Bootcamps",
    period: "2018 - Presente",
    description:
      "Formação continuada através da Alura e outras plataformas online, com atualização constante de certificações em React, Node.js, TypeScript, Next.js e tecnologias modernas. O foco do aprendizado está em frameworks, programação, boas práticas e acompanhamento das tendências atuais do desenvolvimento web.",
  },
];

export function About() {
  // Gera ID único para este componente
  const componentId = React.useId();

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desenvolvedor Full Stack apaixonado por criar soluções digitais
            inovadoras. Com mais de 5 anos de experiência, especializo-me em
            tecnologias modernas e entrego projetos de alta qualidade.
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
                  Perfil Profissional
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
                  Sou um desenvolvedor Full Stack com sólida experiência em
                  tecnologias front-end e back-end. Minha paixão é transformar
                  ideias em soluções digitais funcionais e elegantes.
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>5+ anos de experiência</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Rio de Janeiro, RJ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                    <span>50+ projetos entregues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>Freelancer</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Especialidades:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Desenvolvimento Web</Badge>
                    <Badge variant="secondary">E-commerce</Badge>
                    <Badge variant="secondary">APIs REST</Badge>
                    <Badge variant="secondary">WordPress</Badge>
                    <Badge variant="secondary">React/Next.js</Badge>
                    <Badge variant="secondary">Mobile Apps</Badge>
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
                  Skills Técnicas
                </CardTitle>
                <CardDescription>
                  Principais tecnologias e nível de proficiência
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
            Experiência Profissional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
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
                        Principais conquistas:
                      </h5>
                      <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
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
          <h3 className="text-2xl font-bold mb-8 text-center">Formação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
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
