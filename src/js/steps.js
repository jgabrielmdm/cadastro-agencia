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
document.getElementById('btnNext').addEventListener('click', handleNextStep);
document.getElementById('btnPrev').addEventListener('click', voltarStep);

// Esconde o botão de voltar inicialmente
atualizarBotaoVoltar();

function handleNextStep() {

    // 🚩 Step Agência
    if (currentStep === 1) {

        // Sempre valida a aba
        if (!validateCurrentTab()) return;

        // 🚩 Se estiver na ÚLTIMA ABA (Informações Bancárias)
        if (currentTab === tabs.length - 1) {

            const docInput = document.querySelector('input[name="cadastro-cpf-cnpj-favorecido"]');

            clearError(docInput);

            if (!validarDocumentoCpfCnpj(docInput.value)) {
                showError(docInput, "CPF/CNPJ inválido ou incompleto.");
                return;
            }
        }
    }

    if (currentStep === 2) {

        let isValid = true;

        const senhaInput = document.querySelector('input[name="cadastro-usuario-senha"]');
        const confirmInput = document.querySelector('.confirm-password');

        // -------------------------
        // 1) VALIDAR FORM DE CREDENCIAIS
        // -------------------------
        const credentialFields = document.querySelectorAll('#form-credenciais-de-acesso input');

        credentialFields.forEach(input => {

            clearError(input);

            if (input.required && !input.value.trim()) {
                showError(input, "Este campo é obrigatório.");
                isValid = false;
            }

            if (input.classList.contains("username-validation")) {
                const usernameRegex = /^[a-z0-9._]+$/;

                if (!usernameRegex.test(input.value)) {
                    showError(input, "Use apenas letras minúsculas, números, . ou _");
                    isValid = false;
                }

                if (input.value.length < 4) {
                    showError(input, "O login deve ter no mínimo 4 caracteres.");
                    isValid = false;
                }
            }

            if (input.classList.contains("password-validation")) {
                const rules = validatePasswordRules(input.value);

                if (!Object.values(rules).every(Boolean)) {
                    showError(input, "A senha não atende todos os requisitos.");
                    isValid = false;
                }
            }
        });

        // Confirm password
        if (senhaInput && confirmInput && senhaInput.value !== confirmInput.value) {
            showError(confirmInput, "As senhas não coincidem.");
            isValid = false;
        }


        // -------------------------
        // 2) VALIDAR FORM DE USUÁRIO PRINCIPAL
        // -------------------------
        const userFormFields = document.querySelectorAll('#form-cadastro-usuario-principal input, #form-cadastro-usuario-principal select');

        userFormFields.forEach(input => {

            clearError(input);

            // Required
            if (input.required && !input.value.trim()) {
                showError(input, "Este campo é obrigatório.");
                isValid = false;
            }

            // Telefone (se quiser manter validação extra)
            if (input.classList.contains("telefone-mask")) {
                const raw = input.value.replace(/\D/g, "");
                if (raw.length < 10 || raw.length > 11) {
                    showError(input, "Telefone inválido. Informe DDD e número completo.");
                    isValid = false;
                }
            }

            // CPF (se quiser validar como o outro)
            if (input.name === "cadastro-usuario-cpf") {

                const raw = input.value.replace(/\D/g, "");

                // Regras base: tamanho mínimo + não pode ser repetido
                if (raw.length !== 11 || /^(\d)\1+$/.test(raw)) {
                    showError(input, "CPF inválido.");
                    isValid = false;
                }

                // (Se quiser depois validar o DV real do CPF, me avise)
            }
        });


        // ❌ Se algo inválido → NÃO AVANÇA
        if (!isValid) return;
    }

    avancarStep();
  
}

function validarDocumentoCpfCnpj(valor) {
    const raw = valor.replace(/\D/g, "");

    // Menor que CPF (11 dígitos) -> inválido
    if (raw.length < 11) return false;

    // Todos dígitos iguais -> inválido
    if (/^(\d)\1+$/.test(raw)) return false;

    // CPF = 11 dígitos → válido por formato
    if (raw.length === 11) return true;

    // CNPJ = 14 dígitos → válido
    if (raw.length === 14) return true;

    // Qualquer outra quantidade -> inválido
    return false;
}

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