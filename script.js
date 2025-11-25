// <!-- gerenciamento dos steps -->

const steps = document.querySelectorAll('.icons-step-content');
const progressFill = document.querySelector('.progress-line-fill');

let currentStep = 0;

function updateProgress() {
    let p = (currentStep / (steps.length - 1)) * 100;
    progressFill.style.width = p + "%";
}
// MOSTRAR / ESCONDER BOTÃO VOLTAR
function atualizarBotaoVoltar() {
    const btnPrev = document.getElementById('btnPrev');

    if (currentStep === 0) {
        btnPrev.classList.add("hidden");
    } else {
        btnPrev.classList.remove("hidden");
    }
}
// ------------------------------------------------------
// FUNÇÃO PARA AVANÇAR STEP
// ------------------------------------------------------
function avancarStep() {

    const lastStepIndex = steps.length - 1;

    // Se não é o último step → só avança
    if (currentStep < lastStepIndex) {
        steps[currentStep].classList.remove('icon-selected');
        steps[currentStep].classList.add('icon-completed');

        currentStep++;
        steps[currentStep].classList.add('icon-selected');

        updateProgress();
        atualizarConteudo();
        atualizarBotaoVoltar();
        return;
    }

    // 👉 SE ESTIVER NO ÚLTIMO STEP → FINALIZA CADASTRO
    finalizarCadastro();
}
// ------------------------------------------------------
// FUNÇÃO PARA VOLTAR STEP
// ------------------------------------------------------
function voltarStep() {
    if (currentStep > 0) {

        steps[currentStep].classList.remove('icon-selected');
        steps[currentStep].classList.remove('icon-completed');

        currentStep--;

        steps[currentStep].classList.remove('icon-completed');
        steps[currentStep].classList.add('icon-selected');

        updateProgress();
        atualizarConteudo();
        atualizarBotaoVoltar();
    }
}
// ------------------------------------------------------
// BOTÕES CHAMANDO AS FUNÇÕES
// ------------------------------------------------------
document.getElementById('btnNext').addEventListener('click', avancarStep);
document.getElementById('btnPrev').addEventListener('click', voltarStep);

// Esconde o botão de voltar inicialmente
atualizarBotaoVoltar();


// conteudo dos steps
function atualizarConteudo() {
    const contents = document.querySelectorAll('.step-content');

    contents.forEach((box, index) => {
        if (index === currentStep) {
            box.classList.add('active');
        } else {
            box.classList.remove('active');
        }
    });

    // Step 2 = esconder Next e mostrar botão "Próxima aba"
    if (currentStep === 1) {
        btnNext.style.display = "none";
        btnNextStepAgencia.style.display = "inline-block";
    }

    // Step 1, 3 e 4 = botão Next padrão
    else {
        btnNextStepAgencia.style.display = "none";
        btnNext.style.display = "inline-block";
    }

    // Quando chegar no Step 2: resetar abas
    if (currentStep === 1) {
        changeTab(0);
    }

    if (currentStep === steps.length - 1) {
    btnNext.textContent = "Finalizar Cadastro";
    } else {
        btnNext.textContent = "Continuar";
    }
}

// Controle dos formulários nacionais e inter

const btnNext = document.getElementById('btnNext');
const btnBrasil = document.getElementById('btnBrasil');
const btnInternacional = document.getElementById('btnInternacional');
const formBrasilControl = document.querySelector('.formulario-brasil');
const formInterControl = document.querySelector('.formulario-inter');
const formBrasil = document.getElementById('formBrasil');
const formInternacional = document.getElementById('formInternacional');

btnBrasil.addEventListener('click', () => {
 btnBrasil.classList.add('active');
 btnInternacional.classList.remove('active');

 formBrasil.style.display = "flex";
 formBrasilControl.style.display = "block";
 formInternacional.style.display = "none";
 formInterControl.style.display = "none";
 
 btnNext.style.display = "inline-block";
});

btnInternacional.addEventListener('click', () => {
 btnInternacional.classList.add('active');
 btnBrasil.classList.remove('active');

 formBrasil.style.display = "none";
 formBrasilControl.style.display = "none";
 formInternacional.style.display = "flex";
 formInterControl.style.display = "block";
 btnNext.style.display = "none";
});

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

  // 👉 última aba: esconde nextTab e mostra btnNext (step)
  if (currentTab === tabs.length - 1) {
    btnNextStepAgencia.style.display = "none";
    btnNext.style.display = "inline-block";
  } else {
    btnNext.style.display = "none";
    btnNextStepAgencia.style.display = "inline-block";
  }

  // 👉 se estiver na primeira aba → ESconde botão anterior
  if (currentTab === 0) {
    btnPrevTab.style.display = "none";
  } else {
    btnPrevTab.style.display = "inline-block";
  }
}

btnPrevTab.addEventListener("click", () => {
  if(currentTab > 0) {
    changeTab(currentTab - 1);
  }
});

// Clique na aba
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    changeTab(Number(tab.dataset.tab));
  });
});

