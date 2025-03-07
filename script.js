// Lógica para o upload de arquivos (Dashboard do Administrador)
const uploadedFiles = [];

function uploadFiles() {
    const fileInput = document.getElementById('file-upload');
    const files = fileInput.files;
    const fileList = document.getElementById('uploaded-files');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        uploadedFiles.push(file);

        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFile(i);

        listItem.appendChild(removeButton);
        fileList.appendChild(listItem);
    }

    alert('Arquivos enviados com sucesso!');
    fileInput.value = ''; // Limpa o input de arquivo
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    const fileList = document.getElementById('uploaded-files');
    fileList.innerHTML = ''; // Limpa a lista

    // Reexibe os arquivos restantes
    uploadedFiles.forEach((file, i) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFile(i);

        listItem.appendChild(removeButton);
        fileList.appendChild(listItem);
    });
}

// Lógica para as notificações (Dashboard do Aluno)
const notifications = [];

function toggleNotifications() {
    const dropdown = document.getElementById('notification-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function addNotification(fileName) {
    notifications.push(fileName);
    const notificationList = document.getElementById('notification-list');
    const notificationCount = document.getElementById('notification-count');

    // Atualiza a lista de notificações
    const listItem = document.createElement('li');
    listItem.textContent = fileName;
    notificationList.appendChild(listItem);

    // Atualiza o contador de notificações
    notificationCount.textContent = notifications.length;
}

// Simulação de novas notificações (pode ser substituído por lógica real)
setTimeout(() => addNotification('Arquivo 1.pdf'), 2000);
setTimeout(() => addNotification('Arquivo 2.docx'), 4000);
