"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useBackgroundTypingSequence } from "@/hooks/use-animation-sequence";

// Interface para definir segmentos de texto com estilos específicos
interface TextSegment {
  text: string;
  className?: string;
  isNewLine?: boolean;
}

// Props do componente TypingEffect
interface TypingEffectProps {
  text?: string; // Para compatibilidade com versão anterior
  segments?: TextSegment[]; // Nova prop para segmentos com cores
  speed?: number;
  className?: string;
  cursorChar?: string;
  startDelay?: number;
  onComplete?: () => void;
  waitForBackground?: boolean; // Nova prop para aguardar background
  onBackgroundReady?: () => void; // Callback quando background estiver pronto
  backgroundReadyDelay?: number; // Tempo para aguardar background (padrão: 1500ms)
}

/**
 * Componente de efeito de digitação com cursor piscante
 * Simula digitação de texto caractere por caractere com animação de cursor
 * Suporta segmentos com cores diferentes e quebras de linha
 * @param text - Texto simples para compatibilidade (deprecated)
 * @param segments - Array de segmentos com texto e estilos específicos
 * @param speed - Velocidade da digitação em ms (padrão: 100ms)
 * @param className - Classes CSS adicionais
 * @param cursorChar - Caractere do cursor (padrão: "|")
 * @param startDelay - Delay antes de iniciar a digitação em ms
 * @param onComplete - Callback executado quando a digitação termina
 */
export function TypingEffect({
  text,
  segments,
  speed = 100,
  className = "",
  cursorChar = "|",
  startDelay = 0,
  onComplete,
  waitForBackground = false,
  onBackgroundReady,
  backgroundReadyDelay = 1500,
}: TypingEffectProps) {
  // Estados para controlar a digitação e exibição
  const [displaySegments, setDisplaySegments] = useState<TextSegment[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs para gerenciar intervalos e timeouts
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const componentId = React.useId();

  // Hook para coordenar sequência de animações (se waitForBackground estiver ativo)
  const backgroundSequence = useBackgroundTypingSequence({
    backgroundPreloadTime: backgroundReadyDelay,
    typingStartDelay: startDelay,
    onBackgroundReady,
    onTypingStart: () => {
      // Inicia digitação quando background estiver pronto
      if (waitForBackground) {
        startTypingProcess();
      }
    },
  });

  // Processa os segmentos de texto (nova funcionalidade ou compatibilidade com versão anterior)
  const processedSegments = React.useMemo(() => {
    if (segments) {
      return segments;
    }
    if (text) {
      return [{ text, className: "" }];
    }
    return [];
  }, [text, segments]);

  // Verifica se o usuário prefere animações reduzidas
  const prefersReducedMotion = 
    typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Função para limpar todos os timers
  const cleanupTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (cursorIntervalRef.current) {
      clearInterval(cursorIntervalRef.current);
      cursorIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Inicia o cursor piscante
  const startCursorBlink = useCallback(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530); // Velocidade padrão do cursor piscante (530ms)
  }, []);

  // Função para iniciar o processo de digitação (versão simplificada)
  const startTypingProcess = useCallback(() => {
    setIsTyping(true);
    setDisplaySegments([]);
    startCursorBlink();
    
    let currentSegmentIndex = 0;
    let currentCharIndex = 0;
    
    intervalRef.current = setInterval(() => {
      if (currentSegmentIndex < processedSegments.length) {
        const currentSegment = processedSegments[currentSegmentIndex];
        const textArray = Array.from(currentSegment.text);
        
        if (currentCharIndex < textArray.length) {
          const partialText = textArray.slice(0, currentCharIndex + 1).join('');
          
          setDisplaySegments(prevSegments => {
            const updatedSegments = [...prevSegments];
            
            // Garante que temos todos os segmentos anteriores completos
            for (let i = 0; i < currentSegmentIndex; i++) {
              if (!updatedSegments[i]) {
                updatedSegments[i] = processedSegments[i];
              }
            }
            
            // Atualiza o segmento atual
            updatedSegments[currentSegmentIndex] = {
              ...currentSegment,
              text: partialText
            };
            
            return updatedSegments;
          });
          
          currentCharIndex++;
        } else {
          // Segmento atual completo, passa para o próximo
          currentSegmentIndex++;
          currentCharIndex = 0;
        }
      } else {
        // Digitação completa
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        setIsTyping(false);
        setIsComplete(true);
        
        // Chama onComplete se fornecido
        if (onComplete) {
          onComplete();
        }
        
        // Cursor continua piscando indefinidamente
        // Não fazemos nada aqui, o cursor já está piscando
      }
    }, speed);
  }, [processedSegments, speed, onComplete, startCursorBlink]);

  useEffect(() => {
    // Limpa timers anteriores
    cleanupTimers();

    // Se o usuário prefere animações reduzidas, mostra o texto completo imediatamente
    if (prefersReducedMotion) {
      setDisplaySegments(processedSegments);
      setIsComplete(true);
      setShowCursor(true);
      startCursorBlink();
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Se waitForBackground está ativo, a digitação será controlada pelo hook
    if (waitForBackground) {
      // O hook backgroundSequence já está gerenciando a sequência
      return;
    }

    // Comportamento padrão: aplica o delay inicial antes de começar a digitação
    timeoutRef.current = setTimeout(startTypingProcess, startDelay);

    // Cleanup na desmontagem do componente
    return cleanupTimers;
  }, [processedSegments, startDelay, prefersReducedMotion, cleanupTimers, startTypingProcess, onComplete, waitForBackground]);

  return (
    <span
      className={`typing-effect ${className}`}
      data-typing-complete={isComplete}
      data-typing-active={isTyping}
      data-background-ready={waitForBackground ? backgroundSequence.isBackgroundReady : true}
      data-can-start-typing={waitForBackground ? backgroundSequence.canStartTyping : true}
      aria-live={isTyping ? "polite" : "off"}
      aria-label={prefersReducedMotion ? processedSegments.map(s => s.text).join('') : `${isTyping ? 'Digitando' : 'Texto completo'}: ${displaySegments.map(s => s.text).join('')}`}
      id={componentId}
      style={{
        // Reserva espaço para evitar layout shifts
        minWidth: isComplete ? 'auto' : '1ch',
        // Garante altura consistente
        minHeight: '1em'
      }}
    >
      {displaySegments.map((segment, index) => (
        <React.Fragment key={index}>
          {segment.isNewLine && <br />}
          <span 
            className={`typing-text ${segment.className || ''}`} 
            aria-hidden={isTyping}
            style={{
              // Evita colapso de espaços
              whiteSpace: segment.isNewLine ? 'normal' : 'nowrap'
            }}
          >
            {segment.text}
          </span>
        </React.Fragment>
      ))}
      {showCursor && (
        <span 
          className="typing-cursor" 
          aria-hidden="true"
          data-cursor-visible={showCursor}
          style={{
            // Posicionamento mais preciso do cursor
            display: 'inline-block',
            verticalAlign: 'baseline'
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}