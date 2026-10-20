"use strict";

// Menu de navegação acessível
const botaoMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function fecharMenu() {
    menuPrincipal.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
}

botaoMenu.addEventListener("click", () => {
    const estaAberto =
        botaoMenu.getAttribute("aria-expanded") === "true";

    botaoMenu.setAttribute("aria-expanded", String(!estaAberto));
    botaoMenu.setAttribute(
        "aria-label",
        estaAberto ? "Abrir menu de navegação" : "Fechar menu de navegação"
    );

    menuPrincipal.classList.toggle("aberto", !estaAberto);
});

// Fecha o menu depois que um link é selecionado
menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
});

// Atualiza automaticamente o ano do rodapé
document.getElementById("ano-atual").textContent =
    new Date().getFullYear();

// Formulário de contato
const formulario = document.getElementById("form-contato");
const statusFormulario = document.getElementById("status-formulario");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    statusFormulario.textContent =
        "Formulário validado. Para enviar sua mensagem, é necessário " +
        "conectar este formulário a um serviço de envio.";

    // Ainda não existe integração com servidor.
    // Os dados não são enviados nem armazenados.
});