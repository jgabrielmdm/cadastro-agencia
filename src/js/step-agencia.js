// STEP AGENCIA
const tabs = document.querySelectorAll(".tab-item");
const panels = document.querySelectorAll(".tab-panel");
const btnNextStepAgencia = document.getElementById("nextTab");
const btnPrevTab = document.getElementById("prevTab");

let currentTab = 0;

// Função: trocar de aba
function changeTab(index) {
  currentTab = index;

  tabs.forEach(t => t.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));

  tabs[currentTab].classList.add("active");
  panels[currentTab].classList.add("active");

  // última aba: esconde nextTab e mostra btnNext (step)
  if (currentTab === tabs.length - 1) {
    btnNextStepAgencia.style.display = "none";
    btnNext.style.display = "inline-block";
  } else {
    btnNext.style.display = "none";
    btnNextStepAgencia.style.display = "inline-block";
  }

  // se estiver na primeira aba → ESconde botão anterior
  if (currentTab === 0) {
    btnPrevTab.style.display = "none";
  } else {
    btnPrevTab.style.display = "inline-block";
  }
}

btnPrevTab.addEventListener("click", () => {
  if(currentTab > 0) {
      clearAllErrors();
      tabs[currentTab - 1].classList.remove("completed");
      changeTab(currentTab - 1);
  }
});

// Botão próxima aba - controle de abas
btnNextStepAgencia.addEventListener("click", () => {

    // Se não validar → bloqueia avanço
    if (!validateCurrentTab()) return;

    // Visual: marcar aba como concluída
    tabs[currentTab].classList.add("completed");

    // Avança
    changeTab(currentTab + 1);
});

function markTabAsCompleted(index) {
  tabs[index].classList.add("completed");
}

function unmarkTabCompleted(index) {
  tabs[index].classList.remove("completed");
}

// ----- VALIDAÇÃO PARA AVANÇO DE ABA ------

function validateCurrentTab() {
    const panel = panels[currentTab];
    const requiredInputs = panel.querySelectorAll("[required]");
    let isValid = true;

    requiredInputs.forEach(input => {

        clearError(input);

        // Campo obrigatório vazio
        if (!input.value.trim()) {
            showError(input, "Este campo é obrigatório.");
            isValid = false;
            return;
        }

        // Validação telefone
        if (input.classList.contains("telefone-validation")) {
            const raw = input.value.replace(/\D/g, "");

            if (raw.length < 10 || raw.length > 11) {
                showError(input, "Número de telefone inválido.");
                isValid = false;
                return;
            }
        }

        // EMAIL 🧨
        if (input.classList.contains("email-validation")) {
            if (!validarEmail(input.value)) {
                showError(input, "E-mail inválido. Use o formato nome@dominio.com");
                isValid = false;
                return;
            }
        }
    });

    return isValid;
}

function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor.trim());
}

const forbiddenEmailChars = /[\s,;'"]/g;

// Listener apenas uma vez
$(document).on("input", ".email-validation", function(){
    this.value = this.value.replace(forbiddenEmailChars, "");
});

function clearError(input) {
    input.classList.remove("input-error");
    const msg = input.parentNode.querySelector(".error-message");
    if (msg) msg.remove();
}

function showError(input, text) {
    clearError(input);
    input.classList.add("input-error");
    const msg = document.createElement("div");
    msg.className = "error-message";
    msg.textContent = text;
    input.parentNode.appendChild(msg);
}

function clearAllErrors() {
    panels[currentTab].querySelectorAll(".error-message").forEach(e => e.remove());
    panels[currentTab].querySelectorAll(".input-error").forEach(i => i.classList.remove("input-error"));
}

$(document).on("blur", ".telefone-validation", function () {
    const raw = $(this).val().replace(/\D/g, "");

    if (raw.length < 10 || raw.length > 11) {
        showError(this, "Telefone inválido. Informe número com DDD e 8 ou 9 dígitos.");
    } else {
        clearError(this);
    }
});