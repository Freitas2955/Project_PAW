/*
function visualizarpass() {
    var passwordField = document.getElementById("password");
    var toggleIcon = document.querySelector(".mudar");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.textContent = "&#x1F443;"; // mudar para olhinho tapado
    } else {
        passwordField.type = "password";
        toggleIcon.textContent = "&#x1F441;"; // mudar para olhinho aberto
    }
}
*/

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.mudar');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        icon.textContent = '👁️';
    }
}


/*// 

Função para enviar o formulário
        function submitForm() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Simular autenticação (verificação de usuário/senha)
            if (email === 'usuario@example.com' && password === 'senha') {
                if (rememberMe) {
                    // Salvar dados no armazenamento local
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    // Limpar dados do armazenamento local
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('rememberMe');
                }
                alert('Login bem-sucedido!');
                // Redirecionar para a página de destino
                // window.location.href = 'pagina-de-destino.html';
            } else {
                alert('Email ou senha inválidos.');
            }
        }

*/

window.onload = function() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
};