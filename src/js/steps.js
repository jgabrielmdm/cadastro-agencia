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

    // Se não é o último step, só avança
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

    // SE ESTIVER NO ÚLTIMO STEP → FINALIZA CADASTRO
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
        tabs.forEach(t => t.classList.remove("completed"));
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