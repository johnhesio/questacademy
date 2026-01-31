// ARQUIVO: js/ranking.js

// 1. Recuperar dados do Jogador Real
const nome = localStorage.getItem('questPlayerName') || "Visitante";
const nivel = parseInt(localStorage.getItem('questLevel')) || 1;
const xpAtual = parseInt(localStorage.getItem('questXP')) || 0;
const avatar = localStorage.getItem('questAvatarUrl');

// Calculamos um "XP Total" fictício para o Ranking (Nivel * 100 + XP Atual)
// Isso evita que alguém Nível 5 com 10 XP fique atrás de alguém Nível 1 com 90 XP.
const xpTotalReal = (nivel * 100) + xpAtual;

// 2. Criar lista de Bots (Simulação de outros alunos)
const bots = [
    { nome: "Mario Bros", nivel: 5, xp: 50 },
    { nome: "Sonic", nivel: 3, xp: 80 },
    { nome: "Zelda", nivel: 4, xp: 20 },
    { nome: "Ash Ketchum", nivel: 2, xp: 90 },
    { nome: "Lara Croft", nivel: 6, xp: 10 },
    { nome: "Kratos", nivel: 1, xp: 30 },
    { nome: "Steve", nivel: 2, xp: 10 }
];

// Transforma os bots no mesmo formato de XP Total
let listaRanking = bots.map(bot => {
    return {
        nome: bot.nome,
        nivel: bot.nivel,
        xpTotal: (bot.nivel * 100) + bot.xp,
        isPlayer: false // Marca que é bot
    };
});

// 3. Adiciona o Jogador Real na lista
listaRanking.push({
    nome: nome,
    nivel: nivel,
    xpTotal: xpTotalReal,
    isPlayer: true, // Marca que sou eu
    avatarUrl: avatar
});

// 4. Ordenar do Maior XP para o Menor
listaRanking.sort((a, b) => b.xpTotal - a.xpTotal);

// 5. Renderizar na Tabela
const tabelaBody = document.getElementById('ranking-body');

listaRanking.forEach((item, index) => {
    const tr = document.createElement('tr');
    
    // Se for o jogador, adiciona classe de destaque
    if (item.isPlayer) {
        tr.className = "highlight";
    }

    // Posição (Index + 1 porque array começa em 0)
    const posicao = index + 1;
    let medalha = posicao;
    
    // Ícones para os top 3
    if (posicao === 1) medalha = "🥇";
    if (posicao === 2) medalha = "🥈";
    if (posicao === 3) medalha = "🥉";

    // Avatar (Se for bot, usa um genérico, se for player, usa o salvo)
    let imgTag = "";
    if (item.isPlayer && item.avatarUrl) {
        imgTag = `<img src="${item.avatarUrl}" class="mini-avatar">`;
    } else {
        imgTag = `<img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=${item.nome}" class="mini-avatar">`;
    }

    tr.innerHTML = `
        <td>${medalha}</td>
        <td>${imgTag} ${item.nome} ${item.isPlayer ? "(Você)" : ""}</td>
        <td>Lvl ${item.nivel}</td>
        <td>${item.xpTotal} XP</td>
    `;

    tabelaBody.appendChild(tr);
});