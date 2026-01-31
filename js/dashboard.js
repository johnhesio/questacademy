// ARQUIVO: js/dashboard.js

// --- 1. DADOS INICIAIS ---
const nome = localStorage.getItem('questPlayerName');
const classe = localStorage.getItem('questPlayerClass');
const avatarUrl = localStorage.getItem('questAvatarUrl');

// Se não tiver nome, volta pro login
if (!nome) window.location.href = "index.html";

// Variáveis de Jogo (Carrega ou Inicia Zero)
let nivel = parseInt(localStorage.getItem('questLevel')) || 1;
let xpAtual = parseInt(localStorage.getItem('questXP')) || 0;
let xpParaProximoNivel = 100; // Meta fixa por enquanto

// Lista de Missões Padrão
const missoesPadrao = [
    { id: 1, titulo: "Primeiro Login", desc: "Acesse a plataforma pela primeira vez.", xp: 20, feita: false },
    { id: 2, titulo: "Criar Avatar", desc: "Personalize sua identidade digital.", xp: 30, feita: false },
    { id: 3, titulo: "Aula Inaugural", desc: "Assista ao vídeo de boas-vindas.", xp: 50, feita: false },
    { id: 4, titulo: "Completar Perfil", desc: "Preencha seus dados na secretaria.", xp: 40, feita: false }
];

// Tenta carregar missões salvas (se já mexeu nelas) ou usa as padrão
let minhasMissoes = JSON.parse(localStorage.getItem('questMissoes')) || missoesPadrao;

// --- 2. INICIALIZAÇÃO NA TELA ---
document.getElementById('user-name').innerText = nome;
document.getElementById('user-class').innerText = classe;

// Carrega Avatar com Fallback
const imgElement = document.getElementById('user-avatar');
if (avatarUrl) {
    imgElement.src = avatarUrl;
} else {
    imgElement.src = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${nome}`;
}

// Renderiza tudo
atualizarHUD();
renderizarMissoes();


// --- 3. FUNÇÕES DO SISTEMA ---

// Atualiza Barra de XP e Textos
function atualizarHUD() {
    document.getElementById('user-level').innerText = nivel;
    document.getElementById('current-xp').innerText = xpAtual;
    document.getElementById('next-level-xp').innerText = xpParaProximoNivel;

    // Cálculo da porcentagem da barra
    let porcentagem = (xpAtual / xpParaProximoNivel) * 100;
    if (porcentagem > 100) porcentagem = 100; // Trava em 100 visualmente

    document.getElementById('xp-bar').style.width = porcentagem + '%';
}

// Gera o HTML das missões
function renderizarMissoes() {
    const container = document.getElementById('missions-list');
    container.innerHTML = ""; // Limpa antes de recriar

    minhasMissoes.forEach(missao => {
        const div = document.createElement('div');
        // Adiciona classe 'completed' se já foi feita para ficar cinza
        div.className = `mission-card ${missao.feita ? 'completed' : ''}`;

        // Botão muda texto dependendo do estado
        const btnTexto = missao.feita ? "Concluída ✅" : "Completar Missão";
        const btnDisabled = missao.feita ? "disabled" : "";
        const clickFuncao = missao.feita ? "" : `onclick="completarMissao(${missao.id})"`;

        div.innerHTML = `
            <div>
                <h3>${missao.titulo} <span class="xp-badge">+${missao.xp} XP</span></h3>
                <p>${missao.desc}</p>
            </div>
            <button class="btn-complete" ${btnDisabled} ${clickFuncao}>
                ${btnTexto}
            </button>
        `;
        container.appendChild(div);
    });
}

// Lógica de Completar
function completarMissao(id) {
    // Acha a missão na lista
    const missao = minhasMissoes.find(m => m.id === id);

    if (missao && !missao.feita) {
        // 1. Marca como feita
        missao.feita = true;
        
        // 2. Dá o XP
        ganharXP(missao.xp);

        // 3. Salva no LocalStorage para não perder ao atualizar a página
        salvarDados();

        // 4. Atualiza a tela
        renderizarMissoes();
    }
}

// Sistema de XP e Level Up
function ganharXP(quantidade) {
    xpAtual += quantidade;

    // Checa Level Up
    if (xpAtual >= xpParaProximoNivel) {
        xpAtual = xpAtual - xpParaProximoNivel; // O que sobra vai pro próximo nível
        nivel++;
        alert(`🎉 LEVEL UP! Parabéns, você alcançou o nível ${nivel}!`);
        
        // (Opcional) Aumentar dificuldade do próximo nível
        // xpParaProximoNivel = Math.floor(xpParaProximoNivel * 1.2); 
    }

    atualizarHUD();
    salvarDados();
}

// Salva tudo no navegador
function salvarDados() {
    localStorage.setItem('questLevel', nivel);
    localStorage.setItem('questXP', xpAtual);
    localStorage.setItem('questMissoes', JSON.stringify(minhasMissoes));
}

function logout() {
    if(confirm("Sair do sistema?")) {
        window.location.href = "index.html";
    }
}