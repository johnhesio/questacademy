// ARQUIVO: js/dashboard.js

// 1. Verificação de Segurança (Login)
const nomeSalvo = localStorage.getItem('questPlayerName');

if (!nomeSalvo) {
    alert("Você precisa fazer login!");
    window.location.href = "index.html";
}

// 2. Carregar todos os dados do LocalStorage
const classeSalva = localStorage.getItem('questPlayerClass') || "Aventureiro";
const nivelSalvo = localStorage.getItem('questLevel') || 1;
const xpSalvo = localStorage.getItem('questXP') || 0;
const avatarUrl = localStorage.getItem('questAvatarUrl');

// 3. Preencher o HTML com os dados de Texto
document.getElementById('user-name').innerText = nomeSalvo;
document.getElementById('user-class').innerText = classeSalva;
document.getElementById('user-level').innerText = nivelSalvo;
document.getElementById('user-xp').innerText = xpSalvo;

// 4. Preencher a Imagem do Avatar
const avatarImgElement = document.getElementById('user-avatar');

if (avatarUrl) {
    // Se existe um avatar salvo, usa ele
    avatarImgElement.src = avatarUrl;
} else {
    // Fallback: Se não tiver avatar, gera um aleatório com base no nome
    avatarImgElement.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nomeSalvo}`;
}

// 5. Função de Logout (Sair)
function logout() {
    if(confirm("Deseja realmente sair da sua jornada?")) {
        // Redireciona para o login
        window.location.href = "index.html";
    }
}