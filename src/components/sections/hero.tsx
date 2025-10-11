'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AsciiAnimation, AsciiCodeBlock, AsciiParticles } from '@/components/ui/ascii-animation'
import { MatrixRain, MatrixGlitch, MatrixPulse } from '@/components/ui/matrix-animations'
import { TechIconsRain } from '@/components/ui/tech-icons-rain'
import { PERSONAL_INFO } from '@/constants'

// Animações para os elementos
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Componente de texto animado
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const textId = React.useId() // Gera ID único para cada instância do componente
  
  return (
    <motion.span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${textId}-char-${index}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: 'easeOut'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Animações ASCII de Background */}
      <AsciiAnimation density={12} />
      <AsciiCodeBlock position="top-right" />
      <AsciiCodeBlock position="bottom-left" />
      <AsciiParticles />
      
      {/* Animações Matrix de Background */}
      <MatrixRain density={20} />
      <MatrixGlitch />
      <MatrixPulse />
      
      {/* Chuva sutil de ícones de tecnologias - TEMPORARIAMENTE REMOVIDO */}
      {/* <TechIconsRain density={6} /> */}
      
      {/* Elementos decorativos */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-primary/5 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de disponibilidade */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm font-medium bg-accent/10 text-accent border-accent/20"
            >
              🟢 Disponível para novos projetos
            </Badge>
          </motion.div>

          {/* Título principal */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <AnimatedText text="Olá, eu sou" className="block" />
              <AnimatedText 
                text="Bruno Guimarães" 
                className="block text-accent" 
              />
            </h1>
          </motion.div>

          {/* Subtítulo */}
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          >
            {PERSONAL_INFO.title}
          </motion.h2>

          {/* Descrição */}
          <motion.p
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.7 }}
          >
            Desenvolvo sites e aplicações web que não apenas funcionam perfeitamente, mas que aparecem no Google e geram clientes reais para seu negócio
          </motion.p>

          {/* Botões de ação */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            {...fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <Button
              size="lg"
              className="px-8 py-3 text-lg font-medium bg-primary hover:bg-primary/90"
              asChild
            >
              <a href="#contato">
                <Mail className="mr-2 h-5 w-5" />
                Vamos conversar
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-medium"
              asChild
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </div>



      {/* Indicador de scroll com espaçamento adequado */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}