"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Interface para definir estágios da animação
interface AnimationStage {
  name: string;
  duration: number;
  delay?: number;
}

// Interface para configuração do hook
interface UseAnimationSequenceConfig {
  stages: AnimationStage[];
  onStageComplete?: (stageName: string) => void;
  onSequenceComplete?: () => void;
  autoStart?: boolean;
}

// Interface para retorno do hook
interface UseAnimationSequenceReturn {
  currentStage: string | null;
  isStageActive: (stageName: string) => boolean;
  isStageComplete: (stageName: string) => boolean;
  startSequence: () => void;
  resetSequence: () => void;
  progress: number; // Progresso de 0 a 1
}

/**
 * Hook personalizado para coordenar sequência de animações
 * Garante que cada estágio seja executado na ordem correta
 * Útil para sincronizar animações de background com efeitos de digitação
 * @param config - Configuração dos estágios e callbacks
 * @returns Controles e estado da sequência de animações
 */
export function useAnimationSequence({
  stages,
  onStageComplete,
  onSequenceComplete,
  autoStart = true,
}: UseAnimationSequenceConfig): UseAnimationSequenceReturn {
  // Estados para controlar a sequência
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());
  const [isSequenceStarted, setIsSequenceStarted] = useState(false);
  
  // Refs para gerenciar timeouts
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Limpa todos os timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();
    
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
  }, []);

  // Inicia um estágio específico
  const startStage = useCallback((stageIndex: number) => {
    if (stageIndex >= stages.length) {
      // Sequência completa
      if (onSequenceComplete) {
        onSequenceComplete();
      }
      return;
    }

    const stage = stages[stageIndex];
    setCurrentStageIndex(stageIndex);

    // Aplica delay inicial se especificado
    const delay = stage.delay || 0;
    
    const timeoutId = setTimeout(() => {
      // Marca o estágio como completo após sua duração
      const completionTimeoutId = setTimeout(() => {
        setCompletedStages(prev => new Set([...prev, stage.name]));
        
        if (onStageComplete) {
          onStageComplete(stage.name);
        }
        
        // Inicia próximo estágio
        startStage(stageIndex + 1);
      }, stage.duration);
      
      timeoutRefs.current.set(`${stage.name}-completion`, completionTimeoutId);
    }, delay);
    
    timeoutRefs.current.set(`${stage.name}-start`, timeoutId);
  }, [stages, onStageComplete, onSequenceComplete]);

  // Inicia a sequência completa
  const startSequence = useCallback(() => {
    if (isSequenceStarted) return;
    
    setIsSequenceStarted(true);
    setCurrentStageIndex(-1);
    setCompletedStages(new Set());
    clearAllTimeouts();
    
    startStage(0);
  }, [isSequenceStarted, startStage, clearAllTimeouts]);

  // Reseta a sequência
  const resetSequence = useCallback(() => {
    clearAllTimeouts();
    setIsSequenceStarted(false);
    setCurrentStageIndex(-1);
    setCompletedStages(new Set());
  }, [clearAllTimeouts]);

  // Verifica se um estágio está ativo
  const isStageActive = useCallback((stageName: string) => {
    const stageIndex = stages.findIndex(stage => stage.name === stageName);
    return currentStageIndex === stageIndex;
  }, [stages, currentStageIndex]);

  // Verifica se um estágio foi completado
  const isStageComplete = useCallback((stageName: string) => {
    return completedStages.has(stageName);
  }, [completedStages]);

  // Calcula o progresso da sequência (0 a 1)
  const progress = stages.length > 0 ? (completedStages.size / stages.length) : 0;

  // Nome do estágio atual
  const currentStage = currentStageIndex >= 0 && currentStageIndex < stages.length 
    ? stages[currentStageIndex].name 
    : null;

  // Auto-inicia se configurado
  useEffect(() => {
    if (autoStart && !isSequenceStarted && stages.length > 0) {
      startSequence();
    }
  }, [autoStart, isSequenceStarted, stages.length, startSequence]);

  // Cleanup na desmontagem
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    currentStage,
    isStageActive,
    isStageComplete,
    startSequence,
    resetSequence,
    progress,
  };
}

// Hook especializado para animações de background + digitação
interface UseBackgroundTypingSequenceConfig {
  backgroundPreloadTime?: number;
  typingStartDelay?: number;
  onBackgroundReady?: () => void;
  onTypingStart?: () => void;
  onSequenceComplete?: () => void;
}

/**
 * Hook especializado para coordenar animações de background com efeito de digitação
 * Garante que o background seja totalmente carregado antes de iniciar a digitação
 * @param config - Configuração específica para background + digitação
 * @returns Controles especializados para esta sequência
 */
export function useBackgroundTypingSequence({
  backgroundPreloadTime = 1500,
  typingStartDelay = 500,
  onBackgroundReady,
  onTypingStart,
  onSequenceComplete,
}: UseBackgroundTypingSequenceConfig = {}) {
  
  const animationSequence = useAnimationSequence({
    stages: [
      {
        name: "background-preload",
        duration: backgroundPreloadTime,
        delay: 0,
      },
      {
        name: "typing-ready",
        duration: typingStartDelay,
        delay: 0,
      },
    ],
    onStageComplete: (stageName) => {
      if (stageName === "background-preload" && onBackgroundReady) {
        onBackgroundReady();
      }
      if (stageName === "typing-ready" && onTypingStart) {
        onTypingStart();
      }
    },
    onSequenceComplete,
    autoStart: true,
  });

  return {
    ...animationSequence,
    isBackgroundReady: animationSequence.isStageComplete("background-preload"),
    isTypingReady: animationSequence.isStageComplete("typing-ready"),
    canStartTyping: animationSequence.isStageActive("typing-ready") || 
                   animationSequence.isStageComplete("typing-ready"),
  };
}