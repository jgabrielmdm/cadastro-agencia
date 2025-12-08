$(document).on("input", ".username-validation", function () {   
    this.value = this.value.replace(/[^a-z0-9._]/g, "");
});

$(document).on("paste", ".username-validation", function (e) {
    e.preventDefault();

    let text = (e.originalEvent || e).clipboardData.getData('text');

    text = text.replace(/[^a-z0-9._]/g, "");

    this.value = text;
});


// REGRAS DE SEGURANÇA PASSWORD

function validatePasswordRules(password) {
    return {
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        case: /[a-z]/.test(password) && /[A-Z]/.test(password),
        special: /[!@#$%()&*+=?{}[\]-]/.test(password)
    };
}

$(document).on("input", 'input[name="cadastro-usuario-senha"]', function () {
    const value = this.value;
    const rules = validatePasswordRules(value);

    updateRuleIndicator('.rule-length', rules.length);
    updateRuleIndicator('.rule-number', rules.number);
    updateRuleIndicator('.rule-case', rules.case);
    updateRuleIndicator('.rule-special', rules.special);
});

function updateRuleIndicator(selector, isValid) {
    const el = document.querySelector(selector);
    el.textContent = isValid ? "✓" : "✗";
    el.style.color = isValid ? "#00BC7D" : "red";
    el.style.fontWeight = "bold";
}

function inicializarRegrasSenha() {
    updateRuleIndicator('.rule-length', false);
    updateRuleIndicator('.rule-number', false);
    updateRuleIndicator('.rule-case', false);
    updateRuleIndicator('.rule-special', false);
}

inicializarRegrasSenha();

$(document).on("blur", 'input[name="cadastro-usuario-senha"]', function () {
    const rules = validatePasswordRules(this.value);

    if (!Object.values(rules).every(Boolean)) {
        showError(this, "A senha não atende aos requisitos de segurança.");
    } else {
        clearError(this);
    }
});

// CONFIRMAÇÃO DE PASSWORD

const senhaInput = document.querySelector('input[name="cadastro-usuario-senha"]');
const confirmInput = document.querySelector('.confirm-password');

$(document).on("input", ".confirm-password", function () {
    if (this.value === senhaInput.value) {
        clearError(this);
    }
});

$(document).on("blur", ".confirm-password", function () {
    if (this.value && this.value !== senhaInput.value) {
        showError(this, "As senhas não coincidem.");
    } else {
        clearError(this);
    }
});