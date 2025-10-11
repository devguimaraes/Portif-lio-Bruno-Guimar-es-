'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Ícones SVG das tecnologias como strings
const TECH_ICONS = {
  react: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><path d="M12 1c-1.5 0-3 .5-4 1.5C6.5 4 6 5.5 6 7c0 1.5.5 3 1.5 4 1 1 2.5 1.5 4 1.5h.5c1.5 0 3-.5 4-1.5 1.5-1.5 2-3 2-4.5 0-1.5-.5-3-1.5-4C15.5 1.5 14 1 12 1z"/><path d="M12 17c1.5 0 3-.5 4-1.5 1.5-1.5 2-3 2-4.5 0-1.5-.5-3-1.5-4-1-1-2.5-1.5-4-1.5h-.5c-1.5 0-3 .5-4 1.5C6.5 8.5 6 10 6 11.5c0 1.5.5 3 1.5 4 1 1 2.5 1.5 4 1.5z"/></svg>`,
  
  vue: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h3.5L12 15l6.5-12H22L12 21 2 3z"/></svg>`,
  
  javascript: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.114-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.77l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-.998l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/></svg>`,
  
  wordpress: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.403-2.325.607-3.582.607M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>`,
  
  figma: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/></svg>`
}

interface TechIcon {
  id: number
  x: number
  tech: keyof typeof TECH_ICONS
  size: number
  opacity: number
  speed: number
  rotation: number
  delay: number
}

interface TechIconsRainProps {
  density?: number
  className?: string
}

// Componente principal de chuva de ícones de tecnologia
export function TechIconsRain({ density = 8, className = '' }: TechIconsRainProps) {
  // Gera ícones estáticos uma única vez - sem state updates
  const icons = useState<TechIcon[]>(() => {
    const staticIcons: TechIcon[] = []
    const techKeys = Object.keys(TECH_ICONS) as (keyof typeof TECH_ICONS)[]
    
    for (let i = 0; i < density; i++) {
      const randomTech = techKeys[Math.floor(Math.random() * techKeys.length)]
      
      staticIcons.push({
        id: i + 1,
        x: Math.random() * 100,
        tech: randomTech,
        size: 16 + Math.random() * 8,
        opacity: 0.1 + Math.random() * 0.15,
        speed: 20 + Math.random() * 15,
        rotation: Math.random() * 360,
        delay: i * 4 // Delay escalonado para cada ícone
      })
    }
    
    return staticIcons
  })[0] // Pega apenas o valor inicial, sem setter

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map((icon) => (
        <TechIconComponent key={icon.id} icon={icon} />
      ))}
    </div>
  )
}

// Componente individual do ícone - sem callbacks
function TechIconComponent({ icon }: { icon: TechIcon }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${icon.x}%`,
        width: `${icon.size}px`,
        height: `${icon.size}px`,
        opacity: icon.opacity
      }}
      initial={{ 
        y: -50,
        rotate: icon.rotation,
        scale: 0
      }}
      animate={{ 
        y: '110vh',
        rotate: icon.rotation + 180,
        scale: [0, 1, 1, 0.8]
      }}
      transition={{
        duration: icon.speed,
        ease: 'easeInOut',
        times: [0, 0.1, 0.9, 1],
        delay: icon.delay,
        repeat: Infinity,
        repeatDelay: 10 + Math.random() * 15 // Delay entre repetições
      }}
    >
      <div 
        className="w-full h-full text-green-400/30 hover:text-green-400/50 transition-colors"
        dangerouslySetInnerHTML={{ __html: TECH_ICONS[icon.tech] }}
      />
    </motion.div>
  )
}