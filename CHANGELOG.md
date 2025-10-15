# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não Lançado]

### Adicionado
- Sistema completo de validação com Zod
- Hook `useValidation` para validação de formulários em tempo real
- Ambiente de testes configurado com Vitest e React Testing Library
- Testes unitários para validações e hooks
- Versão HTML estática do portfólio para deploy flexível
- Documentação completa do projeto (CONTRIBUTING.md, PROJECT_RULES.md)
- Templates para issues e pull requests no GitHub
- Workflows de CI/CD automatizados
- Configurações de ESLint e TypeScript aprimoradas

### Melhorado
- Componente Button com melhor tipagem e acessibilidade
- TypingEffect otimizado para melhor performance
- Utilitários auxiliares em `utils.ts`
- Estrutura de arquivos mais organizada
- Cobertura de testes abrangente

### Corrigido
- Problemas de timing em testes assíncronos
- Validações de formulário mais robustas
- Compatibilidade com diferentes ambientes de deploy

## [0.1.0] - 2024-01-XX

### Adicionado
- Portfólio inicial com Next.js 15
- Componentes UI com Tailwind CSS e Radix UI
- Seções: Hero, Sobre, Projetos, Contato
- Design responsivo e moderno
- Integração com TypeScript

---

## Commits Recentes

### feat: adiciona versão HTML estática do portfólio (57f25c6)
- Implementa versão estática completa do portfólio
- Inclui todos os assets e recursos necessários
- Mantém compatibilidade com versão Next.js
- Facilita deploy em diferentes plataformas
- Preserva funcionalidades e design responsivo

### refactor: melhora componentes UI e utilitários (c79832e)
- Aprimora componente Button com melhor tipagem
- Otimiza TypingEffect com performance melhorada
- Adiciona utilitários auxiliares em utils.ts
- Melhora acessibilidade e experiência do usuário
- Refatora código seguindo melhores práticas

### feat: implementa sistema de validação com Zod (2869a7a)
- Adiciona hook useValidation para validação de formulários
- Implementa validações com Zod para email, nome e mensagem
- Suporte a validação em tempo real (onChange/onBlur)
- Sistema de debounce para otimizar performance
- Validações específicas para formulário de contato brasileiro

### test: configura ambiente de testes com Vitest (99c3642)
- Adiciona Vitest como framework de testes
- Configura setup de testes com React Testing Library
- Implementa testes unitários para useValidation hook
- Adiciona dependências de desenvolvimento necessárias
- Configura scripts de teste no package.json

### docs: adiciona documentação e configurações do projeto (7175995)
- Adiciona templates de issue e PR no GitHub
- Inclui guias de contribuição e regras do projeto
- Atualiza .gitignore com configurações específicas
- Adiciona templates JSDoc para documentação consistente

---

## Status dos Testes

✅ **Todos os testes passando** (15/15)
- Validações Zod: 10 testes
- Hook useValidation: 5 testes

## Status do Build

✅ **Build de produção funcionando**
- Compilação bem-sucedida
- Páginas estáticas geradas
- Otimizações aplicadas
- Pronto para deploy

## Próximos Passos

- [ ] Resolver warnings de ESLint restantes
- [ ] Implementar testes E2E com Playwright
- [ ] Adicionar mais validações de formulário
- [ ] Melhorar acessibilidade geral
- [ ] Otimizar performance de carregamento