// Função para carregar lista de alunos
function carregarListaAlunos() {
    const listaAlunos = document.getElementById('listaAlunos');
    listaAlunos.innerHTML = '';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key.startsWith('ALUNO-')) {
            const aluno = JSON.parse(localStorage.getItem(key));
            
            const divAluno = document.createElement('div');
            divAluno.className = 'aluno-item';
            divAluno.innerHTML = `
                <div class="info-aluno">
                    <h3>${aluno.nome}</h3>
                    <p>ID: ${key}</p>
                    <p>Matrícula: ${aluno.dataMatricula}</p>
                </div>
                <div class="controles">
                    <button class="btn-admin bloquear" onclick="bloquearAluno('${key}')">Bloquear</button>
                    <button class="btn-admin desbloquear" onclick="desbloquearAluno('${key}')">Desbloquear</button>
                    <button class="btn-admin excluir" onclick="excluirAluno('${key}')">Excluir</button>
                </div>
            `;
            listaAlunos.appendChild(divAluno);
            
            // Preencher select de alunos
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${aluno.nome} (${key})`;
            document.getElementById('alunosSelecionados').appendChild(option);
        }
    }
}

// Funções de controle de alunos
function bloquearAluno(id) {
    const aluno = JSON.parse(localStorage.getItem(id));
    aluno.bloqueado = true;
    localStorage.setItem(id, JSON.stringify(aluno));
    carregarListaAlunos();
}

function desbloquearAluno(id) {
    const aluno = JSON.parse(localStorage.getItem(id));
    aluno.bloqueado = false;
    localStorage.setItem(id, JSON.stringify(aluno));
    carregarListaAlunos();
}

function excluirAluno(id) {
    localStorage.removeItem(id);
    carregarListaAlunos();
}

// Upload de arquivos
function uploadArquivo() {
    const arquivo = document.getElementById('arquivo').files[0];
    const alunosSelecionados = document.getElementById('alunosSelecionados');
    const selecionados = Array.from(alunosSelecionados.selectedOptions).map(opt => opt.value);
    
    if (!arquivo) {
        alert('Selecione um arquivo!');
        return;
    }
    
    // Simular envio de arquivo (para implementar backend)
    const mensagem = `Arquivo enviado para ${selecionados.join(', ')}`;
    document.getElementById('statusUpload').textContent = mensagem;
    document.getElementById('arquivo').value = '';
}

// Notificações no dashboard do aluno
function atualizarNotificacoes() {
    const notificacoes = document.getElementById('listaNotificacoes');
    notificacoes.innerHTML = '';
    
    // Simular notificações (para implementar backend)
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.innerHTML = `
        <i class="fas fa-bell"></i>
        <p>Nova avaliação disponível!</p>
    `;
    notificacoes.appendChild(notificacao);
}

// Adicione no login do aluno
function login() {
    // ... (código original) ...
    atualizarNotificacoes();
}
