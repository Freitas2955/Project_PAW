function mostrarSelecao() {
    const checkboxes = document.querySelectorAll('input[name="opcao"]:checked');
    let selecionados = [];

    checkboxes.forEach((checkbox) => {
        selecionados.push(checkbox.value);
    });

    if (selecionados.length > 0) {
        document.getElementById('resultado').textContent = `Selecionado(s): ${selecionados.join(', ')}`;
    } else {
        document.getElementById('resultado').textContent = 'Nenhuma opção selecionada.';
    }
}