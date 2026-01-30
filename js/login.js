// ARQUIVO: js/login.js
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    
    if (username.length < 3) {
        alert("O nome precisa ter pelo menos 3 letras!");
        return;
    }

    localStorage.setItem('questPlayerName', username);
    window.location.href = "criacao.html";
});