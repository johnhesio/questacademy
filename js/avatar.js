// ARQUIVO: js/avatar.js

const nomeUsuario = localStorage.getItem("questPlayerName") || "Visitante";
const previewImg = document.getElementById("avatar-preview");
const displayNome = document.getElementById("player-name-display");

// Variáveis de estado (guardam as escolhas atuais)
let estiloCabelo = "shortHair";
let acessorios = "none";
let corRoupa = "6c5ce7"; // Roxo padrão

// Inicialização
window.onload = function () {
  displayNome.innerText = nomeUsuario;
  atualizarAvatar();
};

// Função para mudar a cor (chamada ao clicar nas bolinhas)
function mudarCor(corHex) {
  corRoupa = corHex;
  atualizarAvatar();
}

// Função principal: Gera a URL e atualiza a imagem
function atualizarAvatar() {
  // Pega os valores dos selects
  estiloCabelo = document.getElementById("hair-style").value;
  acessorios = document.getElementById("accessories").value;

  // Constrói a URL da API DiceBear (Estilo Avataaars)
  // A "seed" (semente) é o nome do usuário, garantindo que o rosto base seja sempre o mesmo para aquele nome

  let url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nomeUsuario}`;

  // Adiciona os parâmetros de customização
  url += `&top=${estiloCabelo}`;
  url += `&accessories=${acessorios}`;
  url += `&clotheColor=${corRoupa}`;
  url += `&backgroundColor=b6e3f4`; // Fundo azul claro para destacar

  // Atualiza o src da imagem
  previewImg.src = url;
}

// Função Salvar
function salvarAvatar() {
  // Salva a URL completa do avatar para usarmos no Dashboard
  localStorage.setItem("questAvatarUrl", previewImg.src);

  // Redireciona para o Dashboard
  window.location.href = "dashboard.html";
}
