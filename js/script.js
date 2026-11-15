// =========================================================
// EcoLógica Soluções - interações do site
// =========================================================

// ---------------------------------------------------------
// Funções auxiliares para salvar preferências no navegador
// (o navegador pode bloquear o localStorage)
// ---------------------------------------------------------
function lerPreferencia(chave) {
    try {
        return localStorage.getItem(chave);
    } catch (erro) {
        return null;
    }
}

function salvarPreferencia(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
    } catch (erro) {
        // Sem armazenamento: o recurso funciona, mas não fica salvo
    }
}

// Mensagem lida por leitores de tela (região aria-live criada pelo script)
const avisoAcessivel = document.createElement("p");
avisoAcessivel.className = "sr-only";
avisoAcessivel.setAttribute("role", "status");
document.body.appendChild(avisoAcessivel);

function anunciar(mensagem) {
    avisoAcessivel.textContent = "";
    window.setTimeout(() => { avisoAcessivel.textContent = mensagem; }, 50);
}

// ---------------------------------------------------------
// 1. MENU NO CELULAR
// ---------------------------------------------------------
const botaoMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function fecharMenu() {
    if (menuPrincipal && botaoMenu) {
        menuPrincipal.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
    }
}

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", () => {
        const abrir = botaoMenu.getAttribute("aria-expanded") !== "true";
        botaoMenu.setAttribute("aria-expanded", String(abrir));
        menuPrincipal.classList.toggle("aberto", abrir);
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));

    // Esc fecha o menu e devolve o foco para o botão
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menuPrincipal.classList.contains("aberto")) {
            fecharMenu();
            botaoMenu.focus();
        }
    });
}

// ---------------------------------------------------------
// 2. MODOS DE COR: DALTONISMO E ALTO CONTRASTE
// ---------------------------------------------------------
function configurarModo(idBotao, classe, chave, nomeModo) {
    const botao = document.getElementById(idBotao);
    const ativoSalvo = lerPreferencia(chave) === "ativo";
    document.body.classList.toggle(classe, ativoSalvo);

    if (!botao) {
        return;
    }
    botao.setAttribute("aria-pressed", String(ativoSalvo));

    botao.addEventListener("click", () => {
        const ativo = document.body.classList.toggle(classe);
        botao.setAttribute("aria-pressed", String(ativo));
        salvarPreferencia(chave, ativo ? "ativo" : "inativo");
        anunciar(nomeModo + (ativo ? " ativado" : " desativado"));
    });
}

configurarModo("btn-daltonismo", "modo-daltonismo", "modo-daltonismo", "Modo para daltônicos");
configurarModo("btn-contraste", "alto-contraste", "alto-contraste", "Alto contraste");

// ---------------------------------------------------------
// 3. TAMANHO DO TEXTO (A− e A+, em 4 níveis)
// ---------------------------------------------------------
const NIVEIS_TEXTO = [100, 115, 130, 150];
const btnAumentar = document.getElementById("btn-aumentar");
const btnDiminuir = document.getElementById("btn-diminuir");
let nivelTexto = Number(lerPreferencia("nivel-texto")) || 0;

function aplicarTamanho(anunciarMudanca) {
    nivelTexto = Math.min(Math.max(nivelTexto, 0), NIVEIS_TEXTO.length - 1);
    document.documentElement.style.fontSize = NIVEIS_TEXTO[nivelTexto] + "%";
    if (btnAumentar) {
        btnAumentar.disabled = nivelTexto === NIVEIS_TEXTO.length - 1;
    }
    if (btnDiminuir) {
        btnDiminuir.disabled = nivelTexto === 0;
    }
    salvarPreferencia("nivel-texto", String(nivelTexto));
    if (anunciarMudanca) {
        anunciar("Tamanho do texto: " + NIVEIS_TEXTO[nivelTexto] + " por cento");
    }
}

aplicarTamanho(false);

if (btnAumentar && btnDiminuir) {
    btnAumentar.addEventListener("click", () => { nivelTexto += 1; aplicarTamanho(true); });
    btnDiminuir.addEventListener("click", () => { nivelTexto -= 1; aplicarTamanho(true); });
}

