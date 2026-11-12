# Relatório de melhorias - do MVP (A05) ao site final (A06)

> **Complete a coluna "Apontado por"** com o que o professor/cliente falou na apresentação do MVP. Os itens abaixo são as correções feitas no código; se algum ponto citado pelo professor não estiver aqui, acrescente uma linha.
> Para os prints de "antes", use `docs/evidencias/` (prints do MVP) e o código em `docs/mvp-codigo-original/`.

| # | Ponto | Apontado por | Antes (MVP / versão de 06/11) | Depois (final) |
|---|---|---|---|---|
| 1 | Estrutura de pastas | Requisito da A06 | Todos os arquivos soltos na raiz, junto com PDFs, .docx e prints duplicados | Pastas `css/`, `js/`, `img/`, `assets/` e `docs/`; arquivos que não são do site em `_fora_do_site/` (fora do Git) |
| 2 | Título das páginas (SEO) | Revisão | 9 páginas com o título "EcoLógica Soluções \| Sobre Nós"; Home com "EcoEnergia" | Título próprio em cada página |
| 3 | Meta description | Requisito A06 | Só a Home tinha | Todas as 10 páginas |
| 4 | Link "Pular para o conteúdo" | Acessibilidade | Funcionava só na Home (`id="conteudo"` faltava nas outras) | Funciona nas 10 páginas |
| 5 | Botão do menu no celular | Acessibilidade | `aria-controls="menu-principal"` apontava para um id inexistente | `<nav id="menu-principal" aria-label="Menu principal">`, tecla Esc fecha o menu |
| 6 | Página atual no menu | Usabilidade | Não havia indicação | Item destacado com `aria-current="page"` |
| 7 | Validação W3C | Requisito A06 | `border="1"` na tabela e `width="100%"` no iframe (erros) | Removidos; estilo feito no CSS. Validador oficial W3C (vnu.jar): 0 erros e 0 avisos nas 10 páginas e no CSS |
| 8 | Vídeo | Multimídia | `poster="img/poster-video.jpg"` apontava para arquivo inexistente | Poster criado e vídeo responsivo |
| 9 | Áudio | Multimídia | Arquivo .m4a declarado como `audio/mpeg` | Tipo correto `audio/mp4` |
| 10 | Contraste | Acessibilidade | Títulos e legendas brancos direto sobre a foto de fundo | Painel verde escuro (92%) atrás do conteúdo; contraste ≈ 10:1 |
| 11 | Botão "aumentar texto" | Acessibilidade | Só aumentava títulos (corpo do texto em `px`) | Tamanhos em `rem`; aumenta todo o texto e a preferência fica salva |
| 12 | Botões de acessibilidade | Acessibilidade | `aria-label` diferente do texto visível | Texto visível como nome + `aria-pressed` indicando ligado/desligado |
| 13 | Galeria | Conteúdo | Duas imagens com o mesmo `alt`; fonte "Acervo Próprio" | `alt` descritivo e único; grade responsiva; legenda com fonte |
| 14 | Impacto | Requisito "dados com fontes" | Uma tabela sem fonte | Tabela de resultados + tabela com dados da EPE e do IBGE com links |
| 15 | Contato | Requisito A06 | Sem dados de contato; sem `id` no form (JS não funcionava) | Endereço, telefone e e-mail fictícios; campos `select`, `textarea` e LGPD; ajuda em cada campo; equipe |
| 16 | Validação do formulário (JS) | Diferencial | Só validação nativa | Mensagens em português, data mínima = hoje, telefone só números, mensagem de sucesso |
| 17 | Orçamento | Requisito A06 | Só proposta de desenvolvimento; sem `h1` | Comparativo de 3 hospedagens (Railway, Vercel, Netlify) e 3 domínios, com justificativa |
| 18 | Acessibilidade (página) | Conteúdo | 3 itens; citava cores (#006400, #9ACD32) que o site não usa | Lista completa de recursos do site, medidas nos prédios (NBR 9050) e legislação |
| 19 | Home | Conteúdo | Só o banner | Banner + botões de ação + seção sobre o tema e ODS + 3 serviços |
| 20 | Português | Revisão | Expressões de Portugal ("equipa", "está a ser") | Português do Brasil |
| 21 | Imagens | Desempenho | Logo 720 px (255 KB) | Logo 500 px (138 KB); `loading="lazy"` e `width/height` nas imagens |
| 22 | Publicação | Requisito A06 | Sem configuração | `package.json` + `serve.json` prontos para o Railway |
| 23 | Tamanho do podcast | Desempenho | `podcast.m4a` com 37,4 MB (AAC estéreo 256 kbps), lento para carregar e acima do limite de 25 MB do upload pelo site do GitHub | 9,7 MB (AAC mono 64 kbps, qualidade adequada para voz), redução de 74%, mesma duração |
