// ARQUIVO: js/dashboard.js
const nome = localStorage.getItem('questPlayerName');
const classe = localStorage.getItem('questPlayerClass');
const nivel = localStorage.getItem('questLevel');
const xp = localStorage.getItem('questXP');

if (!nome) {
    window.location.href = "index.html";
}

document.getElementById('user-name').innerText = nome;
document.getElementById('user-class').innerText = classe;
document.getElementById('user-level').innerText = nivel;
document.getElementById('user-xp').innerText = xp;

function logout() {
    window.location.href = "index.html";
}