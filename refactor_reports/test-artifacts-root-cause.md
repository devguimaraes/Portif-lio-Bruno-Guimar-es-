Causa raiz dos artefatos (vídeos e arquivos vazios):
- Configuração do Playwright com video=retain-on-failure e screenshot=only-on-failure gera artefatos a cada falha.
- Execução em múltiplos projetos (chromium, firefox, webkit, mobile/tablet) multiplica os artefatos por navegador/dispositivo.
- Parâmetro fullyParallel=true aumenta concorrência e quantidade de artefatos simultâneos.
- Processo headless do Chrome/Lighthouse remanescente (WSL) estava ativo e foi encerrado, evitando artefatos extras.
Medidas adotadas:
- Encerramento de processos headless remanescentes.
- Remoção de vídeos (video.webm) e arquivos vazios.
- Limpeza de diretórios .playwright-artifacts-*.
- Diretórios vazios em test-results removidos.