// Botão próxima aba
btnNextStepAgencia.addEventListener("click", () => {
  if(currentTab < tabs.length - 1) {
    changeTab(currentTab + 1);
  }
});


// CONTATO FINANCEIRO

const financeContacts = [];

const financeList = document.getElementById("financeContactsList");
const btnAddFinance = document.getElementById("addFinanceContact");

// Renderiza os campos no DOM
function renderFinanceContacts() {
    financeList.innerHTML = "";

    financeContacts.forEach((contact, index) => {

        const row = document.createElement("div");
        row.classList.add("form-row-fin");

        row.innerHTML = `
            <div class="form-group">
                <label>Nome <span class="required-label-red">*</span></label>
                <input class="input-form-small" type="text"
                    placeholder="Nome Completo"
                    value="${contact.nome ?? ''}"
                    oninput="updateFinanceValue(${index}, 'nome', this.value)">
            </div>

            <div class="form-group">
                <label>E-mail <span class="required-label-red">*</span></label>
                <input class="input-form-small" type="text"
                    placeholder="email@exemplo.com"
                    value="${contact.email ?? ''}"
                    oninput="updateFinanceValue(${index}, 'email', this.value)">
            </div>

            <div class="form-group fin-group-pos">
                <label>Telefone <span class="required-label-red">*</span></label>
                <input class="input-form-small" type="text"
                    placeholder="(00) 00000-0000"
                    value="${contact.telefone ?? ''}"
                    oninput="updateFinanceValue(${index}, 'telefone', this.value)">

                    ${
                index > 0 
                ? `<button class="remove-contact-btn pos-remove-btn" onclick="removeFinanceContact(${index})">x</button>`
                : ""
            }
            </div>

            
        `;

        financeList.appendChild(row);
    });
}

// Atualiza valor no array
function updateFinanceValue(index, field, value) {
    financeContacts[index][field] = value;
}

// Adiciona novo contato
btnAddFinance.addEventListener("click", () => {
    financeContacts.push({
        nome: "",
        email: "",
        telefone: ""
    });
    renderFinanceContacts();
});

// Remove contato
function removeFinanceContact(index) {
    financeContacts.splice(index, 1);
    renderFinanceContacts();
}

// Inicia com 1 grupo
financeContacts.push({ nome: "", email: "", telefone: "" });
renderFinanceContacts();



// CONTROLE DE DOCUMENTOS

const MAX_SIZE_MB = 10;
const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

document.querySelectorAll(".file-input").forEach(input => {
    input.addEventListener("change", function () {
        const file = input.files[0];
        const card = input.closest(".doc-card");
        const icon = card.querySelector(".status-icon");
        const msg = card.querySelector(".status-msg");
        const statusBox = card.querySelector(".upload-status");

        // sempre limpa a área
        statusBox.style.display = "flex";
        icon.textContent = "";
        msg.textContent = "";

        if (!file) {
            statusBox.style.display = "none";
            return;
        }

        // validar extensão
        if (!allowedTypes.includes(file.type)) {
            icon.textContent = "❌";
            icon.style.color = "#FB2C36";
            msg.textContent = "Formato inválido (JPG, PNG ou PDF)";
            input.value = "";
            return;
        }

        // validar tamanho
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            icon.textContent = "❌";
            icon.style.color = "#FB2C36";
            msg.textContent = "Arquivo maior que 10MB";
            input.value = "";
            return;
        }

        // sucesso
        icon.textContent = "✔️";
        icon.style.color = "#00BC7D";
        msg.textContent = file.name;
    });
});




// MONTANDO JSON

function montarPayloadCadastro() {
    const payload = {};

    document.querySelectorAll("input[name], select[name], textarea[name]").forEach(input => {

        if (input.type === "file") return;
        if (input.closest(".formulario-inter")) return;
        

        // 🔥 Checkbox retorna boolean
        if (input.type === "checkbox") {
            payload[input.name] = input.checked;
        } 
        else {
            payload[input.name] = input.value.trim();
        }
    });

    payload.contatos_financeiros_adicionais = financeContacts;

    return payload;
}

function finalizarCadastro() {
    const jsonPayload = montarPayloadCadastro();

    console.log(jsonPayload);    
}


// MONTANDO UPLOAD DOS ARQUIVOS

// function montarUploads(formData) {

//     document.querySelectorAll("input[type='file'][name]").forEach(input => {
//         if (input.files[0]) {
//             formData.append(input.name, input.files[0]);
//         }
//     });
// }

// function montarFormDataFinal() {
//     const formData = new FormData();
    
//     formData.append("payload", JSON.stringify(montarPayloadCadastro()));
    
//     montarUploads(formData);

//     return formData;
// }

// async function finalizarCadastro() {

//     const fd = montarFormDataFinal();

//     const response = await fetch("/api/cadastro-agencia", {
//         method: "POST",
//         body: fd
//     });

//     const result = await response.json();
//     console.log(result);
// }


















// DEV TEST - FORÇAR STEP
// currentStep = 3;
// atualizarConteudo();
// updateProgress();
// atualizarBotaoVoltar();