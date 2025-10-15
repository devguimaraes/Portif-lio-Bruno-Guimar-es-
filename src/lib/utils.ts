import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS de forma inteligente usando clsx e tailwind-merge
 * Remove duplicatas e resolve conflitos entre classes do Tailwind CSS
 * @param inputs - Array de valores de classe (strings, objetos, arrays)
 * @returns String com classes CSS otimizadas e sem conflitos
 * @example
 * cn('px-2 py-1', 'px-4') // "py-1 px-4" (px-2 é removido)
 * cn('text-red-500', { 'text-blue-500': isActive }) // Resolve condicionalmente
 */
export function cn(...inputs: ClassValue[]) {
  // Combina classes com clsx e resolve conflitos do Tailwind com twMerge
  return twMerge(clsx(inputs));
}
