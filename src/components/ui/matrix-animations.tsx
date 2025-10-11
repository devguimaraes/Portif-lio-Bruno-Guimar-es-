'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

// Caracteres Matrix - mistura de katakana, números e símbolos
const MATRIX_CHARS = [
  'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
  'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ':', '・', '=', '*', '+', '-', '<', '>', '¦', '|', '¿'
]

interface MatrixColumn {
  id: number
  x: number
  chars: string[]
  speed: number
  opacity: number
  length: number
}

interface MatrixRainProps {
  density?: number // Número de colunas (padrão: 8)
  className?: string
}

// Componente principal de chuva Matrix
export function MatrixRain({ density = 8, className = '' }: MatrixRainProps) {
  const [columns, setColumns] = useState<MatrixColumn[]>([])
  const [idCounter, setIdCounter] = useState(0)

  // Gera uma coluna aleatória de caracteres Matrix
  const generateColumn = useCallback((baseId: number, x: number): MatrixColumn => {
    const length = 12 + Math.floor(Math.random() * 20) // 12-32 caracteres (mais longo)
    const chars = Array.from({ length }, () => 
      MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
    )
    
    const uniqueId = baseId * 100000 + Date.now() + Math.floor(Math.random() * 10000)
    
    return {
      id: uniqueId,
      x,
      chars,
      speed: 2.5 + Math.random() * 3.5, // Velocidade equilibrada 2.5-6 segundos
      opacity: 0.2 + Math.random() * 0.3, // Opacidade mais intensa 0.2-0.5
      length
    }
  }, [])

  // Inicializa as colunas
  useEffect(() => {
    const newColumns: MatrixColumn[] = []
    
    for (let i = 0; i < density; i++) {
      const x = (100 / density) * i + Math.random() * (100 / density * 0.8)
      const length = 12 + Math.floor(Math.random() * 20) // 12-32 caracteres (mais longo)
      const chars = Array.from({ length }, () => 
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      )
      
      const uniqueId = i * 100000 + Date.now() + Math.floor(Math.random() * 10000)
      
      newColumns.push({
        id: uniqueId,
        x,
        chars,
        speed: 2.5 + Math.random() * 3.5, // Velocidade equilibrada 2.5-6 segundos
        opacity: 0.2 + Math.random() * 0.3, // Opacidade mais intensa 0.2-0.5
        length
      })
    }
    
    setColumns(newColumns)
  }, [density])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {columns.map((column) => (
        <MatrixColumnComponent
          key={column.id}
          column={column}
          onComplete={() => {
            // Remove a coluna atual e adiciona uma nova após um delay
            setColumns(prev => prev.filter(c => c.id !== column.id))
            setTimeout(() => {
              const newCounter = idCounter + 1
              setIdCounter(newCounter)
              
              const length = 12 + Math.floor(Math.random() * 20)
              const chars = Array.from({ length }, () => 
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
              )
              
              const uniqueId = newCounter * 100000 + Date.now() + Math.floor(Math.random() * 10000)
              
              const newColumn: MatrixColumn = {
                id: uniqueId,
                x: column.x,
                chars,
                speed: 2.5 + Math.random() * 3.5,
                opacity: 0.2 + Math.random() * 0.3,
                length
              }
              
              setColumns(prevColumns => [...prevColumns, newColumn])
            }, Math.random() * 2000) // Delay aleatório de 0-2s
          }}
        />
      ))}
    </div>
  )
}

