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
