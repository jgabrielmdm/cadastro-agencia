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