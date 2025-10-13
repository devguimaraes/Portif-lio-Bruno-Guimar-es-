/**
 * WhatsApp Button Component
 *
 * Implementa funcionalidade de contato via WhatsApp conforme solicitado.
 * Resolve a necessidade de comunicação direta com clientes através do WhatsApp.
 *
 * Features implementadas:
 * - Botão flutuante fixo na tela
 * - Mensagem pré-definida personalizada
 * - Design responsivo e acessível
 * - Animações suaves com Framer Motion
 * - Integração com número de telefone atualizado
 *
 * @created 2024 - Implementação do sistema de contato WhatsApp
 */
"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "fixed" | "inline";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

// Componente de botão do WhatsApp com animações e design responsivo
// Suporta posicionamento fixo (floating) ou inline no layout
export function WhatsAppButton({
  className,
  variant = "fixed",
  size = "md",
  showText = true,
}: WhatsAppButtonProps) {
  // Número do WhatsApp correto
  const whatsappNumber = "5521969715247";

  // Mensagem padrão conforme especificado na issue
  const defaultMessage =
    "Olá! Gostaria de saber mais sobre seus serviços de desenvolvimento web.";

  // Gera o link do WhatsApp com mensagem pré-definida
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Abre o WhatsApp em nova aba
  function handleWhatsAppClick() {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  // Configurações de tamanho baseadas no design system
  const sizeConfig = {
    sm: {
      button: "size-12",
      icon: "size-5",
      text: "text-sm",
    },
    md: {
      button: "size-14",
      icon: "size-6",
      text: "text-base",
    },
    lg: {
      button: "size-16",
      icon: "size-7",
      text: "text-lg",
    },
  };

  const config = sizeConfig[size];

  // Estilos base do botão WhatsApp
  const baseStyles = cn(
    "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
    "transition-all duration-300 ease-in-out",
    "border-0 focus-visible:ring-green-500/50",
    config.button,
  );

  // Estilos para versão fixa (floating)
  const fixedStyles = cn(
    "fixed bottom-6 right-6 z-50 rounded-full",
    "md:bottom-8 md:right-8",
  );

  // Estilos para versão inline
  const inlineStyles = "rounded-lg";

  // Renderização condicional baseada na variante
  if (variant === "fixed") {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.7)",
            "0 0 0 10px rgba(34, 197, 94, 0)",
            "0 0 0 20px rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{
          scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.5 },
          opacity: { type: "spring", stiffness: 260, damping: 20, delay: 0.5 },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeOut" },
        }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleWhatsAppClick}
          className={cn(baseStyles, fixedStyles, className)}
          aria-label="Entrar em contato via WhatsApp"
          title="Fale conosco no WhatsApp"
        >
          <MessageCircle className={config.icon} />
          <span className="sr-only">WhatsApp</span>
        </Button>
      </motion.div>
    );
  }

  // Versão inline com texto opcional
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button
        onClick={handleWhatsAppClick}
        className={cn(baseStyles, inlineStyles, className)}
        aria-label="Entrar em contato via WhatsApp"
      >
        <MessageCircle className={config.icon} />
        {showText && <span className={config.text}>Falar no WhatsApp</span>}
      </Button>
    </motion.div>
  );
}