// Componente individual de coluna Matrix
function MatrixColumnComponent({ 
  column, 
  onComplete 
}: { 
  column: MatrixColumn
  onComplete: () => void 
}) {
  return (
    <motion.div
      className="absolute top-0 flex flex-col font-mono text-xs select-none"
      style={{
        left: `${column.x}%`,
        opacity: column.opacity
      }}
      initial={{ y: -100 }}
      animate={{ y: '100vh' }}
      transition={{
        duration: column.speed,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
      onAnimationComplete={onComplete}
    >
      {column.chars.map((char, index) => (
        <motion.span
          key={`${column.id}-char-${index}`}
          className="text-green-400/80 leading-tight" 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === 0 ? 1 : 0.5 - (index * 0.02) // Primeiro char mais brilhante, degradê mais suave
          }}
          transition={{ 
            duration: 0.1,
            delay: index * 0.05 
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Componente de efeito glitch sutil
export function MatrixGlitch() {
  const [glitchText, setGlitchText] = useState('')
  
  // Gera texto glitch aleatório
  useEffect(() => {
    const generateGlitch = () => {
      const length = 3 + Math.floor(Math.random() * 5)
      const text = Array.from({ length }, () => 
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join('')
      setGlitchText(text)
    }

    generateGlitch()
    const interval = setInterval(generateGlitch, 4000 + Math.random() * 6000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Glitch no canto superior direito */}
      <motion.div
        className="absolute top-16 right-16 font-mono text-sm text-green-400/20 select-none"
        key={glitchText}
        initial={{ opacity: 0, x: 10 }}
        animate={{ 
          opacity: [0, 0.8, 0.2, 0.9, 0],
          x: [10, 0, 2, -1, 0],
          scaleX: [1, 1.1, 0.9, 1.05, 1]
        }}
        transition={{ 
          duration: 0.6,
          times: [0, 0.1, 0.3, 0.7, 1],
          ease: 'easeInOut'
        }}
      >
        {glitchText}
      </motion.div>

      {/* Glitch no canto inferior esquerdo */}
      <motion.div
        className="absolute bottom-16 left-16 font-mono text-xs text-green-400/15 select-none"
        key={glitchText + '_2'}
        initial={{ opacity: 0, y: -5 }}
        animate={{ 
          opacity: [0, 0.6, 0.1, 0.7, 0],
          y: [-5, 0, 1, -2, 0],
          scaleY: [1, 0.9, 1.1, 0.95, 1]
        }}
        transition={{ 
          duration: 0.8,
          delay: 2,
          times: [0, 0.15, 0.4, 0.8, 1],
          ease: 'easeInOut'
        }}
      >
        {glitchText.split('').reverse().join('')}
      </motion.div>
    </div>
  )
}

// Componente de grade conectada Matrix
export function MatrixGrid() {
  const gridSize = 6 // 6x6 grid
  const points = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    x: (i % gridSize) * (100 / (gridSize - 1)),
    y: Math.floor(i / gridSize) * (100 / (gridSize - 1))
  }))

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <svg className="w-full h-full">
        {/* Linhas da grade */}
        {points.map((point, index) => {
          const nextRight = points.find(p => p.x === point.x + (100 / (gridSize - 1)) && p.y === point.y)
          const nextDown = points.find(p => p.x === point.x && p.y === point.y + (100 / (gridSize - 1)))
          
          return (
            <g key={point.id}>
              {/* Linha horizontal */}
              {nextRight && (
                <motion.line
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextRight.x}%`}
                  y2={`${nextRight.y}%`}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-green-400/10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0], 
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{
                    duration: 4,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                    times: [0, 0.3, 0.7, 1]
                  }}
                />
              )}
              
              {/* Linha vertical */}
              {nextDown && (
                <motion.line
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextDown.x}%`}
                  y2={`${nextDown.y}%`}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-green-400/10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0], 
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{
                    duration: 4,
                    delay: index * 0.1 + 0.5,
                    ease: 'easeInOut',
                    times: [0, 0.3, 0.7, 1]
                  }}
                />
              )}
            </g>
          )
        })}
        
        {/* Pontos da grade */}
        {points.map((point, index) => (
          <motion.circle
            key={`point-${point.id}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="1"
            fill="currentColor"
            className="text-green-400/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1, 0],
              opacity: [0, 0.8, 0.4, 0]
            }}
            transition={{
              duration: 3,
              delay: index * 0.05 + 2,
              ease: 'easeOut',
              times: [0, 0.2, 0.6, 1]
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Componente de pulso Matrix sutil
export function MatrixPulse() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Pulso central */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-px h-px bg-green-400/20 rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: [1, 100, 1],
          opacity: [0, 0.1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 12
        }}
      />
      
      {/* Ondas concêntricas */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 border border-green-400/5 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            width: ['0px', '400px', '800px'],
            height: ['0px', '400px', '800px'],
            opacity: [0.3, 0.1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: ring * 2,
            ease: 'easeOut',
            repeatDelay: 10
          }}
        />
      ))}
    </div>
  )
}