# Evidências de testes

> Os itens marcados com 📸 precisam de print. Salve os prints na pasta `docs/evidencias/` com os nomes sugeridos e marque o resultado.

## 1. W3C Validator (HTML) - 10 páginas

Como testar: acessar https://validator.w3.org/ → aba **Validate by URI** → colar o endereço de cada página publicada no Railway → **Check**.

| Página | Resultado | Print |
|---|---|---|
| index.html | ☐ sem erros | 📸 `w3c-index.png` |
| sobre.html | ☐ sem erros | 📸 `w3c-sobre.png` |
| projetos.html | ☐ sem erros | 📸 `w3c-projetos.png` |
| impacto.html | ☐ sem erros | 📸 `w3c-impacto.png` |
| acessibilidade.html | ☐ sem erros | 📸 `w3c-acessibilidade.png` |
| galeria.html | ☐ sem erros | 📸 `w3c-galeria.png` |
| midia.html | ☐ sem erros | 📸 `w3c-midia.png` |
| noticias.html | ☐ sem erros | 📸 `w3c-noticias.png` |
| contato.html | ☐ sem erros | 📸 `w3c-contato.png` |
| orcamento_hospedagem.html | ☐ sem erros | 📸 `w3c-orcamento.png` |

**Validação local com o validador oficial do W3C (Nu HTML Checker `vnu.jar`, versão 26.11.9) em 12/11/2026:** as 10 páginas HTML e os 2 arquivos CSS passaram com **0 erros e 0 avisos** (`java -jar vnu.jar --also-check-css *.html css/*.css`). Na versão antiga das páginas o mesmo validador acusou: `midia.html` - erro "Bad value 100% for attribute width on element iframe"; `impacto.html` - aviso "The border attribute on the table element is obsolete". Os dois foram corrigidos.

Outras verificações automáticas feitas no código (12/11/2026): todas as tags abertas e fechadas corretamente, nenhum `id` duplicado, todos os `label for` e `aria-controls` apontam para ids existentes, todas as imagens têm `alt`, todos os links internos e arquivos de mídia existem, cada página tem um único `h1`, `title`, `meta description` e `lang="pt-BR"`. Atributos inválidos do MVP foram removidos (`border="1"` na tabela, `width="100%"` no iframe).

## 2. Navegação por teclado

| Teste | Resultado esperado | OK? |
|---|---|---|
| Tab na primeira vez | Aparece o link "Pular para o conteúdo principal" | ☐ |
| Enter no link de pular | Foco vai para o conteúdo da página | ☐ |
| Tab pelos botões de acessibilidade e menu | Contorno amarelo visível em cada item | ☐ |
| Enter em um item do menu | Abre a página correspondente | ☐ |
| No celular: Enter no botão ☰ e Esc | Menu abre e fecha; foco volta ao botão | ☐ |
| Formulário só com teclado | Todos os campos alcançáveis; Espaço marca a caixa LGPD | ☐ |
| Notícias: Enter em "Clique para ler" | Texto completo abre e fecha | ☐ |
| Mídia: Tab até o vídeo e Espaço | Vídeo e áudio tocam e pausam | ☐ |

📸 Print sugerido: `teclado-foco.png` (mostrando o contorno amarelo).

## 3. Contraste (WebAIM Contrast Checker - https://webaim.org/resources/contrastchecker/)

| Combinação | Razão calculada | WCAG AA (mín. 4,5:1) |
|---|---|---|
| Texto branco #ffffff sobre verde escuro #164b36 | ≈ 10:1 | ✅ |
| Texto verde #164b36 sobre menu verde claro #e8f4ec | ≈ 8,9:1 | ✅ |
| Texto branco sobre botão verde #23734f | ≈ 5,8:1 | ✅ |
| Links amarelo claro #ffe08a sobre verde escuro #164b36 | ≈ 9:1 | ✅ |

Nas páginas, o texto fica sobre painéis escuros (opacidade 92%) e não diretamente sobre a foto de fundo. 📸 Print sugerido: `contraste-webaim.png`.

## 4. Visualização no celular, tablet e desktop

Teste feito com o DevTools (F12 → ícone de celular) nas larguras 375 px, 768 px e 1280 px.

* Em 375 px nenhuma das 10 páginas tem rolagem horizontal (largura da página = largura da tela).
* O botão ☰ abre e fecha o menu em todas as páginas.
* Tabelas grandes ganham rolagem lateral própria (`.tabela-responsiva`), sem quebrar o layout.
* Vídeo, áudio e mapa ocupam 100% da largura disponível.

Prints existentes do MVP: `evidencias/celular1.jpeg` a `celular8.jpeg`, `telacheia1-6.png`, `telaminimizada1-6.png`, `teladaltonismo.png`.
📸 Novos prints sugeridos do site publicado: `final-celular.png`, `final-tablet.png`, `final-desktop.png`.

## 5. Formulário (contato.html)

| Teste | Resultado esperado | OK? |
|---|---|---|
| Enviar vazio | Navegador mostra "Digite seu nome completo..." e para no 1º campo | ☐ |
| Nome com números ("Maria 123") | Mensagem de erro do nome | ☐ |
| E-mail sem @ | Mensagem de e-mail inválido | ☐ |
| Telefone com 8 dígitos | Mensagem pedindo 10 ou 11 dígitos | ☐ |
| Data no passado | Não é aceita (mínimo = hoje) | ☐ |
| Funcionários = 0 | Mensagem pedindo número a partir de 1 | ☐ |
| Tudo correto | Mensagem verde "Obrigado, ...!" e formulário limpo | ☐ |

Teste automatizado local (12/11/2026): nome "Maria 123" foi bloqueado com a mensagem em português; preenchimento correto exibiu a mensagem de sucesso; data mínima ficou igual à data do dia.

## 6. Multimídia e links no endereço publicado

| Item | OK? |
|---|---|
| Vídeo toca com poster | ☐ |
| Podcast toca | ☐ |
| Mapa aparece | ☐ |
| Todas as imagens da galeria aparecem | ☐ |
| Todos os 10 itens do menu abrem sem erro 404 | ☐ |
| Endereço começa com https:// (cadeado) | ☐ |
