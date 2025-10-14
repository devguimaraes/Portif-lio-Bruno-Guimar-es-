"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";

// Função para calcular o próximo mês automaticamente
function getNextAvailableMonth(): string {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  
  const monthName = monthNames[nextMonth.getMonth()]
  const year = nextMonth.getFullYear()
  
  return `${monthName} ${year}`
}

// Informações de contato
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "devgmrs@gmail.com",
    href: "mailto:devgmrs@gmail.com",
    description: "Respondo em até 2 horas",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 (21) 96971-5247",
    href: "https://wa.me/5521969715247",
    description: "Disponível das 9h às 18h",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "Rio de Janeiro, RJ",
    href: "#",
    description: "Atendo presencial e remoto",
  },
];

// Redes sociais
const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/devguimaraes",
    username: "@devguimaraes",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bcguimaraes/",
    username: "/in/bcguimaraes",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/brunoguimraes/",
    username: "@brunoguimraes",
  },
];

export function ContactInfo() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Grid de três colunas com espaçamento igual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contato Direto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contato Direto
                </CardTitle>
                <CardDescription>
                  Prefere falar diretamente? Use um dos canais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <contact.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {contact.label}
                        </span>
                        {contact.href !== "#" && (
                          <a
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm font-medium">{contact.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  Redes Sociais
                </CardTitle>
                <CardDescription>
                  Acompanhe meu trabalho e novidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <social.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{social.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {social.username}
                      </p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Disponibilidade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Disponibilidade
                </CardTitle>
                <CardDescription>Status atual e agendamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status atual */}
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Status atual:</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Disponível
                  </Badge>
                </div>

                {/* Informações de disponibilidade */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Novos projetos:
                    </span>
                    <span className="font-medium text-green-600">
                      Aceitando
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tempo de resposta:
                    </span>
                    <span className="font-medium">2-4 horas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Próxima vaga:</span>
                    <span className="font-medium">{getNextAvailableMonth()}</span>
                  </div>
                </div>

                {/* Botão de agendamento */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  asChild
                >
                  <a
                    href="https://calendly.com/brunoguimaraes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Reunião
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
