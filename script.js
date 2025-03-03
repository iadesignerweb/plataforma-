document.getElementById('formCadastro').addEventListener('submit', submitForm);
document.querySelector('#loginArea button').addEventListener('click', login);
document.querySelector('.menu-superior a').addEventListener('click', voltarParaCadastro);
document.querySelector('.menu-superior a:nth-child(2)').addEventListener('click', logout);
document.querySelector('#popup button:nth-child(3)').addEventListener('click', copiarID);
document.querySelector('#popup button:nth-child(4)').addEventListener('click', fecharPopup);

function generateUniqueCode() {
    return 'ALUNO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function submitForm(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const descricao = document.getElementById('descricao').value;
    const uniqueCode = generateUniqueCode();

    const formData = {
        nome: nome,
        idade: idade,
        descricao: descricao,
        dataMatricula: new Date().toLocaleDateString('pt-BR')
    };
    
    localStorage.setItem(uniqueCode, JSON.stringify(formData));
    showPopup(uniqueCode);
    sendWhatsAppNotification(nome, uniqueCode);
    this.reset();
    carregarListaAlunos();
}

function showPopup(code) {
    document.getElementById('popupID').textContent = code;
    document.getElementById('popup').style.display = 'block';
}

function sendWhatsAppNotification(nome, code) {
    const mensagem = `Novo cadastro!\nNome: ${nome}\nID de Acesso: ${code}`;
    const url = `https://wa.me/5587999786261?text=${encodeURIComponent(mensagem)}`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
}

// Restante das funções JavaScript mantidas conforme original
// ... (todo o restante do código JavaScript fornecido anteriormente) ...