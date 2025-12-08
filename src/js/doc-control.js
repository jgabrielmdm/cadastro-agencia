const MAX_SIZE_MB = 10;
const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

document.querySelectorAll(".file-input").forEach(input => {
    input.addEventListener("change", function () {
        const file = input.files[0];
        const card = input.closest(".doc-card");
        const icon = card.querySelector(".status-icon");
        const msg = card.querySelector(".status-msg");
        const statusBox = card.querySelector(".upload-status");

        statusBox.style.display = "flex";
        icon.textContent = "";
        msg.textContent = "";

        if (!file) {
            statusBox.style.display = "none";
            return;
        }

        // valida extensão
        if (!allowedTypes.includes(file.type)) {
            icon.textContent = "❌";
            icon.style.color = "#FB2C36";
            msg.textContent = "Formato inválido (JPG, PNG ou PDF)";
            input.value = "";
            return;
        }

        // valida tamanho
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

function validateRequiredDocsStep4() {
    let isValid = true;

    // pega todos os inputs de arquivo no step
    const fileInputs = document.querySelectorAll('#content-step-4 .file-input');

    fileInputs.forEach(input => {
        
        // só valida os que têm required
        if (!input.hasAttribute("required")) return;

        const card = input.closest(".doc-card");
        const statusBox = card.querySelector(".upload-status");
        const icon = card.querySelector(".status-icon");
        const msg = card.querySelector(".status-msg");

        // limpa estado anterior
        statusBox.style.display = "none";
        icon.textContent = "";
        msg.textContent = "";

        const file = input.files[0];

        // Se obrigatório e não anexado → mostrar erro
        if (!file) {
            statusBox.style.display = "flex";
            icon.textContent = "❌";
            icon.style.color = "#FB2C36";
            msg.textContent = "Este documento é obrigatório.";
            isValid = false;
        }
    });

    return isValid;
}