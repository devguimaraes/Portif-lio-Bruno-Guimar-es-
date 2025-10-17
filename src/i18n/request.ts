import { getRequestConfig } from 'next-intl/server';

// Lista de idiomas suportados
export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];

// Configuração do next-intl
// Carrega as mensagens de tradução baseado no locale atual
export default getRequestConfig(async ({ requestLocale }) => {
  // Obtém o locale da requisição (Next.js 15+)
  const requested = await requestLocale;
  
  // Valida se o locale é suportado, senão usa o padrão
  let locale = 'pt';
  if (requested && locales.includes(requested as Locale)) {
    locale = requested;
  }

  return {
    locale,
    // Carrega as mensagens do arquivo JSON correspondente
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});