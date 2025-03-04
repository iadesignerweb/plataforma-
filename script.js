// Função para fazer login
function login() {
    const loginID = document.getElementById('loginID').value.trim();
    const formData = localStorage.getItem(loginID);

    if (loginID === '1316') {
        // Login do administrador
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        carregarListaAlunos();
    } else if (formData) {
        // Login do aluno
        const data = JSON.parse(formData);
        document.getElementById('dashboardNome').textContent = data.nome;
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
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
            alunoItem.className = 'aluno-item';
            alunoItem.innerHTML = `
                <span>${aluno.nome} (ID: ${key})</span>
                <div>
                    <button onclick="bloquearAluno('${key}')">Bloquear</button>
                    <button onclick="desbloquearAluno('${key}')">Desbloquear</button>
                </div>
            `;
            listaAlunos.appendChild(alunoItem);
        }
    }
}

// Funções para bloquear e desbloquear alunos
function bloquearAluno(id) {
    alert(`Aluno ${id} bloqueado!`);
}

function desbloquearAluno(id) {
    alert(`Aluno ${id} desbloqueado!`);
}

// Função para enviar arquivos
function enviarArquivos() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        const notificacaoBadge = document.getElementById('notificacaoBadge');
        notificacaoBadge.textContent = parseInt(notificacaoBadge.textContent) + files.length;
        alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
        fileInput.value = '';
    }
}
