// ----------------------------
// MASCARAS
// ----------------------------

$(document).ready(function(){

    // CNPJ
    $('input[name="cadastro-agencias-cnpj"]').mask("00.000.000/0000-00");

    // CPF
    $('input[name="cadastro-usuario-cpf"]').mask("000.000.000-00");

    // TELEFONE (com 9 dígitos)
    $('input[name="cadastro-agencia-telefone"]').mask("(00) 00000-0000");

    // CEP
    $('input[name="cadastro-agencias-cep"]').mask("00000-000");

    // DATA
    $('input[name="cadastro-usuario-data-nascimento"]').mask("00/00/0000");

});