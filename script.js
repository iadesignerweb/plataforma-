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
        dataMatricula: new Date().toLocaleDateString('pt-BR')
    };
    localStorage.setItem(uniqueCode, JSON.stringify(formData));

    // Exibir pop-up com o ID de acesso
    document.getElementById('popupID').textContent = uniqueCode;
    const popup = new bootstrap.Modal(document.getElementById('popup'));
    popup.show();

    // Limpar formulário
    document.getElementById('cadastroForm').reset();

    // Atualizar a lista de alunos no painel do administrador
    carregarListaAlunos();

    return false; // Evita o envio do formulário
}

// Função para copiar o ID
function copiarID() {
    const id = document.getElementById('popupID').textContent;
    navigator.clipboard.writeText(id).then(() => {
        alert('ID copiado para a área de transferência!');
    });
}

// Função para fazer login
function login() {
    const loginID = document.getElementById('loginID').value.trim();
    const formData = localStorage.getItem(loginID);

    if (loginID === '1316') {
        // Login do administrador
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        carregarListaAlunos();
    } else if (formData) {
        // Login do aluno
        const data = JSON.parse(formData);
        document.getElementById('dashboardNome').textContent = data.nome;
        document.getElementById('dataMatricula').textContent = data.dataMatricula;
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('adminDashboard').style.display = 'none';
    } else {
        alert('ID de acesso inválido!');
    }
}

// Função para carregar lista de alunos no painel do administrador
function carregarListaAlunos() {
    const listaAlunos = document.getElementById('listaAlunos');
    listaAlunos.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ALUNO-')) {
            const aluno = JSON.parse(localStorage.getItem(key));
            const alunoItem = document.createElement('div');
            alunoItem.className = 'card mb-3';
            alunoItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${aluno.nome} (ID: ${key})</h5>
                    <p class="card-text">Data da Matrícula: ${aluno.dataMatricula}</p>
                    <button class="btn btn-primary" onclick="abrirDashboardAluno('${key}')">Acessar</button>
                </div>
            `;
            listaAlunos.appendChild(alunoItem);
        }
    }
}

// Função para abrir dashboard do aluno
function abrirDashboardAluno(id) {
    const aluno = JSON.parse(localStorage.getItem(id));
    document.getElementById('dashboardNome').textContent = aluno.nome;
    document.getElementById('dataMatricula').textContent = aluno.dataMatricula;
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Função para gerar boleto
function gerarBoleto() {
    alert('Boleto gerado com sucesso!');
}

// Funções para as opções do dashboard
function acessarCurso(curso) {
    alert(`Acessando curso de ${curso}`);
}

function acessarBancoQuestoes() {
    alert('Acessando Banco de Questões');
}

function acessarBiblioteca() {
    alert('Acessando Biblioteca de Aulas');
}

function acessarGrupoTurma() {
    alert('Acessando Grupo da Turma');
}

// Função para logout
function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginID').value = '';
    alert('Você saiu do sistema.');
}
