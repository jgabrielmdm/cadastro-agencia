// MONTANDO JSON
function montarPayloadCadastro() {
    const payload = {};

    document.querySelectorAll("input[name], select[name], textarea[name]").forEach(input => {

        if (input.type === "file") return;
        if (input.closest(".formulario-inter")) return;
        
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


// DEV TEST - FORÇAR STEP e cancelar required
// currentStep = 0;
// atualizarConteudo();
// updateProgress();
// atualizarBotaoVoltar();
// document.querySelectorAll("[required]").forEach(el => el.removeAttribute("required"));
// btnNext.removeAttribute("disabled");