// ---------------------------------------------------------
// 4. OUVIR A PÁGINA (Web Speech API)
//    Lê o conteúdo principal trecho por trecho, destacando
//    e rolando até o trecho lido. Permite pausar e parar.
// ---------------------------------------------------------
const btnLeitor = document.getElementById("btn-leitor");
const btnParar = document.getElementById("btn-parar");

if (btnLeitor) {
    const rotuloLeitor = btnLeitor.querySelector(".rotulo");
    const iconeLeitor = btnLeitor.querySelector("[aria-hidden]");

    if (!("speechSynthesis" in window)) {
        // Navegador sem suporte: o botão explica em vez de falhar em silêncio
        btnLeitor.addEventListener("click", () => {
            anunciar("Seu navegador não tem leitura em voz. Use o Chrome, o Edge ou o leitor de tela do sistema.");
        });
    } else {
        const fala = window.speechSynthesis;
        let trechos = [];
        let posicao = 0;
        let estado = "parado"; // parado | lendo | pausado
        let vozPortugues = null;

        function escolherVoz() {
            const vozes = fala.getVoices();
            vozPortugues = vozes.find((v) => v.lang === "pt-BR")
                || vozes.find((v) => v.lang.toLowerCase().startsWith("pt"))
                || null;
        }
        escolherVoz();
        fala.addEventListener("voiceschanged", escolherVoz);

        function visivel(el) {
            return el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden";
        }

        // Divide textos longos em frases: o Chrome interrompe falas muito longas
        function dividir(texto) {
            const partes = texto.match(/[^.!?;:]+[.!?;:]*/g) || [texto];
            const saida = [];
            let atual = "";
            partes.forEach((p) => {
                if ((atual + p).length > 180 && atual) {
                    saida.push(atual.trim());
                    atual = "";
                }
                atual += p;
            });
            if (atual.trim()) {
                saida.push(atual.trim());
            }
            return saida;
        }

        function montarTrechos() {
            const principal = document.querySelector("main") || document.body;
            const seletor = "h1, h2, h3, p, li, caption, figcaption, summary, tr, label, .valor";
            const lista = [];
            principal.querySelectorAll(seletor).forEach((el) => {
                // Evita ler duas vezes um texto que está dentro de outro trecho já lido
                if (el.parentElement.closest("li, tr, p, figcaption, caption, summary, label")) {
                    return;
                }
                if (!visivel(el) || el.closest("[aria-hidden='true'], .sr-only")) {
                    return;
                }
                let texto;
                if (el.tagName === "TR") {
                    texto = Array.from(el.cells).map((c) => c.innerText.trim()).filter(Boolean).join(". ");
                } else {
                    texto = el.innerText.trim();
                }
                if (texto) {
                    dividir(texto).forEach((parte) => lista.push({ el, texto: parte }));
                }
            });
            return lista;
        }

        function limparDestaque() {
            document.querySelectorAll(".lendo").forEach((el) => el.classList.remove("lendo"));
        }

        function atualizarBotoes() {
            const textos = { parado: "Ouvir página", lendo: "Pausar leitura", pausado: "Continuar leitura" };
            const icones = { parado: "🔊", lendo: "⏸", pausado: "▶" };
            rotuloLeitor.textContent = textos[estado];
            iconeLeitor.textContent = icones[estado];
            btnLeitor.setAttribute("aria-pressed", String(estado !== "parado"));
            if (btnParar) {
                btnParar.hidden = estado === "parado";
            }
        }

        function falarProximo() {
            if (estado !== "lendo") {
                return;
            }
            limparDestaque();
            if (posicao >= trechos.length) {
                parar();
                anunciar("Leitura concluída");
                return;
            }
            const { el, texto } = trechos[posicao];
            el.classList.add("lendo");
            el.scrollIntoView({ block: "center", behavior: "smooth" });

            const frase = new SpeechSynthesisUtterance(texto);
            frase.lang = "pt-BR";
            if (vozPortugues) {
                frase.voice = vozPortugues;
            }
            frase.rate = 1;
            frase.onend = () => {
                if (estado === "lendo") {
                    posicao += 1;
                    falarProximo();
                }
            };
            frase.onerror = (e) => {
                if (e.error !== "interrupted" && e.error !== "canceled" && estado === "lendo") {
                    posicao += 1;
                    falarProximo();
                }
            };
            fala.speak(frase);
        }

        function iniciar() {
            fala.cancel();
            trechos = montarTrechos();
            posicao = 0;
            estado = "lendo";
            atualizarBotoes();
            falarProximo();
        }

        function pausar() {
            // Cancelar e recomeçar do trecho atual é mais confiável que pause()/resume()
            estado = "pausado";
            fala.cancel();
            atualizarBotoes();
        }

        function continuar() {
            estado = "lendo";
            atualizarBotoes();
            falarProximo();
        }

        function parar() {
            estado = "parado";
            fala.cancel();
            limparDestaque();
            atualizarBotoes();
        }

        btnLeitor.addEventListener("click", () => {
            if (estado === "parado") {
                iniciar();
            } else if (estado === "lendo") {
                pausar();
            } else {
                continuar();
            }
        });

        if (btnParar) {
            btnParar.addEventListener("click", () => {
                parar();
                btnLeitor.focus();
            });
        }

        // Para a leitura ao sair da página
        window.addEventListener("pagehide", () => fala.cancel());

        // Expõe para testes no console do navegador
        window.leitorEcoLogica = { montarTrechos, estado: () => estado };
    }
}

