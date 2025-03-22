// Função para cadastrar aluno
function submitForm() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (!nome || !idade || !descricao) {
        alert("Preencha todos os campos!");
        return false;
    }

    const uniqueID = 'ALUNO-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const aluno = {
        nome,
        idade,
        descricao,
        dataMatricula: new Date().toLocaleDateString('pt-BR')
    };

    localStorage.setItem(uniqueID, JSON.stringify(aluno));

    // Exibir popup com ID
    document.getElementById('popupID').textContent = uniqueID;
    document.getElementById('popup').style.display = 'block';

    // Limpar formulário
    document.getElementById('formCadastro').reset();
    
    return false; // Evita recarregar a página
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}

// Função para copiar ID
function copiarID() {
    const id = document.getElementById('popupID').textContent;
    navigator.clipboard.writeText(id).then(() => alert("ID copiado!"));
}

// Função para login
function login() {
    const loginID = document.getElementById('loginID').value.trim();

    if (loginID === '1316') { // Login administrativo
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        carregarListaAlunos();
        return;
    }

    const alunoData = localStorage.getItem(loginID);
    
    if (alunoData) { // Login do aluno
        const aluno = JSON.parse(alunoData);
        document.getElementById('dashboardNome').textContent = aluno.nome;
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        return;
    }

    alert("ID inválido!");
}

// Função para carregar lista de alunos no painel administrativo
function carregarListaAlunos() {
    const listaAlunos = document.getElementById('listaAlunos');
    
    listaAlunos.innerHTML = '';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key.startsWith('ALUNO-')) {
            const aluno = JSON.parse(localStorage.getItem(key));
            
            const divAluno = document.createElement('div');
            divAluno.textContent = `${aluno.nome} (${key})`;
            
            listaAlunos.appendChild(divAluno);
        }
    }
}

// Função para logout
function logout() {
    location.reload(); // Recarrega a página para limpar o estado atual
}
