"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
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

// Dados de contato com traduções
function useContactInfo() {
  const t = useTranslations('contact.info');
  
  return [
    {
      icon: Mail,
      label: t('email.label'),
      value: "devgmrs@gmail.com",
      href: "mailto:devgmrs@gmail.com",
      description: t('email.description'),
    },
    {
      icon: Phone,
      label: t('whatsapp.label'),
      value: "+55 (21) 96971-5247",
      href: "https://wa.me/5521969715247",
      description: t('whatsapp.description'),
    },
    {
      icon: MapPin,
      label: t('location.label'),
      value: t('location.value'),
      href: "#",
      description: t('location.description'),
    },
  ];
}

// Links sociais com traduções
function useSocialLinks() {
  const t = useTranslations('contact.social');
  
  return [
    {
      icon: Github,
      label: t('github.label'),
      href: "https://github.com/devguimaraes",
      username: t('github.username'),
    },
    {
      icon: Linkedin,
      label: t('linkedin.label'),
      href: "https://www.linkedin.com/in/bcguimaraes/",
      username: t('linkedin.username'),
    },
    {
      icon: Instagram,
      label: t('instagram.label'),
      href: "https://www.instagram.com/brunoguimraes/",
      username: t('instagram.username'),
    },
  ];
}

export function Contact() {
  const t = useTranslations('contact');
  const contactInfo = useContactInfo();
  const socialLinks = useSocialLinks();
  
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Simula envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contato direto */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{info.label}</h3>
                    <p className="text-foreground font-medium">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Redes sociais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Redes Sociais</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{social.label}</p>
                      <p className="text-xs text-muted-foreground">{social.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold text-primary">Disponível para projetos</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Atualmente aceitando novos projetos para início em fevereiro de 2025.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Resposta rápida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Início flexível</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário de contato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>{t('form.title')}</span>
                </CardTitle>
                <CardDescription>
                  {t('form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-green-600">
                      {t('form.success.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('form.success.message')}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('form.fields.name.label')}</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('form.fields.name.placeholder')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('form.fields.email.label')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('form.fields.email.placeholder')}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('form.fields.subject.label')}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t('form.fields.subject.placeholder')}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('form.fields.phone.label')}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t('form.fields.phone.placeholder')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project">{t('form.fields.project.label')}</Label>
                        <select
                          id="project"
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                          required
                        >
                          <option value="">{t('form.fields.project.placeholder')}</option>
                          <option value="website">{t('form.fields.project.options.website')}</option>
                          <option value="ecommerce">{t('form.fields.project.options.ecommerce')}</option>
                          <option value="webapp">{t('form.fields.project.options.webapp')}</option>
                          <option value="mobile">{t('form.fields.project.options.mobile')}</option>
                          <option value="system">{t('form.fields.project.options.system')}</option>
                          <option value="other">{t('form.fields.project.options.other')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('form.fields.budget.label')}</Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        <option value="">{t('form.fields.budget.placeholder')}</option>
                        <option value="1000-3000">{t('form.fields.budget.options.1000-3000')}</option>
                        <option value="3000-5000">{t('form.fields.budget.options.3000-5000')}</option>
                        <option value="5000-10000">{t('form.fields.budget.options.5000-10000')}</option>
                        <option value="10000+">{t('form.fields.budget.options.10000+')}</option>
                        <option value="discuss">{t('form.fields.budget.options.discuss')}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('form.fields.message.label')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('form.fields.message.placeholder')}
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
                          {t('form.submit.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t('form.submit.send')}
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
