// ARQUIVO: js/criacao.js
const nameSpan = document.getElementById('player-name');
const playerName = localStorage.getItem('questPlayerName');
let classeSelecionada = null;

// Verifica se tem login
if (playerName) {
    nameSpan.innerText = playerName;
} else {
    window.location.href = "index.html";
}

function selecionarClasse(nomeClasse) {
    classeSelecionada = nomeClasse;
    
    // Remove classe visual de todos
    document.querySelectorAll('.archetype-card').forEach(card => {
        card.classList.remove('selected');
        if (card.querySelector('h3').innerText.includes(nomeClasse)) {
            card.classList.add('selected');
        }
    });

    document.getElementById('selection-text').innerText = `Escolhido: ${nomeClasse}`;
    document.getElementById('btn-create').disabled = false;
}

function confirmarCriacao() {
    if (classeSelecionada) {
        localStorage.setItem('questPlayerClass', classeSelecionada);
        localStorage.setItem('questLevel', 1);
        localStorage.setItem('questXP', 0);
        window.location.href = "dashboard.html";
    }
}