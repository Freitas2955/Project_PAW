function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function() {
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.style.maxWidth = '100%';
        imgElement.style.maxHeight = '100%';

        const previewContainer = document.querySelector('#preview-container');
        previewContainer.innerHTML = ''; // Limpa qualquer prévia existente
        previewContainer.appendChild(imgElement);
    };

    reader.readAsDataURL(input.files[0]);
}