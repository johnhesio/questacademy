// ARQUIVO: js/avatar.js

const nomeUsuario = localStorage.getItem('questPlayerName') || "Visitante";
const previewImg = document.getElementById('avatar-preview');
const displayNome = document.getElementById('player-name-display');
const selectCabelo = document.getElementById('hair-style');
const containerPele = document.getElementById('skin-colors');

// --- DADOS ESTILO PIXEL ART ---

// Tons de Pele (Hex codes seguros)
const tonsPele = [
    "ffdbb4", // Claro
    "edb98a", // Médio
    "d08b5b", // Bronzeado
    "ae5d29", // Escuro
    "693c1e"  // Muito Escuro
];

// Listas de Cabelos (Apenas valores testados)
const cabelosHomem = [
    { valor: "short01", nome: "Curto Básico" },
    { valor: "short02", nome: "Curto Lateral" },
    { valor: "short03", nome: "Militar" },
    { valor: "short04", nome: "Bagunçado" },
    { valor: "short05", nome: "Topete" },
    { valor: "short09", nome: "Social" },
    { valor: "short10", nome: "Careca" }
];

const cabelosMulher = [
    { valor: "long01", nome: "Longo Solto" },
    { valor: "long02", nome: "Rabo de Cavalo" },
    { valor: "long03", nome: "Coque" },
    { valor: "long04", nome: "Longo Liso" },
    { valor: "long05", nome: "Chanel" },
    { valor: "long15", nome: "Ondulado" },
    { valor: "long17", nome: "Afro Longo" }
];

// Estado Atual
let generoAtual = "male"; 
let corPeleAtual = "ffdbb4"; 

// --- INICIALIZAÇÃO ---
window.onload = function() {
    displayNome.innerText = nomeUsuario;
    gerarBotoesPele(); 
    mudarGenero('male'); 
}

function gerarBotoesPele() {
    containerPele.innerHTML = "";
    tonsPele.forEach(cor => {
        const div = document.createElement('div');
        div.className = "color-btn";
        div.style.backgroundColor = "#" + cor;
        div.onclick = () => mudarPele(cor, div);
        if(cor === corPeleAtual) div.classList.add('selected');
        containerPele.appendChild(div);
    });
}

function mudarPele(cor, elementoClicado) {
    corPeleAtual = cor;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    elementoClicado.classList.add('selected');
    atualizarAvatar();
}

function mudarGenero(genero) {
    generoAtual = genero;

    // Visual dos botões
    document.getElementById('btn-male').classList.remove('active');
    document.getElementById('btn-female').classList.remove('active');

    if (genero === 'male') {
        document.getElementById('btn-male').classList.add('active');
    } else {
        document.getElementById('btn-female').classList.add('active');
    }

    // Atualiza a lista do Select
    selectCabelo.innerHTML = "";
    const lista = (genero === 'male') ? cabelosHomem : cabelosMulher;

    lista.forEach(item => {
        const option = document.createElement('option');
        option.value = item.valor;
        option.innerText = item.nome;
        selectCabelo.appendChild(option);
    });
    
    atualizarAvatar();
}

function atualizarAvatar() {
    const estiloCabelo = selectCabelo.value;
    
    // URL Base
    let url = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${nomeUsuario}`;
    
    // Parâmetros Essenciais
    url += `&hair=${estiloCabelo}`;
    url += `&skinColor=${corPeleAtual}`;
    
    // Removi 'glasses' e forcei probabilidade zero para garantir que não apareçam aleatoriamente
    url += `&glassesProbability=0`; 

    // Cache Buster (Evita que o navegador mostre a imagem antiga)
    url += `&t=${new Date().getTime()}`;

    // Debug
    console.log("URL Gerada:", url);
    previewImg.src = url;
}

function salvarAvatar() {
    localStorage.setItem('questAvatarUrl', previewImg.src);
    window.location.href = "dashboard.html";
}