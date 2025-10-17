"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from 'next-intl';

// Hook para controle do tema
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
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggleTheme, mounted };
}

// Componente de navegação desktop
function DesktopNavigation() {
  const t = useTranslations('navigation')
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a
        href="#about"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t('about')}
      </a>
      <a
        href="#projects"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t('projects')}
      </a>
      <a
        href="#services"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t('services')}
      </a>
      <a
        href="#contact"
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        {t('contact')}
      </a>
    </nav>
  );
}

// Componente de navegação mobile
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation')

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('openMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <a
            href="#about"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {t('about')}
          </a>
          <a
            href="#projects"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {t('projects')}
          </a>
          <a
            href="#services"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {t('services')}
          </a>
          <a
            href="#contact"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            {t('contact')}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// Componente principal do Header
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations('navigation');

  // Detecta scroll para adicionar backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center">
              {mounted && (
                <motion.div
                  key={theme} // Força re-render quando o tema muda
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-12 h-12"
                >
                  <Image
                    src={theme === "dark" ? "/projects/LogoBruno.png" : "/projects/LogoBrunopreta.png"}
                    alt="Bruno Guimarães - Logo"
                    width={48}
                    height={48}
                    className="object-contain transition-all duration-300"
                    priority
                  />
                </motion.div>
              )}
              {!mounted && (
                <div className="w-12 h-12 bg-muted rounded animate-pulse" />
              )}
            </Link>
          </motion.div>

          {/* Navegação Desktop */}
          <DesktopNavigation />

          {/* Controles (Idioma + Tema + Menu Mobile) */}
          <div className="flex items-center space-x-2">
            {/* Seletor de idioma */}
            <LanguageSwitcher />
            
            {/* Toggle de tema */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {mounted ? (
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </motion.div>
              ) : (
                <div className="h-4 w-4" />
              )}
              <span className="sr-only">{t('toggleTheme')}</span>
            </Button>

            {/* Navegação Mobile */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
