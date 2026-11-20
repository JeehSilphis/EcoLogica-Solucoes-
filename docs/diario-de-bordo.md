# Diário de bordo - EcoLógica Soluções

Registro das decisões, aprendizados, dificuldades e soluções da Atividade A05 (MVP) até a A06 (entrega final).

> Revise as datas e complete com os detalhes que você lembrar (conversas com o professor, testes feitos etc.).

---

### 08/10/2026 - Início do projeto (A05)
* **Decisão:** tema "Sustentabilidade e Impacto Social" com foco em uma consultoria fictícia de energia limpa e acessibilidade, a **EcoLógica Soluções**.
* **Atividade:** leitura do template de escopo e primeira versão do documento.
* **Aprendizado:** como escrever objetivos, público-alvo e critérios de aceitação de um projeto.

### 21/10/2026 - Escopo, identidade visual e Home (MVP)
* **Decisão:** paleta de verdes (#164b36, #23734f, #e8f4ec) com foco amarelo (#ffbf47) para foco do teclado; logotipo com folha + engrenagem (natureza + tecnologia).
* **Atividade:** escopo finalizado (`EscopoEcoLogica.docx`), `index.html` com HTML semântico, slides do MVP e prints no celular e no desktop.
* **Dificuldade:** organizar logo à esquerda e botões de acessibilidade + menu à direita.
* **Solução:** cabeçalho com Flexbox e menu em CSS Grid de 5 colunas.

### 22/10/2026 - Apresentação do MVP
* Apresentação da Home e do escopo para o professor/cliente.
* Pontos de melhoria anotados (ver `relatorio-melhorias.md`).

### 05/11/2026 - Conteúdo multimídia e imagens
* **Atividade:** gravação do vídeo institucional e do podcast; seleção das imagens de painéis solares e rampas de acesso.
* **Aprendizado:** uso das tags `<video controls poster>`, `<audio controls>` e `<iframe>` do Google Maps.
* **Dificuldade:** o arquivo do podcast ficou grande (≈ 37 MB), o que deixa a página de mídia lenta e passa do limite de 25 MB do upload pelo site do GitHub.
* **Solução (12/11/2026):** áudio convertido com FFmpeg para AAC mono a 64 kbps, ideal para voz. Ficou com ≈ 9,7 MB (redução de 74%) e a mesma duração (19 min 22 s).

### 06/11/2026 - Construção das 10 páginas
* **Atividade:** criação das páginas internas reaproveitando o cabeçalho e o rodapé da Home; criação do `style1.css` para as páginas internas.
* **Recursos de acessibilidade em JavaScript:** modo daltônico (salvo no `localStorage`), leitura da página em voz (Web Speech API) e aumento de texto.
* **Atividade:** página de notícias com `details/summary` e orçamento com tabela de custos.

### 12/11/2026 - Revisão final para a A06 e preparação do deploy
* **Organização:** arquivos separados nas pastas `css/`, `js/`, `img/`, `assets/` e `docs/`, como pede a atividade. Arquivos que não fazem parte do site foram para `_fora_do_site/` (ignorada pelo Git).
* **Correções de HTML:** título e `meta description` próprios em cada página (antes todas tinham o título "Sobre Nós"); `id="conteudo"` no `<main>` de todas as páginas para o link "Pular para o conteúdo" funcionar; `id="menu-principal"` no `<nav>` (o botão do menu apontava para um id que não existia); removido o atributo obsoleto `border="1"` da tabela; `width="100%"` do iframe (inválido no W3C) trocado por CSS.
* **Correções de mídia:** o poster do vídeo apontava para um arquivo que não existia; o tipo do áudio `.m4a` estava como `audio/mpeg` (correto: `audio/mp4`).
* **Conteúdo:** página de orçamento passou a comparar 3 hospedagens (Railway, Vercel, Netlify) e 3 domínios; impacto ganhou fontes oficiais (EPE e IBGE); contato ganhou dados fictícios, mais campos e a equipe; acessibilidade ganhou a lista completa de medidas.
* **Acessibilidade:** texto em `rem` para o botão de aumentar texto funcionar em todo o site; `aria-pressed` nos botões de acessibilidade; destaque da página atual no menu (`aria-current`); painéis escuros atrás do texto para garantir contraste sobre a foto de fundo.
* **JavaScript:** validação extra do formulário (mensagens em português, data mínima = hoje, telefone só com números, mensagem de sucesso).
* **Deploy:** criados `package.json` e `serve.json` para o Railway servir o site estático.
* **Aprendizado:** o Railway precisa de um comando de início (`npm start`) e usa a variável `PORT`; links relativos devem respeitar maiúsculas e minúsculas porque o servidor do Railway é Linux.

### 12/11/2026 - Deploy no Railway
* **Atividade:** código enviado ao GitHub (https://github.com/JeehSilphis/EcoLogica-Solucoes-) por cima do histórico do MVP; repositório ligado ao Railway (plano Free/Trial) com deploy automático; domínio gerado em Settings > Networking > Generate Domain.
* **URL publicada:** https://ecologica-solucoes-production.up.railway.app (HTTPS; o endereço http:// redireciona para https://).
* **Dificuldade:** o endereço principal (/) dava erro 404, porque o servidor `serve` estava configurado sem "cleanUrls" e sem listagem de pastas, então não procurava o index.html.
* **Solução:** regra de rewrite de "/" para "/index.html" no `serve.json`; o Railway publicou a correção sozinho após o `git push`.
* **Testes no site publicado:** as 10 páginas, CSS, JS, imagens, vídeo e podcast responderam sem erro; formulário validado; layout no celular conferido; W3C sem erros.

### 15/11/2026 - Novo domínio e nova validação no W3C
* **Decisão:** o domínio gerado pelo Railway foi trocado por um endereço mais curto e fácil de apresentar: **https://ecologica.up.railway.app** (Settings > Networking). O endereço antigo (ecologica-solucoes-production.up.railway.app) deixou de funcionar.
* **Atividade:** URLs atualizadas nos READMEs e na documentação; as 10 páginas validadas de novo no validator.w3.org pela URL nova.
* **Dificuldade:** o validator.w3.org usa proteção anti-robô (Cloudflare) e bloqueia muitas validações seguidas (erro 429).
* **Solução:** validar uma página por vez, com intervalo entre elas, depois de passar pela verificação "Confirme que é humano".

### 19/11/2026 - Aula 10 (JavaScript): validação da mensagem do formulário
* **Atividade da aula:** impedir o envio do formulário de contato quando o campo "Mensagem" tiver menos de 10 caracteres, mostrando uma mensagem de erro em vermelho abaixo do campo.
* **Como foi feito:** no `script.js`, o evento `submit` usa `event.preventDefault()`, conta os caracteres da mensagem com `trim().length` e, se forem menos de 10, mostra o erro em um `<span>` com `role="alert"` (ligado ao campo por `aria-describedby`), deixa a borda vermelha e coloca o foco no campo. O erro some sozinho quando a pessoa completa os 10 caracteres (evento `input`).
* **Decisão:** usar um vermelho claro (#ff9a92), porque o vermelho puro sobre o fundo verde-escuro do formulário não teria o contraste mínimo de 4,5:1.
* **Testes:** 6 de 6 aprovados no site publicado (5 caracteres, só espaços, exatamente 10, erro que some ao completar e os demais campos ainda validados pelo HTML5); W3C sem erros.

### 20/11/2026 - Aula 10 (JavaScript): vídeo sobre reciclagem na página de mídia
* **Atividade da aula:** inserir em midia.html um vídeo do YouTube sobre reciclagem usando `<iframe>` e criar um botão abaixo dele que mostra um alerta com `addEventListener`.
* **Escolha do vídeo:** "Coleta Seletiva", do canal Momento Ambiental (categoria Educação, 7 minutos). Antes de usar, foi conferido que o YouTube permite incorporar esse vídeo em outros sites.
* **Como foi feito:** o iframe usa o endereço `youtube-nocookie.com` (o YouTube não grava cookies de rastreamento até a pessoa dar o play), tem `title` para leitores de tela e fica dentro da caixa `.iframe-responsivo`, que mantém a proporção 16:9 em qualquer tela. O botão "Já assisti ao vídeo" usa `addEventListener('click')` para mostrar o aviso "Você assistiu ao vídeo sobre reciclagem! Apoie a EcoLógica."
* **Dificuldade:** num dos testes automáticos, o player parecia não carregar. **Solução:** o print mostrou que ele carregava normalmente; o teste é que procurava o player no lugar errado, porque o Chrome abre o YouTube num processo separado.
* **Testes:** 4 de 4 aprovados no site publicado (vídeo carregado, clique, tecla Enter e celular sem rolagem lateral); W3C sem erros.

---

## Uso de Inteligência Artificial no projeto

Conforme as Aulas 08 e 09 (ética e uso responsável da IA), declaro que usei IA generativa como **assistente** neste projeto. A IA ajudou a sugerir código, revisar erros e testar o site publicado. Todas as decisões, a revisão do resultado e a aprovação final foram minhas. Nenhum dado pessoal real foi colado nos prompts (LGPD).

* **Ferramenta:** Claude (Anthropic), pelo aplicativo Claude Code.
* **Onde ajudou:** organização das pastas para o deploy, correções apontadas pelo W3C, revisão de acessibilidade, scripts de teste automático (teclado, formulário e vídeo) e prints de evidência.
* **Como revisei:** cada mudança foi conferida no navegador, validada no W3C Validator, testada com o teclado e publicada com um commit de mensagem clara. Quando o resultado não ficou como eu queria, desfiz a mudança.

### Prompt 1 · 19/11/2026 · Formulário com mensagem mínima (Aula 10)
* **Prompt (resumido):** "Hoje o professor deu a aula de JavaScript e pediu para implementar a parte do formulário: não deixar enviar se a mensagem tiver menos de 10 caracteres e mostrar o erro em vermelho abaixo do campo. Nosso formulário já tem esse código? Mexa só no formulário."
* **Resultado:** ajustado. A IA mostrou que o formulário já tinha validação HTML5, mas ainda não tinha a regra dos 10 caracteres, e sugeriu a função `validarMensagem()` com `preventDefault()` e `trim().length`.
* **O que mudei:** pedi para mexer só no formulário, sem alterar o visual. O vermelho puro não tinha contraste suficiente no fundo verde-escuro, então troquei por um vermelho claro (#ff9a92).
* **O que aprendi:** o JavaScript complementa a validação do HTML5. O `role="alert"` e o `aria-describedby` fazem o leitor de tela anunciar o erro.

### Prompt 2 · 20/11/2026 · Vídeo sobre reciclagem na página de mídia (Aula 10)
* **Prompt (resumido):** "Pode criar na página de mídia um vídeo do YouTube sobre reciclagem com iframe e um botão abaixo dele que mostra um alerta usando addEventListener."
* **Resultado:** aceito depois de conferir. Antes de inserir o vídeo, conferi que o YouTube permite incorporá-lo em outros sites.
* **O que mudei:** usei o endereço `youtube-nocookie.com` (sem cookies de rastreamento antes do play), coloquei `title` no iframe e mantive o vídeo responsivo em 16:9.
* **O que aprendi:** iframes precisam de `title` para acessibilidade. Um teste automático pode falhar por causa do próprio teste: o print mostrou que o vídeo carregava normalmente.

### Prompt 3 · 15/11/2026 · Ajustes pedidos pelo professor (prompt vago × específico)
* **Prompt (resumido):** "O professor falou para eu ajustar a parte de acessibilidade, o ler a página, a página do orçamento_hospedagem e o layout do site."
* **Resultado:** rejeitado e desfeito. Como o pedido estava vago, a IA mudou o layout além do que eu queria, e o site deixou de ficar como era.
* **O que mudei:** desfiz as mudanças com `git revert`, voltando para a versão com os 2 arquivos CSS originais. Depois passei a fazer pedidos específicos, dizendo o arquivo, o que mudar e o que **não** mudar, por exemplo: "mexa só no formulário".
* **O que aprendi:** na prática, foi o que a Aula 08 mostra no slide "prompt vago × prompt específico". Um bom prompt precisa ter contexto, objetivo, formato e restrições. A IA pode errar ou exagerar, e por isso cada mudança deve ser revisada antes do commit, e o Git permite voltar atrás com segurança.

