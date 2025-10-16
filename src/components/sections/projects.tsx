"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  ExternalLink,
  Globe,
  Building2,
  Code2,
  Zap,
} from "lucide-react";
import { PROJECTS } from "@/constants/projects";

// Dados dos projetos
const projects = PROJECTS;

// Categorias de filtro
const categories = [
  { id: "all", label: "Todos", icon: Code2 },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "react", label: "React", icon: Code2 },
  { id: "wordpress", label: "WordPress", icon: Building2 },
];

// Status dos projetos
const statusConfig = {
  completed: { label: "Concluído", color: "bg-green-500" },
  "in-progress": { label: "Em Desenvolvimento", color: "bg-yellow-500" },
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Gera ID único para este componente
  const componentId = React.useId();

  // Filtrar projetos por categoria
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
            Uma seleção dos meus trabalhos mais recentes, incluindo aplicações
            web, mobile e soluções corporativas desenvolvidas com as mais
            modernas tecnologias.
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
              variant={selectedCategory === category.id ? "default" : "outline"}
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
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Preview do projeto ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <Code2 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Preview do Projeto
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className={`${statusConfig[project.status as keyof typeof statusConfig].color} text-white`}
                    >
                      {
                        statusConfig[
                          project.status as keyof typeof statusConfig
                        ].label
                      }
                    </Badge>
                  </div>

                  {/* Overlay com links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
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
                  </motion.div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {project.year}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-base text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tecnologias */}
                  <div>
                    <h5 className="text-base font-semibold mb-2">Tecnologias:</h5>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-base"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features principais */}
                  <div>
                    <h5 className="text-base font-semibold mb-2">
                      Principais features:
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={`${componentId}-feature-${project.id}-${i}`}
                          className="flex items-center gap-2"
                        >
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
