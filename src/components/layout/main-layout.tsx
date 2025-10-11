import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'

interface MainLayoutProps {
  children: ReactNode
}

// Layout principal que envolve todas as páginas
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fixo */}
      <Header />
      
      {/* Conteúdo principal com padding-top para compensar header fixo */}
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppButton variant="fixed" />
    </div>
  )
}