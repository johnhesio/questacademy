// ARQUIVO: js/inventario.js

// 1. Dados do Usuário
const classe = localStorage.getItem('questPlayerClass') || "Aventureiro";
const nivel = parseInt(localStorage.getItem('questLevel')) || 1;

// 2. Banco de Itens (Simulação)
const itensPossiveis = {
    'espada_madeira': { nome: "Espada de Treino", icon: "🗡️", desc: "Uma espada simples para iniciantes." },
    'mapa_velho': { nome: "Mapa Antigo", icon: "🗺️", desc: "Mostra caminhos secretos da academia." },
    'livro_basico': { nome: "Manual do Novato", icon: "📘", desc: "Contém regras básicas de sobrevivência." },
    'pocao_mana': { nome: "Café (Mana)", icon: "☕", desc: "Recupera energia para estudar mais." },
    'moeda_ouro': { nome: "Quest Coin", icon: "🪙", desc: "Moeda usada na loja da escola." }
};

// 3. Definir Inventário Inicial baseado na Classe
let inventarioAtual = [];

// Se for a primeira vez carregando a página de inventário (simulação)
// Em um app real, isso viria do banco de dados salvo
if (classe === "Conquistador") {
    inventarioAtual.push({ id: 'espada_madeira', qtd: 1 });
    inventarioAtual.push({ id: 'pocao_mana', qtd: 2 });
} else if (classe === "Explorador") {
    inventarioAtual.push({ id: 'mapa_velho', qtd: 1 });
    inventarioAtual.push({ id: 'moeda_ouro', qtd: 10 });
} else if (classe === "Diplomata") {
    inventarioAtual.push({ id: 'livro_basico', qtd: 1 });
    inventarioAtual.push({ id: 'pocao_mana', qtd: 1 });
} else {
    // Fallback
    inventarioAtual.push({ id: 'moeda_ouro', qtd: 5 });
}

// Bônus de Nível: Se for Nível 2 ou mais, ganha item extra
if (nivel >= 2) {
    inventarioAtual.push({ id: 'moeda_ouro', qtd: 50 });
}


// 4. Renderizar a Grade (Total de 20 slots para parecer um RPG)
const grid = document.getElementById('inventory-grid');
const totalSlots = 20;

for (let i = 0; i < totalSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    
    // Verifica se tem item nesse slot (baseado na ordem do array)
    if (i < inventarioAtual.length) {
        const itemData = inventarioAtual[i]; // Dados salvos (id, qtd)
        const itemInfo = itensPossiveis[itemData.id]; // Dados visuais (nome, icon)

        if (itemInfo) {
            slot.innerHTML = `
                <div class="inv-item">${itemInfo.icon}</div>
                <div class="item-qty">x${itemData.qtd}</div>
            `;
            
            // Evento de Clique para ver detalhes
            slot.onclick = () => verDetalhes(itemInfo);
        }
    } else {
        // Slot vazio (sem clique)
        slot.style.cursor = "default";
    }

    grid.appendChild(slot);
}

// 5. Função de Detalhes
function verDetalhes(item) {
    // Remove seleção visual de todos
    document.querySelectorAll('.inv-slot').forEach(s => s.classList.remove('selected'));
    
    // Adiciona ao clicado (truque: como o onclick está no elemento, o event target pega ele)
    event.currentTarget.classList.add('selected');

    // Atualiza Painel Direito
    document.getElementById('item-name').innerText = item.nome;
    document.getElementById('item-icon').innerText = item.icon;
    document.getElementById('item-desc').innerText = item.desc;
}