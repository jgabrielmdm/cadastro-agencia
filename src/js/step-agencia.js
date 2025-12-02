// STEP AGENCIA
const tabs = document.querySelectorAll(".tab-item");
const panels = document.querySelectorAll(".tab-panel");
const btnNextStepAgencia = document.getElementById("nextTab");
const btnPrevTab = document.getElementById("prevTab");

let currentTab = 0;

// Função: trocar de aba
function changeTab(index) {
  currentTab = index;

  tabs.forEach(t => t.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));

  tabs[currentTab].classList.add("active");
  panels[currentTab].classList.add("active");

  // última aba: esconde nextTab e mostra btnNext (step)
  if (currentTab === tabs.length - 1) {
    btnNextStepAgencia.style.display = "none";
    btnNext.style.display = "inline-block";
  } else {
    btnNext.style.display = "none";
    btnNextStepAgencia.style.display = "inline-block";
  }

  // se estiver na primeira aba → ESconde botão anterior
  if (currentTab === 0) {
    btnPrevTab.style.display = "none";
  } else {
    btnPrevTab.style.display = "inline-block";
  }
}

btnPrevTab.addEventListener("click", () => {
  if (currentTab > 0) {

    // remove completed da aba anterior
    unmarkTabCompleted(currentTab - 1);

    changeTab(currentTab - 1);
  }
});

// Botão próxima aba - controle de abas
btnNextStepAgencia.addEventListener("click", () => {
  if (currentTab < tabs.length - 1) {    
    
    markTabAsCompleted(currentTab);

    changeTab(currentTab + 1);
  }
});

function markTabAsCompleted(index) {
  tabs[index].classList.add("completed");
}

function unmarkTabCompleted(index) {
  tabs[index].classList.remove("completed");
}