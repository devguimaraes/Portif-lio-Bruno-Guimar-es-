'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Símbolos ASCII relacionados a programação e tecnologia
const ASCII_SYMBOLS = [
  '{ }', '< >', '[ ]', '( )', 
  '</>', '<div>', '<h1>', '<p>',
  'fn()', 'var', 'let', 'const',
  '===', '!==', '=>', '&&',
  'npm', 'git', 'css', 'js',
  '01', '10', '11', '00',
  '++', '--', '+=', '-=',
  'if', 'for', 'map', 'filter'
]

interface FloatingSymbol {
  id: number
  symbol: string
  x: number
  y: number
  delay: number
  duration: number
  opacity: number
}

interface AsciiAnimationProps {
  density?: number // Quantidade de símbolos (padrão: 15)
  className?: string
}

// Componente de animação ASCII para background
export function AsciiAnimation({ density = 15, className = '' }: AsciiAnimationProps) {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([])

  // Gera símbolos aleatórios na inicialização
  useEffect(() => {
    const generateSymbols = () => {
      const newSymbols: FloatingSymbol[] = []
      
      for (let i = 0; i < density; i++) {
        newSymbols.push({
          id: i,
          symbol: ASCII_SYMBOLS[Math.floor(Math.random() * ASCII_SYMBOLS.length)],
          x: Math.random() * 100, // Posição X em %
          y: Math.random() * 100, // Posição Y em %
          delay: Math.random() * 5, // Delay inicial
          duration: 8 + Math.random() * 12, // Duração da animação (8-20s)
          opacity: 0.15 + Math.random() * 0.25 // Opacidade mais visível (0.15-0.40)
        })
      }
      
      setSymbols(newSymbols)
    }

    generateSymbols()
  }, [density])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {symbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute text-foreground/25 font-mono text-sm select-none"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            opacity: symbol.opacity
          }}
          initial={{ 
            opacity: 0,
            scale: 0.8,
            rotate: -10
          }}
          animate={{
            opacity: [0, symbol.opacity, symbol.opacity, 0],
            scale: [0.8, 1, 1, 0.8],
            rotate: [-10, 0, 0, 10],
            y: [-20, 0, 0, 20],
            x: [-10, 0, 0, 10]
          }}
          transition={{
            duration: symbol.duration,
            delay: symbol.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {symbol.symbol}
        </motion.div>
      ))}
    </div>
  )
}

// Componente de código ASCII mais elaborado para cantos
export function AsciiCodeBlock({ position = 'top-right' }: { position?: 'top-right' | 'bottom-left' }) {
  const codeSnippets = [
    'const dev = () => {\n  return "Bruno";\n}',
    'function build() {\n  return success;\n}',
    'if (idea) {\n  makeItReal();\n}',
    'while (learning) {\n  grow++;\n}'
  ]

  const [currentSnippet, setCurrentSnippet] = useState(0)

  // Alterna entre snippets de código
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
    }, 6000) // Muda a cada 6 segundos

    return () => clearInterval(interval)
  }, [codeSnippets.length])

  const positionClasses = {
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10'
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} hidden lg:block`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <motion.pre
        className="text-foreground/20 font-mono text-xs leading-relaxed select-none"
        key={currentSnippet}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
      >
        {codeSnippets[currentSnippet]}
      </motion.pre>
    </motion.div>
  )
}

// Componente de partículas ASCII minimalistas
export function AsciiParticles() {
  const particles = ['·', '•', '◦', '▪', '▫', '○', '●']
  const uniqueId = React.useId()
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`${uniqueId}-particle-${i}`}
          className="absolute text-foreground/20 text-lg select-none"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8)}%`
          }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [0.8, 1.2, 0.8],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </div>
  )
}