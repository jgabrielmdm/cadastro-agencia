// ----------------------------
// MASCARAS
// ----------------------------

$(document).ready(function(){

    // CNPJ
    $('input[name="cadastro-agencias-cnpj"]').mask("00.000.000/0000-00");

    // CPF
    $('input[name="cadastro-usuario-cpf"]').mask("000.000.000-00");

    //CPF E CNPJ (dinamico)
    const documentoInput = document.querySelector('.cpf-cnpj-mask');

    documentoInput.addEventListener('input', function () {

        let v = this.value.replace(/\D/g, ""); // só números

        if (v.length > 14) v = v.substring(0, 14); // limita máximo

        // CPF até 11 dígitos
        if (v.length <= 11) {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }

        // CNPJ até 14 dígitos
        else {
            v = v.replace(/(\d{2})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1/$2");
            v = v.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
        }

        this.value = v;
    });
    
    // CODIGO BANCÁRIO
    $('input[name="cadastro-cod-banco"]').mask('000');

    // TEL
    $(document).on("focus", ".telefone-mask", function() {
        $(this).mask("(00) 0000-00009");
    });

    // CEP
    $('input[name="cadastro-agencias-cep"]').mask("00000-000");

    // DATA
    $('input[name="cadastro-usuario-data-nascimento"]').mask("00/00/0000");

});