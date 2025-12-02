// ------------ FORM INTERNACIONAL ----------------
// ---VALIDAÇÕES----

const formInter = document.getElementById("formInternacional");
const btnInterSubmit = formInter.querySelector(".submit-internacional");
const interFields = formInter.querySelectorAll("input[name]");
const emailInput = formInter.querySelector('[name="inter-email"]');

disableBtn();

function disableBtn(){
    btnInterSubmit.disabled = true;
    btnInterSubmit.style.opacity = "0.5";
    btnInterSubmit.style.cursor = "not-allowed";
}

function enableBtn(){
    btnInterSubmit.disabled = false;
    btnInterSubmit.style.opacity = "1";
    btnInterSubmit.style.cursor = "pointer";
}

function showEmailError(msg){
    clearEmailError();

    const msgErroEmailInter = document.createElement("msgErroEmailInter");
    msgErroEmailInter.classList.add("email-error");
    msgErroEmailInter.style.color = "#C62828";
    msgErroEmailInter.style.fontSize = "13px";
    msgErroEmailInter.style.marginTop = "6px";
    msgErroEmailInter.style.textAlign = "left";
    msgErroEmailInter.textContent = msg;
    emailInput.insertAdjacentElement("afterend", msgErroEmailInter);
}

function clearEmailError(){
    const next = emailInput.nextElementSibling;
    if(next && next.classList.contains("email-error")){
        next.remove();
    }
}

function validarEmail(valor){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}


function validarFormInter(){
    let ok = true;
    
    interFields.forEach(input=>{
        if(!input.value.trim()) ok = false;
    });
    
    if(!validarEmail(emailInput.value.trim())){
        ok = false;
    }

    ok ? enableBtn() : disableBtn();
}

interFields.forEach(input =>{
    input.addEventListener("input", validarFormInter);
});

emailInput.addEventListener("blur", ()=>{
    if(!validarEmail(emailInput.value.trim())){
        showEmailError("E-mail inválido");
    } else {
        clearEmailError();
    }
});