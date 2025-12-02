// ------------ FORM NACIONAL ----------------


// const inputCNPJ = document.querySelector('[name="cadastro-agencias-cnpj"]');
// const inputCEP  = document.querySelector('[name="cadastro-agencias-cep"]');

// const estadoInput      = document.querySelector('[name="cadastro-agencia-estado"]');
// const cidadeInput      = document.querySelector('[name="cadastro-agencia-cidade"]');
// const enderecoInput    = document.querySelector('[name="cadastro-agencia-endereco"]');
// const numeroInput      = document.querySelector('[name="cadastro-agencia-numero"]');
// const bairroInput      = document.querySelector('[name="cadastro-agencia-bairro"]');
// const complementoInput = document.querySelector('[name="cadastro-agencia-complemento"]');

// const setBtn = (enabled) => {
//     btnNext.disabled = !enabled;
//     btnNext.style.opacity = enabled ? "1" : "0.5";
//     btnNext.style.cursor = enabled ? "pointer" : "not-allowed";
// };

setBtn(false);

// MSGS

function showMessage(input, msg, isError = true) {
    clearMessage(input);
    const p = document.createElement("p");
    p.className = isError ? "error-msg" : "success-msg";
    p.style.fontSize = "13px";
    p.style.marginTop = "6px";
    p.style.color = isError ? "#C62828" : "#1D5E2F";
    p.textContent = (isError ? "" : "✓ ") + msg;
    input.insertAdjacentElement("afterend", p);
}

function clearMessage(input) {
    const next = input.nextElementSibling;
    if (next && (next.classList.contains("error-msg") || next.classList.contains("success-msg"))) {
        next.remove();
    }
}

// VALIDA BOTÃO DE CONTINUAR
function validarCamposObrigatorios() {
    const ok = inputCNPJ.dataset.valid === "true" && inputCEP.dataset.valid === "true";
    setBtn(ok);
}

// =====================================================
//  CNPJ
// =====================================================
async function validarCNPJ() {
    const cnpj = inputCNPJ.value.replace(/\D/g, "");

    if (cnpj.length !== 14) {
        showMessage(inputCNPJ, "CNPJ inválido — insira os 14 números.");
        inputCNPJ.dataset.valid = "false";
        validarCamposObrigatorios();
        return;
    }

    try {
        const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        const data = await res.json();

        if (data?.error || data?.message) {
            showMessage(inputCNPJ, "CNPJ não encontrado na Receita Federal.");
            inputCNPJ.dataset.valid = "false";
        } else {
            showMessage(inputCNPJ, "CNPJ validado com sucesso!", false);
            inputCNPJ.dataset.valid = "true";
        }
    } catch {
        showMessage(inputCNPJ, "Erro ao validar CNPJ. Tente novamente.");
        inputCNPJ.dataset.valid = "false";
    }

    validarCamposObrigatorios();
}

inputCNPJ.addEventListener("blur", validarCNPJ);

// =====================================================
//  CEP
// =====================================================
inputCEP.addEventListener("input", () => {
    inputCEP.value = inputCEP.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 9);
});

async function buscarCEP() {
    const cep = inputCEP.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        showMessage(inputCEP, "CEP inválido — insira 8 dígitos.");
        inputCEP.dataset.valid = "false";
        validarCamposObrigatorios();
        return;
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (data.erro) {
            showMessage(inputCEP, "CEP não encontrado.");
            inputCEP.dataset.valid = "false";
        } else {
            estadoInput.value      = data.uf;
            cidadeInput.value      = data.localidade;
            enderecoInput.value    = data.logradouro;
            bairroInput.value      = data.bairro;
            complementoInput.value = data.complemento;

            numeroInput.focus();
            showMessage(inputCEP, "CEP validado com sucesso!", false);
            inputCEP.dataset.valid = "true";
        }
    } catch {
        showMessage(inputCEP, "Erro na consulta ao CEP.");
        inputCEP.dataset.valid = "false";
    }

    validarCamposObrigatorios();
}

inputCEP.addEventListener("blur", buscarCEP);