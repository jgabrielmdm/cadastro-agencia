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
    if (currentStep < steps.length - 1) {

        steps[currentStep].classList.remove('icon-selected');
        steps[currentStep].classList.add('icon-completed');

        currentStep++;

        steps[currentStep].classList.remove('icon-completed');
        steps[currentStep].classList.add('icon-selected');

        updateProgress();
        atualizarConteudo();
        atualizarBotaoVoltar();
    }
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

    // 👉 Step 2 = esconder Next e mostrar botão "Próxima aba"
    if (currentStep === 1) {
        btnNext.style.display = "none";
        btnNextStepAgencia.style.display = "inline-block";
    }

    // 👉 Step 1, 3 e 4 = botão Next padrão
    else {
        btnNextStepAgencia.style.display = "none";
        btnNext.style.display = "inline-block";
    }

    // 👇 Quando chegar no Step 2: resetar abas
    if (currentStep === 1) {
        changeTab(0);
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