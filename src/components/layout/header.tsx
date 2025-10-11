'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Moon, Sun } from 'lucide-react'

// Hook para controle do tema
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Verifica preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return { theme, toggleTheme }
}

// Componente de navegação desktop
function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
        Sobre
      </a>
      <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
        Projetos
      </a>
      <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
        Serviços
      </a>
      <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
        Contato
      </a>
    </nav>
  )
}

// Componente de navegação mobile
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <a href="#about" className="text-lg font-medium hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="#projects" className="text-lg font-medium hover:text-primary transition-colors">
            Projetos
          </a>
          <a href="#services" className="text-lg font-medium hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#contact" className="text-lg font-medium hover:text-primary transition-colors">
            Contato
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// Componente principal do Header
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Detecta scroll para adicionar backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="text-xl font-bold text-foreground">
              Bruno<span className="text-accent">.</span>
            </a>
          </motion.div>

          {/* Navegação Desktop */}
          <DesktopNavigation />

          {/* Controles (Tema + Menu Mobile) */}
          <div className="flex items-center space-x-4">
            {/* Toggle de tema */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </motion.div>
              <span className="sr-only">Alternar tema</span>
            </Button>

            {/* Navegação Mobile */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </motion.header>
  )
}