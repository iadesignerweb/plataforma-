// Função para gerar código único
function generateUniqueCode() {
    return 'ALUNO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Função para cadastrar aluno
function submitForm() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const descricao = document.getElementById('descricao').value;

    // Gerar código único
    const uniqueCode = generateUniqueCode();

    // Armazenar dados no localStorage
    const formData = {
        nome: nome,
        idade: idade,
        descricao: descricao,
        dataMatricula: new Date().toLocaleDateString('pt-BR'),
        bloqueado: false,
        inadimplente: false
    };
    localStorage.setItem(uniqueCode, JSON.stringify(formData));

    // Exibir pop-up com o ID de acesso
    document.getElementById('popupID').textContent = uniqueCode;
    document.getElementById('popup').style.display = 'block';

    // Enviar ID para o WhatsApp (oculto para o aluno)
    const mensagem = `Novo cadastro!\nNome: ${nome}\nID de Acesso: ${uniqueCode}`;
    const url = `https://wa.me/5587999786261?text=${encodeURIComponent(mensagem)}`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    // Limpar formulário
    document.getElementById('formCadastro').reset();

    // Atualizar a lista de alunos no painel do administrador
    carregarListaAlunos();

    return false;
}

// Função para copiar o ID
function copiarID() {
    const id = document.getElementById('popupID').textContent;
    navigator.clipboard.writeText(id).then(() => {
        alert('ID copiado para a área de transferência!');
    });
}

// Função para fechar o popup manualmente
function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}

// Função para fazer login
function login() {
    const loginID = document.getElementById('loginID').value.trim();
    const formData = localStorage.getItem(loginID);

    if (loginID === '1316') {
        localStorage.setItem('isAdmin', 'true');
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display
