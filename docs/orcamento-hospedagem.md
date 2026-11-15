# Orçamento de hospedagem e domínio

Valores consultados nos sites oficiais em **15/11/2026** (railway.com/pricing, vercel.com/pricing, netlify.com/pricing, registro.br, hostinger.com/br e godaddy.com/pt-br). Preços em dólar convertidos com US$ 1 = R$ 5,50; podem variar com o câmbio e com mudanças de plano.

## Hospedagem (3 opções)

| Critério | **Railway (escolhido)** | Vercel | Netlify |
|---|---|---|---|
| Plano analisado | Hobby | Pro | Pro |
| Custo mensal | US$ 5 (≈ R$ 27,50) | US$ 20 por desenvolvedor (≈ R$ 110) | US$ 20 com membros ilimitados (≈ R$ 110) |
| Custo anual | ≈ R$ 330 | ≈ R$ 1.320 | ≈ R$ 1.320 |
| HTTPS | Automático | Automático | Automático |
| Deploy automático pelo GitHub | Sim | Sim | Sim |
| Back-end e banco de dados no futuro | Sim | Parcial (serverless) | Parcial (serverless) |
| Limite de gastos | Sim | Sim | Sim |
| Plano gratuito | Free: 30 dias com US$ 5, depois US$ 1/mês (usado neste projeto acadêmico) | Hobby: só uso pessoal | Free: com limites de uso |

## Domínio (3 opções)

| Registrador | Domínio | Custo anual | Observação |
|---|---|---|---|
| **Registro.br (escolhido)** | ecologica.tec.br | R$ 40,00 | Órgão oficial; mesmo preço na renovação |
| Hostinger | ecologicasolucoes.com | R$ 0,01 no 1º ano (plano de 3 anos) | Promoção; renovação padrão mais cara, não informada na oferta |
| GoDaddy | ecologicasolucoes.com | R$ 64,99 (1º ano) / R$ 109,99 (renovação) | Internacional; venda de adicionais |

## Justificativa

* **Railway:** menor custo entre os planos pagos analisados, HTTPS automático, deploy automático a cada `git push`, limite de gastos e possibilidade de adicionar back-end/banco de dados (por exemplo, para salvar os contatos do formulário). Também é a plataforma exigida pela disciplina.
* **Registro.br (.tec.br):** menor preço, sem aumento na renovação, pagamento em reais e extensão ligada a tecnologia.
* **Sustentabilidade:** site estático e leve consome menos servidor e rede.

## Resumo de custos

| Item | Valor |
|---|---|
| Desenvolvimento front-end e publicação | R$ 3.000,00 (único) |
| Módulo de acessibilidade | R$ 1.500,00 (único) |
| Infraestrutura (Railway + domínio, com folga para IOF e câmbio) | R$ 400,00 / ano |
| Manutenção opcional | R$ 1.200,00 / ano |
| **Total do desenvolvimento** | **R$ 4.500,00** |

Detalhamento completo: `custos.docx` e a página `orcamento_hospedagem.html`.
