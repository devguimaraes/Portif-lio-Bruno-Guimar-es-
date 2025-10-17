'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe, Languages } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Componente de troca de idioma com animações e design moderno
// Permite alternar entre português e inglês mantendo a rota atual
export function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  // Alterna entre os idiomas disponíveis
  // Remove o prefixo do locale atual e adiciona o novo
  function switchLanguage() {
    const newLocale = locale === 'pt' ? 'en' : 'pt'
    
    // Remove o prefixo do locale atual da URL
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // Navega para a nova URL com o novo locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={switchLanguage}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
        aria-label={t('switch')}
      >
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Globe className="h-4 w-4" />
        </motion.div>
        
        <span className="font-medium">
          {locale === 'pt' ? 'EN' : 'PT'}
        </span>
        
        <motion.div
          animate={{ x: isHovered ? 2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Languages className="h-3 w-3 opacity-70" />
        </motion.div>
      </Button>
    </motion.div>
  )
}

// Versão compacta do componente para uso em espaços menores
// Mostra apenas o ícone e o código do idioma
export function LanguageSwitcherCompact() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLanguage() {
    const newLocale = locale === 'pt' ? 'en' : 'pt'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
    </Button>
  )
}