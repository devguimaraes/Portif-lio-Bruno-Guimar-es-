/**
 * Componente de Contato - Implementação da Issue #1
 * 
 * Funcionalidades implementadas:
 * - Formulário de contato com validação Zod
 * - Integração com API route para envio de emails
 * - Campos: nome, email, assunto, mensagem
 * - Feedback visual de sucesso/erro
 * - Informações de contato e redes sociais
 * 
 * Configuração necessária:
 * - API route: /api/contact
 * - Variáveis de ambiente para email (ver .env.local)
 * - Autenticação Gmail com senha de app
 */

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";

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

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    project: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepara dados para envio conforme schema de validação
      const contactData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `${formData.project} - Orçamento`,
        message: `${formData.message}\n\nDetalhes adicionais:\n- Tipo de projeto: ${formData.project}\n- Orçamento estimado: ${formData.budget}\n- Telefone: ${formData.phone || 'Não informado'}`,
        phone: formData.phone,
      };

      // Envia para a API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          project: "",
          budget: "",
          message: "",
        });
      }, 5000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitError(error instanceof Error ? error.message : 'Erro ao enviar mensagem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente? Entre em contato e vamos transformar sua
            ideia em realidade. Respondo rapidamente e ofereço orçamento sem
            compromisso.
          </p>
        </motion.div>

        {/* Grid responsivo - apenas formulário */}
        <div className="max-w-2xl mx-auto">
          {/* Formulário de contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Solicitar Orçamento
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo com detalhes do seu projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Mensagem Enviada!
                    </h3>
                    <p className="text-muted-foreground">
                      Obrigado pelo contato. Retornarei em breve com uma
                      proposta personalizada.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Seu nome"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Assunto da sua mensagem"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">WhatsApp</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project">Tipo de projeto *</Label>
                        <select
                          id="project"
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="website">Site institucional</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="webapp">Aplicação web</option>
                          <option value="mobile">App mobile</option>
                          <option value="system">Sistema corporativo</option>
                          <option value="other">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Orçamento estimado</Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        <option value="">Selecione uma faixa...</option>
                        <option value="1000-3000">R$ 1.000 - R$ 3.000</option>
                        <option value="3000-5000">R$ 3.000 - R$ 5.000</option>
                        <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                        <option value="10000+">Acima de R$ 10.000</option>
                        <option value="discuss">Prefiro discutir</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Detalhes do projeto *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Descreva seu projeto, objetivos, funcionalidades desejadas, prazo, etc."
                        rows={5}
                        required
                      />
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{submitError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar Solicitação
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
