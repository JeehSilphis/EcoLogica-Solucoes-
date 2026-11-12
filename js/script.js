// ==========================================
// 1. MENU DE NAVEGAÇÃO ACESSÍVEL (CELULAR)
// ==========================================
const botaoMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function fecharMenu() {
    if (menuPrincipal) {
        menuPrincipal.classList.remove("aberto");
    }
    if (botaoMenu) {
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
    }
}

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", () => {
        const estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";

        botaoMenu.setAttribute("aria-expanded", String(!estaAberto));
        botaoMenu.setAttribute(
            "aria-label",
            estaAberto ? "Abrir menu de navegação" : "Fechar menu de navegação"
        );

        menuPrincipal.classList.toggle("aberto", !estaAberto);
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    // Tecla Esc fecha o menu e devolve o foco para o botão
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menuPrincipal.classList.contains("aberto")) {
            fecharMenu();
            botaoMenu.focus();
        }
    });
}

// ==========================================
// Funções auxiliares para salvar preferências
// (o navegador pode bloquear o localStorage)
// ==========================================
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

// ==========================================
// 2. MODO DALTONISMO
// ==========================================
const btnDaltonismo = document.getElementById("btn-daltonismo");

if (lerPreferencia("modo-daltonismo") === "ativo") {
    document.body.classList.add("modo-daltonismo");
}

if (btnDaltonismo) {
    btnDaltonismo.setAttribute(
        "aria-pressed",
        String(document.body.classList.contains("modo-daltonismo"))
    );

    btnDaltonismo.addEventListener("click", () => {
        const ativo = document.body.classList.toggle("modo-daltonismo");
        btnDaltonismo.setAttribute("aria-pressed", String(ativo));
        salvarPreferencia("modo-daltonismo", ativo ? "ativo" : "inativo");
    });
}

// ==========================================
// 3. ANO ATUAL NO RODAPÉ
// ==========================================
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// ==========================================
// 4. AUMENTAR TEXTO (BAIXA VISÃO)
// ==========================================
const btnZoom = document.getElementById("btn-zoom");
const TEXTO_ZOOM_LIGADO = "- Clique aqui para reduzir o tamanho do texto";
const TEXTO_ZOOM_DESLIGADO = "+ Clique aqui para aumentar o tamanho do texto";

function aplicarZoom(ativo) {
    document.documentElement.classList.toggle("zoom-ativo", ativo);
    if (btnZoom) {
        btnZoom.textContent = ativo ? TEXTO_ZOOM_LIGADO : TEXTO_ZOOM_DESLIGADO;
        btnZoom.setAttribute("aria-pressed", String(ativo));
    }
}

aplicarZoom(lerPreferencia("zoom") === "ativo");

if (btnZoom) {
    btnZoom.addEventListener("click", () => {
        const ativo = !document.documentElement.classList.contains("zoom-ativo");
        aplicarZoom(ativo);
        salvarPreferencia("zoom", ativo ? "ativo" : "inativo");
    });
}

// ==========================================
// 5. LEITURA DA PÁGINA EM VOZ ALTA (Web Speech API)
// ==========================================
const btnLeitor = document.getElementById("btn-leitor");
const TEXTO_LEITOR = "🔊 Clique aqui para ouvir a página";

if (btnLeitor) {
    if (!("speechSynthesis" in window)) {
        // Navegador sem suporte: esconde o botão para não confundir
        btnLeitor.hidden = true;
    } else {
        let estaLendo = false;

        const pararLeitura = () => {
            window.speechSynthesis.cancel();
            estaLendo = false;
            btnLeitor.textContent = TEXTO_LEITOR;
            btnLeitor.setAttribute("aria-pressed", "false");
        };

        btnLeitor.addEventListener("click", () => {
            if (estaLendo) {
                pararLeitura();
                return;
            }

            const conteudo = document.querySelector("main") || document.body;
            const fala = new SpeechSynthesisUtterance(conteudo.innerText);
            fala.lang = "pt-BR";
            fala.rate = 1.1;
            fala.onend = pararLeitura;

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(fala);
            estaLendo = true;
            btnLeitor.textContent = "🔇 Parar leitura";
            btnLeitor.setAttribute("aria-pressed", "true");
        });

        // Para a leitura ao sair da página
        window.addEventListener("pagehide", () => window.speechSynthesis.cancel());
    }
}

// ==========================================
// 6. FORMULÁRIO DE CONTATO (validação extra)
// ==========================================
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
