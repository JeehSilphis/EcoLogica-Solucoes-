# Como publicar no Railway

## 1. Enviar o projeto para o GitHub

1. Crie um repositório vazio no GitHub (ex.: `ecologica`), **sem** README.
2. No terminal, dentro da pasta `EcoLogica`:

```bash
git init -b main
git add .
git commit -m "Site EcoLógica - entrega final A06"
git remote add origin https://github.com/JeehSilphis/EcoLogica-Solucoes-.git
git push -u origin main
```

> Recomendado usar o Git pelo terminal (ou GitHub Desktop). Todos os arquivos têm menos de 25 MB (limite do upload pelo site do GitHub); o maior é o `podcast.m4a`, com cerca de 9,7 MB.

A pasta `_fora_do_site/` não é enviada (está no `.gitignore`).

## 2. Criar o projeto no Railway

1. Acesse https://railway.com e entre com a conta do GitHub.
2. **New Project → Deploy from GitHub repo** → escolha o repositório `EcoLogica-Solucoes-`.
3. O Railway detecta o `package.json`, instala o `serve` e roda `npm start`. Não é preciso configurar variáveis: o `serve` usa a variável `PORT` que o Railway fornece.
4. Aguarde o deploy ficar **Active / Success**.

## 3. Gerar o endereço público (HTTPS)

1. Clique no serviço → **Settings → Networking → Generate Domain**.
2. Se pedir a porta, aceite a porta que o Railway sugerir (é a mesma da variável `PORT` usada pelo `serve`; veja nos logs de deploy a linha "Accepting connections at ...").
3. Abra o endereço `https://....up.railway.app` e teste as 10 páginas.

## 4. Deploy automático

A cada `git push` para a branch `main`, o Railway publica a nova versão sozinho.

## 5. Depois do deploy

* Atualize a URL do site e do GitHub no `README.md` (raiz) e em `docs/README.md`.
* Valide as 10 páginas no W3C pela URL publicada e salve os prints (ver `evidencias-testes.md`).
* Tire o print da página principal publicada (.png) para a entrega no Teams.
