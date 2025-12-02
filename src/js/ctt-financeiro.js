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
