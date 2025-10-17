import createMiddleware from 'next-intl/middleware';

// Configuração do middleware de internacionalização
// Gerencia automaticamente o roteamento baseado no idioma
export default createMiddleware({
  // Lista de idiomas suportados
  locales: ['pt', 'en'],
  
  // Idioma padrão (português)
  defaultLocale: 'pt',
  
  // Estratégia de detecção de idioma
  // 'always' = sempre prefixar com locale na URL
  localePrefix: 'always'
});

export const config = {
  // Matcher para aplicar o middleware apenas nas rotas necessárias
  // Exclui arquivos estáticos, API routes e arquivos internos do Next.js
  matcher: [
    // Inclui todas as rotas exceto:
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Inclui rotas da API se necessário para i18n
    // '/api/(.*)'
  ]
};