# Relatório de melhorias - do MVP (A05) ao site final (A06)

Este relatório compara a entrega do MVP (A05, apresentada em 22/10/2026) com o site final (A06). Para os prints de "antes", veja `docs/evidencias/` (prints do MVP: `celular*.jpeg`, `telacheia*.png`, `telaminimizada*.png`) e o código original em `docs/mvp-codigo-original/`.

## 1. Pontos levantados na apresentação do MVP

Na apresentação do MVP, a equipe listou as dificuldades encontradas (slide 14) e os próximos passos (slide 15). Veja como cada um foi resolvido:

| Ponto do MVP | Situação no MVP | Como foi resolvido na A06 |
|---|---|---|
| Dificuldade: validação W3C | Ajustes de atributos HTML5 ainda pendentes | 10 páginas validadas no validator.w3.org com 0 erros e 0 avisos (ver `evidencias-testes.md`) |
| Dificuldade: atributos ARIA | Uso inicial de ARIA na Home | `aria-expanded`, `aria-controls`, `aria-current`, `aria-pressed`, `aria-live` e `aria-describedby` aplicados e conferidos (itens 5, 6 e 12) |
| Dificuldade: deploy no Railway | Fluxo do repositório ainda não configurado | Repositório no GitHub ligado ao Railway com deploy automático e HTTPS: https://ecologica.up.railway.app |
| Próximo passo 1: completar as páginas | Só a Home (index.html) | 10 páginas interligadas, com menu único e destaque da página atual |
| Próximo passo 2: multimídia e formulário | Planejados no escopo | `midia.html` com vídeo, áudio e mapa; `contato.html` com formulário validado (HTML5 + JavaScript) |
| Próximo passo 3: documentação | Escopo e slides | Pasta `docs/` com README, diário de bordo, orçamento, evidências de testes e este relatório |

## 2. Correções feitas no código (antes e depois)

A coluna "Origem" indica de onde veio cada correção: um requisito da atividade A06 ou a revisão técnica feita antes da publicação (W3C, acessibilidade, desempenho e conteúdo).

| # | Ponto | Origem | Antes (MVP / versão de 06/11) | Depois (final) |
|---|---|---|---|---|
| 1 | Estrutura de pastas | Requisito A06 | Todos os arquivos soltos na raiz, junto com PDFs, .docx e prints duplicados | Pastas `css/`, `js/`, `img/`, `assets/` e `docs/`; arquivos que não são do site em `_fora_do_site/` (fora do Git) |
| 2 | Título das páginas (SEO) | Revisão técnica | 9 páginas com o título "EcoLógica Soluções \| Sobre Nós"; Home com "EcoEnergia" | Título próprio em cada página |
| 3 | Meta description | Requisito A06 | Só a Home tinha | Todas as 10 páginas |
| 4 | Link "Pular para o conteúdo" | Revisão técnica (acessibilidade) | Funcionava só na Home (`id="conteudo"` faltava nas outras) | Funciona nas 10 páginas |
| 5 | Botão do menu no celular | Revisão técnica (acessibilidade) | `aria-controls="menu-principal"` apontava para um id inexistente | `<nav id="menu-principal" aria-label="Menu principal">`, tecla Esc fecha o menu |
| 6 | Página atual no menu | Revisão técnica (usabilidade) | Não havia indicação | Item destacado com `aria-current="page"` |
| 7 | Validação W3C | Requisito A06 | `border="1"` na tabela e `width="100%"` no iframe (erros) | Removidos; estilo feito no CSS. Validador oficial W3C (vnu.jar): 0 erros e 0 avisos nas 10 páginas e no CSS |
| 8 | Vídeo | Requisito A06 (multimídia) | `poster="img/poster-video.jpg"` apontava para arquivo inexistente | Poster criado e vídeo responsivo |
| 9 | Áudio | Requisito A06 (multimídia) | Arquivo .m4a declarado como `audio/mpeg` | Tipo correto `audio/mp4` |
| 10 | Contraste | Revisão técnica (acessibilidade) | Títulos e legendas brancos direto sobre a foto de fundo | Painel verde escuro (92%) atrás do conteúdo; contraste ≈ 10:1 |
| 11 | Botão "aumentar texto" | Revisão técnica (acessibilidade) | Só aumentava títulos (corpo do texto em `px`) | Tamanhos em `rem`; aumenta todo o texto e a preferência fica salva |
| 12 | Botões de acessibilidade | Revisão técnica (acessibilidade) | `aria-label` diferente do texto visível | Texto visível como nome + `aria-pressed` indicando ligado/desligado |
| 13 | Galeria | Revisão técnica (conteúdo) | Duas imagens com o mesmo `alt`; fonte "Acervo Próprio" | `alt` descritivo e único; grade responsiva; legenda com fonte |
| 14 | Impacto | Requisito A06 (dados com fontes) | Uma tabela sem fonte | Tabela de resultados + tabela com dados da EPE e do IBGE com links |
| 15 | Contato | Requisito A06 | Sem dados de contato; sem `id` no form (JS não funcionava) | Endereço, telefone e e-mail fictícios; campos `select`, `textarea` e LGPD; ajuda em cada campo; equipe |
| 16 | Validação do formulário (JS) | Requisito A06 (JavaScript como diferencial) | Só validação nativa | Mensagens em português, data mínima = hoje, telefone só números, mensagem de sucesso |
| 17 | Orçamento | Requisito A06 | Só proposta de desenvolvimento; sem `h1` | Comparativo de 3 hospedagens (Railway, Vercel, Netlify) e 3 domínios, com justificativa |
| 18 | Acessibilidade (página) | Revisão técnica (conteúdo) | 3 itens; citava cores (#006400, #9ACD32) que o site não usa | Lista completa de recursos do site, medidas nos prédios (NBR 9050) e legislação |
| 19 | Home | Revisão técnica (conteúdo) | Só o banner | Banner + botões de ação + seção sobre o tema e ODS + 3 serviços |
| 20 | Português | Revisão técnica | Expressões de Portugal ("equipa", "está a ser") | Português do Brasil |
| 21 | Imagens | Revisão técnica (desempenho) | Logo 720 px (255 KB) | Logo 500 px (138 KB); `loading="lazy"` e `width/height` nas imagens |
| 22 | Publicação | Requisito A06 | Sem configuração | `package.json` + `serve.json` prontos para o Railway |
| 23 | Tamanho do podcast | Revisão técnica (desempenho) | `podcast.m4a` com 37,4 MB (AAC estéreo 256 kbps), lento para carregar e acima do limite de 25 MB do upload pelo site do GitHub | 9,7 MB (AAC mono 64 kbps, qualidade adequada para voz), redução de 74%, mesma duração |
