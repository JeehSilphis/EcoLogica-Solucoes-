# Evidências de testes

> Prints tirados do **site publicado** (https://ecologica-solucoes-production.up.railway.app) em 12/11/2026 e salvos em `docs/evidencias/`.

## 1. W3C Validator (HTML) - 10 páginas

**Site publicado validado em 12/11/2026 (https://ecologica-solucoes-production.up.railway.app):** 0 erros e 0 avisos nas 10 páginas. Index, sobre, projetos, impacto e acessibilidade foram validadas no validator.w3.org online pela URL; as outras 5 páginas foram validadas pela URL publicada com o mesmo validador oficial rodando localmente (o site online limitou as consultas seguidas). 

**Sobre os prints:** no dia 12/11 o validator.w3.org estava bloqueando as consultas com uma verificação anti-robô (Cloudflare, erro 429), então os prints foram feitos com o **mesmo validador do W3C (Nu Html Checker, vnu 26.11.9) rodando localmente**, validando cada página **pela URL publicada no Railway**. A interface e o resultado são os mesmos do validator.w3.org/nu. Para mostrar ao vivo, use https://validator.w3.org/nu/ com a URL do site.

Como testar: acessar https://validator.w3.org/ → aba **Validate by URI** → colar o endereço de cada página publicada no Railway → **Check**.

| Página | Resultado | Print |
|---|---|---|
| index.html | ✅ 0 erros, 0 avisos | `w3c-index.png` |
| sobre.html | ✅ 0 erros, 0 avisos | `w3c-sobre.png` |
| projetos.html | ✅ 0 erros, 0 avisos | `w3c-projetos.png` |
| impacto.html | ✅ 0 erros, 0 avisos | `w3c-impacto.png` |
| acessibilidade.html | ✅ 0 erros, 0 avisos | `w3c-acessibilidade.png` |
| galeria.html | ✅ 0 erros, 0 avisos | `w3c-galeria.png` |
| midia.html | ✅ 0 erros, 0 avisos | `w3c-midia.png` |
| noticias.html | ✅ 0 erros, 0 avisos | `w3c-noticias.png` |
| contato.html | ✅ 0 erros, 0 avisos | `w3c-contato.png` |
| orcamento_hospedagem.html | ✅ 0 erros, 0 avisos | `w3c-orcamento.png` |

**Validação local com o validador oficial do W3C (Nu HTML Checker `vnu.jar`, versão 26.11.9) em 12/11/2026:** as 10 páginas HTML e os 2 arquivos CSS passaram com **0 erros e 0 avisos** (`java -jar vnu.jar --also-check-css *.html css/*.css`). Na versão antiga das páginas o mesmo validador acusou: `midia.html` - erro "Bad value 100% for attribute width on element iframe"; `impacto.html` - aviso "The border attribute on the table element is obsolete". Os dois foram corrigidos.

Outras verificações automáticas feitas no código (12/11/2026): todas as tags abertas e fechadas corretamente, nenhum `id` duplicado, todos os `label for` e `aria-controls` apontam para ids existentes, todas as imagens têm `alt`, todos os links internos e arquivos de mídia existem, cada página tem um único `h1`, `title`, `meta description` e `lang="pt-BR"`. Atributos inválidos do MVP foram removidos (`border="1"` na tabela, `width="100%"` no iframe).

## 2. Navegação por teclado

| Teste | Resultado esperado | OK? |
|---|---|---|
| Tab na primeira vez | Aparece o link "Pular para o conteúdo principal" | ✅ `teclado-1-pular-conteudo.png` |
| Enter no link de pular | Foco vai para o conteúdo da página | ☐ |
| Tab pelos botões de acessibilidade e menu | Contorno amarelo visível em cada item | ✅ `teclado-2-foco-menu.png` (foco em "Sobre") |
| Enter em um item do menu | Abre a página correspondente | ☐ |
| No celular: Enter no botão ☰ e Esc | Menu abre e fecha; foco volta ao botão | ☐ |
| Formulário só com teclado | Todos os campos alcançáveis; Espaço marca a caixa LGPD | ☐ |
| Notícias: Enter em "Clique para ler" | Texto completo abre e fecha | ✅ `teclado-3-noticia-aberta-com-enter.png` |
| Mídia: Tab até o vídeo e Espaço | Vídeo e áudio tocam e pausam | ☐ |

Os itens ainda marcados com ☐ devem ser testados à mão durante o ensaio da apresentação (Tab, Enter e Esc).

## 3. Contraste (WebAIM Contrast Checker - https://webaim.org/resources/contrastchecker/)

| Combinação | Razão calculada | WCAG AA (mín. 4,5:1) |
|---|---|---|
| Texto branco #ffffff sobre verde escuro #164b36 | **10,02:1** (WebAIM) | ✅ `contraste-webaim-texto-branco.png` |
| Texto verde #164b36 sobre menu verde claro #e8f4ec | **8,87:1** (WebAIM) | ✅ `contraste-webaim-menu.png` |
| Texto branco sobre botão verde #23734f | ≈ 5,8:1 | ✅ |
| Links amarelo claro #ffe08a sobre verde escuro #164b36 | ≈ 9:1 | ✅ |

Nas páginas, o texto fica sobre painéis escuros (opacidade 92%) e não diretamente sobre a foto de fundo.

## 4. Visualização no celular, tablet e desktop

Teste feito com o DevTools (F12 → ícone de celular) nas larguras 375 px, 768 px e 1280 px.

* Em 375 px nenhuma das 10 páginas tem rolagem horizontal (largura da página = largura da tela).
* O botão ☰ abre e fecha o menu em todas as páginas.
* Tabelas grandes ganham rolagem lateral própria (`.tabela-responsiva`), sem quebrar o layout.
* Vídeo, áudio e mapa ocupam 100% da largura disponível.

Prints existentes do MVP: `evidencias/celular1.jpeg` a `celular8.jpeg`, `telacheia1-6.png`, `telaminimizada1-6.png`, `teladaltonismo.png`.
Prints do site publicado (A06):
* Celular (375 × 812): `final-celular.png`, `final-celular-menu-aberto.png`, `final-celular-galeria.png`, `final-celular-tabela.png`
* Tablet (768 × 1024): `final-tablet.png`
* Desktop (1366 × 900): `final-desktop.png`
* As 10 páginas no desktop (também servem de plano B da apresentação): pasta `paginas/` (`01-index.png` a `10-orcamento_hospedagem.png`)
* Recursos de acessibilidade: `acessibilidade-modo-daltonico.png`, `acessibilidade-texto-aumentado.png`

## 5. Formulário (contato.html)

| Teste | Resultado esperado | OK? |
|---|---|---|
| Enviar vazio | Navegador mostra "Digite seu nome completo..." e para no 1º campo | ☐ |
| Nome com números ("Maria 123") | Mensagem de erro do nome | ✅ `formulario-1-erro-campos.png` |
| E-mail sem @ | Mensagem de e-mail inválido | ✅ `formulario-1-erro-campos.png` |
| Telefone com 4 dígitos | Mensagem pedindo 10 ou 11 dígitos | ✅ `formulario-1-erro-campos.png` |
| Data no passado | Não é aceita (mínimo = hoje) | ☐ |
| Funcionários = 0 | Mensagem pedindo número a partir de 1 | ☐ |
| Tudo correto | Mensagem verde "Obrigado, ...!" e formulário limpo | ✅ `formulario-3-envio-correto.png` |

Ao enviar com erro, os campos inválidos ficam com borda amarela e aparece o aviso "Há campos com erro..." abaixo do botão (`formulario-2-erro-aviso.png`). Teste automatizado (12/11/2026): nome "Maria 123" foi bloqueado com a mensagem em português; preenchimento correto exibiu a mensagem de sucesso; data mínima ficou igual à data do dia.

## 6. Multimídia e links no endereço publicado

| Item | OK? |
|---|---|
| Vídeo toca com poster | ✅ carregou no site publicado (12/11) |
| Podcast toca | ✅ carregou no site publicado (12/11) |
| Mapa aparece | ✅ |
| Todas as imagens da galeria aparecem | ✅ todas respondem 200 |
| Todos os 10 itens do menu abrem sem erro 404 | ✅ |
| Endereço começa com https:// (cadeado) | ✅ http redireciona para https |

## 7. Painel do Railway

| Item | Print |
|---|---|
| Serviço com deploy ACTIVE, "Deployment successful" e domínio público ecologica-solucoes-production.up.railway.app | ✅ `railway-deploy-ativo.png` |
