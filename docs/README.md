# 🍃 EcoLógica Soluções

<p align="center">
  <img src="../img/logo.png" alt="Logotipo da EcoLógica Soluções" width="200">
</p>

Projeto acadêmico da disciplina **Desenvolvimento Front-End** do curso de Análise e Desenvolvimento de Sistemas da **Fatec São Caetano do Sul - Antonio Russo** (Prof. Paulo Fratta), Atividade A06 - Conclusão e Apresentação de Projeto de Site.

Site institucional de uma empresa fictícia de consultoria em **energia sustentável e acessibilidade**, com 10 páginas interligadas em HTML5, CSS3 e JavaScript.

## 🔗 Links

| Item | Endereço |
|---|---|
| Site publicado (Railway, HTTPS) | **https://ecologica-solucoes-production.up.railway.app** |
| Repositório no GitHub | **https://github.com/JeehSilphis/EcoLogica-Solucoes-** |


## 🎯 Tema

**Sustentabilidade e Impacto Social.** O projeto incentiva a transição para energia limpa (solar e eficiência energética) e a inclusão de pessoas com deficiência, tanto nos prédios dos clientes quanto no próprio site. Relaciona-se com os ODS 7, 10, 11 e 13 da ONU.

## 🚀 Objetivos

**Geral:** desenvolver um portal completo e acessível que permita a pessoas e empresas contratar consultoria para tornar suas instalações sustentáveis e inclusivas.

**Específicos:**
1. Apresentar de forma clara as soluções de energia solar, eficiência energética e acessibilidade.
2. Captar contatos por meio de um formulário validado.
3. Garantir acessibilidade para pessoas com deficiência (LBI 13.146/2015 e WCAG 2.1).
4. Publicar o site no Railway com HTTPS e deploy automático.

## 🗺️ Páginas

| Nº | Página | Conteúdo |
|---|---|---|
| 1 | `index.html` | Resumo do tema, apresentação, serviços e menu principal |
| 2 | `sobre.html` | História, missão, visão, valores e ODS |
| 3 | `projetos.html` | Projetos de sustentabilidade e impacto social |
| 4 | `impacto.html` | Tabelas de resultados e dados públicos com fontes |
| 5 | `acessibilidade.html` | Medidas de inclusão para PCD (site e prédios) |
| 6 | `galeria.html` | Imagens com legendas e fontes |
| 7 | `midia.html` | Vídeo, áudio (podcast) e mapa (iframe) |
| 8 | `noticias.html` | Notícias com "leia mais" (details/summary) |
| 9 | `contato.html` | Dados fictícios, formulário validado e equipe |
| 10 | `orcamento_hospedagem.html` | Comparativo de 3 hospedagens e 3 domínios |

## 🛠️ Tecnologias

* **HTML5** semântico (`header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `details`).
* **CSS3** com variáveis, Grid, Flexbox e Media Queries (celular, tablet e desktop).
* **JavaScript** puro: menu para celular, modo daltônico, leitura em voz (Web Speech API), aumento de texto e validação extra do formulário.
* **Git + GitHub** para versionamento e **Railway** para hospedagem (servidor estático `serve`, Node.js).
* Editor: Visual Studio Code.

## 👥 Divisão de funções

| Integrante | Funções |
|---|---|
| Jéssica da Silva Soares | Escopo do projeto, identidade visual (logotipo e cores), HTML e CSS das 10 páginas, JavaScript de acessibilidade, formulário, multimídia, documentação, deploy no Railway e apresentação |

## 📂 Estrutura de pastas

```
EcoLogica/
├── index.html, contato.html, orcamento_hospedagem.html
├── sobre.html, projetos.html, impacto.html, acessibilidade.html,
│   galeria.html, midia.html, noticias.html
├── css/      style.css (home) e style1.css (páginas internas)
├── js/       script.js
├── img/      logotipo, fotos e poster do vídeo
├── assets/   vídeo e podcast
├── docs/     esta documentação
├── package.json   (comando de inicialização usado pelo Railway)
└── serve.json     (configuração do servidor estático)
```

## 📑 Documentação (/docs)

* [Diário de bordo](diario-de-bordo.md)
* [Orçamento de hospedagem e domínio](orcamento-hospedagem.md)
* [Evidências de testes](evidencias-testes.md)
* [Relatório de melhorias (MVP → final)](relatorio-melhorias.md)
* [Como publicar no Railway](deploy-railway.md)
* Escopo do projeto (A05): `EscopoEcoLogica.docx`
* Detalhamento de custos: `custos.docx`
* Apresentação do MVP: `Apresentacao-MVP-EcoLogica.pptx`
* Prints de testes: pasta `evidencias/`
* Código original do MVP (para comparação): pasta `mvp-codigo-original/`

## ▶️ Como rodar no computador

Abra o `index.html` no navegador **ou**, com Node.js instalado:

```bash
npm install
npm start
```