// ---------------------------------------------------------
// 5. ANO ATUAL NO RODAPÉ
// ---------------------------------------------------------
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------
// 6. FORMULÁRIO DE CONTATO (validação extra)
// ---------------------------------------------------------
const formulario = document.getElementById("form-contato");
const statusFormulario = document.getElementById("status-formulario");

if (formulario && statusFormulario) {
    const campoData = document.getElementById("data");
    const campoTelefone = document.getElementById("telefone");

    // Data mínima = hoje (não deixa agendar no passado)
    if (campoData) {
        const hoje = new Date();
        hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
        campoData.min = hoje.toISOString().slice(0, 10);
    }

    // Remove tudo que não for número enquanto a pessoa digita o telefone
    if (campoTelefone) {
        campoTelefone.addEventListener("input", () => {
            campoTelefone.value = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
        });
    }

    // Mensagens de erro em português e mais claras
    const mensagens = {
        nome: "Digite seu nome completo usando apenas letras (mínimo de 3).",
        email: "Digite um e-mail válido, por exemplo: nome@empresa.com.br.",
        telefone: "Digite o telefone com DDD, apenas números (10 ou 11 dígitos).",
        data: "Escolha uma data a partir de hoje.",
        funcionarios: "Informe um número de funcionários a partir de 1.",
        servico: "Selecione o serviço de interesse.",
        lgpd: "É preciso autorizar o uso dos dados para enviarmos a resposta."
    };

    formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.addEventListener("invalid", () => {
            if (mensagens[campo.name]) {
                campo.setCustomValidity(mensagens[campo.name]);
            }
            campo.setAttribute("aria-invalid", "true");

            // Mostra também o aviso geral abaixo do botão de envio
            statusFormulario.className = "status-formulario erro";
            statusFormulario.textContent = "Há campos com erro. Corrija os campos destacados e envie novamente.";
        });

        const limpar = () => {
            campo.setCustomValidity("");
            campo.removeAttribute("aria-invalid");
        };
        campo.addEventListener("input", limpar);
        campo.addEventListener("change", limpar);
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        statusFormulario.className = "status-formulario";

        if (!formulario.checkValidity()) {
            statusFormulario.textContent = "Há campos com erro. Corrija os campos destacados e envie novamente.";
            statusFormulario.classList.add("erro");
            formulario.reportValidity();
            return;
        }

        const nome = document.getElementById("nome").value.trim().split(" ")[0];
        statusFormulario.textContent =
            "Obrigado, " + nome + "! Sua solicitação foi validada e registrada. " +
            "Entraremos em contato em até 2 dias úteis. (Site acadêmico: os dados não são enviados a um servidor.)";
        statusFormulario.classList.add("sucesso");
        formulario.reset();
    });
}
