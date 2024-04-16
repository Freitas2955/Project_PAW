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
