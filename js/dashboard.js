// ARQUIVO: js/dashboard.js

// 1. Verificar Login
const nome = localStorage.getItem('questPlayerName');
if (!nome) window.location.href = "index.html";

// 2. Carregar Dados
const classe = localStorage.getItem('questPlayerClass');
const avatarUrl = localStorage.getItem('questAvatarUrl');
let nivel = parseInt(localStorage.getItem('questLevel')) || 1;
let xpAtual = parseInt(localStorage.getItem('questXP')) || 0;
let xpParaProximoNivel = 100;

// 3. Renderizar HUD e Avatar
document.getElementById('user-name').innerText = nome;
document.getElementById('user-class').innerText = classe;
document.getElementById('user-avatar').src = avatarUrl || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${nome}`;

// --- SISTEMA DE MISSÕES ---
const missoesPadrao = [
    { id: 1, titulo: "Primeiros Passos", desc: "Faça login pela primeira vez.", xp: 20, feita: false },
    { id: 2, titulo: "Identidade", desc: "Crie seu Avatar personalizado.", xp: 30, feita: false },
    { id: 3, titulo: "Estudioso", desc: "Acesse a biblioteca de conteúdos.", xp: 50, feita: false },
    { id: 4, titulo: "Participativo", desc: "Comente em um fórum.", xp: 40, feita: false }
];
let minhasMissoes = JSON.parse(localStorage.getItem('questMissoes')) || missoesPadrao;

// --- NOVO: SISTEMA DE CONQUISTAS (BADGES) ---
const conquistasPadrao = [
    { id: 'level2', titulo: "Nível 2!", desc: "Alcance o nível 2.", icon: "⭐", desbloqueada: false },
    { id: 'xp100', titulo: "Colecionador", desc: "Acumule 100 XP total.", icon: "⚡", desbloqueada: false },
    { id: 'missao3', titulo: "Mestre das Tarefas", desc: "Complete 3 missões.", icon: "📜", desbloqueada: false }
];
let minhasConquistas = JSON.parse(localStorage.getItem('questConquistas')) || conquistasPadrao;


// --- INICIALIZAÇÃO ---
atualizarHUD();
renderizarMissoes();
renderizarConquistas(); // Renderiza as medalhas iniciais

// --- FUNÇÕES ---

function atualizarHUD() {
    document.getElementById('user-level').innerText = nivel;
    document.getElementById('current-xp').innerText = xpAtual;
    document.getElementById('next-level-xp').innerText = xpParaProximoNivel;
    
    let porcentagem = (xpAtual / xpParaProximoNivel) * 100;
    if (porcentagem > 100) porcentagem = 100;
    document.getElementById('xp-bar').style.width = porcentagem + '%';
}

function renderizarMissoes() {
    const container = document.getElementById('missions-list');
    container.innerHTML = "";
    
    minhasMissoes.forEach(missao => {
        const div = document.createElement('div');
        div.className = `mission-card ${missao.feita ? 'completed' : ''}`;
        
        const btnTexto = missao.feita ? "Concluída ✅" : "Completar";
        const btnAction = missao.feita ? "" : `onclick="completarMissao(${missao.id})"`;
        const btnDisabled = missao.feita ? "disabled" : "";

        div.innerHTML = `
            <h3>${missao.titulo}</h3>
            <p>${missao.desc} (+${missao.xp} XP)</p>
            <button class="btn-complete" ${btnDisabled} ${btnAction}>${btnTexto}</button>
        `;
        container.appendChild(div);
    });
}

function completarMissao(id) {
    const missao = minhasMissoes.find(m => m.id === id);
    if (missao && !missao.feita) {
        missao.feita = true;
        ganharXP(missao.xp);
        
        // Verifica conquistas após completar missão
        verificarConquistas();
        
        salvarDados();
        renderizarMissoes();
    }
}

function ganharXP(qtd) {
    xpAtual += qtd;
    if (xpAtual >= xpParaProximoNivel) {
        xpAtual -= xpParaProximoNivel;
        nivel++;
        alert(`🆙 LEVEL UP! Você alcançou o nível ${nivel}!`);
    }
    atualizarHUD();
    salvarDados();
    verificarConquistas(); // Verifica conquistas ao ganhar XP
}

// --- LÓGICA DAS CONQUISTAS ---

function renderizarConquistas() {
    const container = document.getElementById('badges-list');
    container.innerHTML = "";

    minhasConquistas.forEach(conquista => {
        const div = document.createElement('div');
        // Adiciona classe 'locked' se não estiver desbloqueada
        div.className = `badge-card ${conquista.desbloqueada ? 'unlocked' : 'locked'}`;
        
        // Ícone: Se bloqueado, podemos mudar ou deixar transparente via CSS
        const status = conquista.desbloqueada ? "Desbloqueado" : "Bloqueado";

        div.innerHTML = `
            <span class="badge-icon">${conquista.icon}</span>
            <h4>${conquista.titulo}</h4>
            <p>${conquista.desc}</p>
        `;
        container.appendChild(div);
    });
}

function verificarConquistas() {
    let houveMudanca = false;

    // 1. Checar Conquista de Nível 2
    const badgeNivel = minhasConquistas.find(c => c.id === 'level2');
    if (!badgeNivel.desbloqueada && nivel >= 2) {
        badgeNivel.desbloqueada = true;
        alert(`🏆 Nova Conquista: ${badgeNivel.titulo}`);
        houveMudanca = true;
    }

    // 2. Checar Conquista de XP (Total acumulado seria melhor, mas vamos usar uma lógica simples)
    // Nota: Como o XP reseta ao subir de nível, essa lógica simples só funciona no nível 1.
    // Num sistema real, teríamos uma variável "xpTotalAcumulado".
    const badgeXP = minhasConquistas.find(c => c.id === 'xp100');
    if (!badgeXP.desbloqueada && (xpAtual + (nivel-1)*100) >= 100) {
        badgeXP.desbloqueada = true;
        alert(`🏆 Nova Conquista: ${badgeXP.titulo}`);
        houveMudanca = true;
    }

    // 3. Checar Missões Completadas
    const badgeMissoes = minhasConquistas.find(c => c.id === 'missao3');
    const missoesFeitas = minhasMissoes.filter(m => m.feita).length;
    if (!badgeMissoes.desbloqueada && missoesFeitas >= 3) {
        badgeMissoes.desbloqueada = true;
        alert(`🏆 Nova Conquista: ${badgeMissoes.titulo}`);
        houveMudanca = true;
    }

    if (houveMudanca) {
        salvarDados();
        renderizarConquistas();
    }
}

function salvarDados() {
    localStorage.setItem('questLevel', nivel);
    localStorage.setItem('questXP', xpAtual);
    localStorage.setItem('questMissoes', JSON.stringify(minhasMissoes));
    localStorage.setItem('questConquistas', JSON.stringify(minhasConquistas));
}

function logout() {
    window.location.href = "index.html";
}