// Estado inicial do Aluno
let aluno = {
    nome: "John Hésio",
    xp: 0,
    nivel: 1,
    xpProximoNivel: 100
};

// Lista de Missões (Baseado no RF006)
const missoes = [
    { id: 1, titulo: "Assistir Aula de Introdução", xp: 50, completa: false },
    { id: 2, titulo: "Participar do Fórum", xp: 30, completa: false },
    { id: 3, titulo: "Entregar Atividade 1", xp: 40, completa: false }
];

// Elementos do DOM (Interface)
const nomeEl = document.getElementById("student-name");
const nivelEl = document.getElementById("level");
const xpAtualEl = document.getElementById("current-xp");
const xpMaxEl = document.getElementById("max-xp");
const barraEl = document.getElementById("xp-bar");
const listaMissoesEl = document.getElementById("missions-list");

// Função para Atualizar a Interface
function atualizarInterface() {
    nomeEl.innerText = aluno.nome;
    nivelEl.innerText = aluno.nivel;
    xpAtualEl.innerText = aluno.xp;
    xpMaxEl.innerText = aluno.xpProximoNivel;

    // Calcula a porcentagem da barra
    const porcentagem = (aluno.xp / aluno.xpProximoNivel) * 100;
    barraEl.style.width = porcentagem + "%";
}

// Função para Completar Missão
function completarMissao(id) {
    const missao = missoes.find(m => m.id === id);

    if (missao && !missao.completa) {
        missao.completa = true;
        ganharXP(missao.xp);
        renderizarMissoes(); // Re-renderiza para desabilitar o botão
        alert(`🎉 Parabéns! Você completou: "${missao.titulo}" e ganhou ${missao.xp} XP!`);
    }
}

// Sistema de Ganho de XP e "Level Up"
function ganharXP(quantidade) {
    aluno.xp += quantidade;

    // Verifica se subiu de nível
    if (aluno.xp >= aluno.xpProximoNivel) {
        aluno.nivel++;
        aluno.xp = aluno.xp - aluno.xpProximoNivel; // Sobra de XP vai para o próximo nível
        aluno.xpProximoNivel = Math.floor(aluno.xpProximoNivel * 1.5); // Dificulta o próximo nível
        alert("🆙 LEVEL UP! Você subiu para o nível " + aluno.nivel + "!");
    }

    atualizarInterface();
}

// Função para criar as missões na tela (Renderização)
function renderizarMissoes() {
    listaMissoesEl.innerHTML = ""; // Limpa a lista atual

    missoes.forEach(missao => {
        const div = document.createElement("div");
        div.className = "mission-card";
        
        // Se a missão já foi feita, muda o texto do botão
        const botaoTexto = missao.completa ? "Concluído ✅" : "Completar";
        const estadoBotao = missao.completa ? "disabled" : "";

        div.innerHTML = `
            <div>
                <h3>${missao.titulo}</h3>
                <small>Recompensa: <strong>${missao.xp} XP</strong></small>
            </div>
            <button 
                class="btn-complete" 
                onclick="completarMissao(${missao.id})" 
                ${estadoBotao}
            >
                ${botaoTexto}
            </button>
        `;
        listaMissoesEl.appendChild(div);
    });
}

// Inicialização
atualizarInterface();
renderizarMissoes();