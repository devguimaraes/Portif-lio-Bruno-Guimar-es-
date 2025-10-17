"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Hook para controle do tema (mesmo padrão do header)
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marca como montado para evitar hidratação
    setMounted(true);

    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
  }, []);

  return { theme, mounted };
}

export function Footer() {
  const { theme, mounted } = useTheme();
  const t = useTranslations();

  // Links de navegação do rodapé usando traduções
  const FOOTER_NAVIGATION_ITEMS = [
    { href: "#about", label: t('footer.navigation.about') },
    { href: "#projects", label: t('footer.navigation.projects') },
    { href: "#services", label: t('footer.navigation.services') },
    { href: "#contact", label: t('footer.navigation.contact') },
  ] as const;

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding e descrição */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo acima do nome */}
              {mounted && (
                <div className="flex justify-center lg:justify-start mb-3">
                  <Image
                    src={
                      theme === "dark"
                        ? "/projects/LogoBruno.png"
                        : "/projects/LogoBrunopreta.png"
                    }
                    alt="Logo Bruno Guimarães"
                    width={80}
                    height={80}
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-4 text-center lg:text-left">Bruno Guimarães</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {t('footer.description')}
              </p>

              {/* Links sociais */}
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/devguimaraes"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/bcguimaraes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="mailto:devgmrs@gmail.com" aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Navegação rápida */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{t('footer.navigation.title')}</h4>
              <ul className="space-y-2">
                {FOOTER_NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contato */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{t('footer.contact.title')}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-base text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>(21) 96971-5247</span>
                </div>
                <div className="flex items-center space-x-2 text-base text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>devgmrs@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-base text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Rio de Janeiro, RJ</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-base text-muted-foreground"
        >
          <p>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
