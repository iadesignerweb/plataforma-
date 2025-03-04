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
        bloqueado: false // Status inicial do aluno
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

    return false; // Evita o envio do formulário
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
        // Login do administrador
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        carregarListaAlunos();
        renderizarGraficosAdmin();
    } else if (formData) {
        const data = JSON.parse(formData);
        if (data.bloqueado) {
            alert('Este aluno está bloqueado!');
            return;
        }
        // Login do aluno
        document.getElementById('dashboardNome').textContent = data.nome;
        document.getElementById('dataMatricula').textContent = data.dataMatricula;
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';

        // Renderizar gráfico de mensalidades
        renderizarGraficoMensalidades(data.dataMatricula);
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
                <span class="contagem-regressiva">${calcularDiasRestantes(aluno.dataMatricula)} dias restantes</span>
                <div class="status ${calcularStatusPagamento(aluno.dataMatricula) ? 'ativo' : 'inadimplente'}"></div>
                <button onclick="bloquearAluno('${key}')">${aluno.bloqueado ? 'Desbloquear' : 'Bloquear'}</button>
                <button onclick="removerAluno('${key}')">Remover</button>
            `;
            listaAlunos.appendChild(alunoItem);
        }
    }
}

// Função para bloquear/desbloquear aluno
function bloquearAluno(id) {
    const aluno = JSON.parse(localStorage.getItem(id));
    aluno.bloqueado = !aluno.bloqueado;
    localStorage.setItem(id, JSON.stringify(aluno));
    alert(`Aluno ${aluno.bloqueado ? 'bloqueado' : 'desbloqueado'} com sucesso!`);
    carregarListaAlunos();
}

// Função para remover aluno
function removerAluno(id) {
    localStorage.removeItem(id);
    alert('Aluno removido com sucesso!');
    carregarListaAlunos();
}

// Função para calcular dias restantes para o vencimento
function calcularDiasRestantes(dataMatricula) {
    const hoje = new Date();
    const dataMatriculaObj = new Date(dataMatricula.split('/').reverse().join('-'));
    const diffTime = Math.abs(hoje - dataMatriculaObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return 30 - diffDays;
}

// Função para calcular status de pagamento
function calcularStatusPagamento(dataMatricula) {
    const hoje = new Date();
    const dataMatriculaObj = new Date(dataMatricula.split('/').reverse().join('-'));
    const diffTime = Math.abs(hoje - dataMatriculaObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

// Função para renderizar gráficos na área do administrador
function renderizarGraficosAdmin() {
    const ctx1 = document.getElementById('graficoAlunos').getContext('2d');
    const ctx2 = document.getElementById('graficoStatusPagamento').getContext('2d');
    const ctx3 = document.getElementById('graficoIdadeAlunos').getContext('2d');

    // Dados para os gráficos
    const alunos = [];
    const statusPagamento = { ativo: 0, inadimplente: 0 };
    const idades = { '10-20': 0, '21-30': 0, '31-40': 0, '41+': 0 };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('ALUNO-')) {
            const aluno = JSON.parse(localStorage.getItem(key));
            alunos.push(aluno);

            // Status de pagamento
            if (calcularStatusPagamento(aluno.dataMatricula)) {
                statusPagamento.ativo++;
            } else {
                statusPagamento.inadimplente++;
            }

            // Distribuição por idade
            const idade = aluno.idade;
            if (idade >= 10 && idade <= 20) idades['10-20']++;
            else if (idade >= 21 && idade <= 30) idades['21-30']++;
            else if (idade >= 31 && idade <= 40) idades['31-40']++;
            else idades['41+']++;
        }
    }

    // Gráfico 1: Número de alunos cadastrados
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Alunos Cadastrados'],
            datasets: [{
                label: 'Total',
                data: [alunos.length],
                backgroundColor: '#007bff',
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico 2: Status de pagamento
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Ativos', 'Inadimplentes'],
            datasets: [{
                data: [statusPagamento.ativo, statusPagamento.inadimplente],
                backgroundColor: ['#28a745', '#dc3545'],
            }]
        }
    });

    // Gráfico 3: Distribuição por idade
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['10-20', '21-30', '31-40', '41+'],
            datasets: [{
                label: 'Alunos',
                data: [idades['10-20'], idades['21-30'], idades['31-40'], idades['41+']],
                backgroundColor: '#ffc107',
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Função para logout do administrador
function logoutAdmin() {
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('cadastroArea').style.display = 'block';
    document.getElementById('loginArea').style.display = 'block';
    document.getElementById('loginID').value = '';
    alert('Você saiu do sistema.');
}

// Função para logout do aluno
function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('cadastroArea').style.display = 'block';
    document.getElementById('loginArea').style.display = 'block';
    document.getElementById('loginID').value = '';
    alert('Você saiu do sistema.');
}

// Função para abrir o menu lateral
function toggleMenu() {
    const menuLateral = document.getElementById('menuLateral');
    menuLateral.style.left = menuLateral.style.left === '0px' ? '-250px' : '0px';
}

// Função para mostrar popup de preços
function mostrarPopupPrecos() {
    document.getElementById('popupPrecos').style.display = 'block';
}

// Função para fechar popup de preços
function fecharPopupPrecos() {
    document.getElementById('popupPrecos').style.display = 'none';
}

// Função para abrir a página de downloads
function abrirDownloads() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('downloads').style.display = 'block';
    carregarDownloads();
}

// Função para carregar downloads
function carregarDownloads() {
    const listaDownloads = document.getElementById('listaDownloads');
    listaDownloads.innerHTML = '';
    const downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    downloads.forEach((arquivo, index) => {
        const item = document.createElement('div');
        item.className = 'aluno-item';
        item.innerHTML = `
            <span>${arquivo.nome}</span>
            <button onclick="baixarArquivo(${index})">Baixar</button>
        `;
        listaDownloads.appendChild(item);
    });
}

// Função para baixar arquivo
function baixarArquivo(index) {
    const downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    const arquivo = downloads[index];
    const link = document.createElement('a');
    link.href = arquivo.url;
    link.download = arquivo.nome;
    link.click();
}

// Função para voltar ao dashboard
function voltarDashboard() {
    document.getElementById('downloads').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Função para enviar mensagem no chat
function enviarMensagem() {
    const mensagemInput = document.getElementById('mensagemInput');
    const mensagem = mensagemInput.value.trim();
    if (mensagem) {
        const mensagensChat = document.getElementById('mensagensChat');
        const novaMensagem = document.createElement('div');
        novaMensagem.textContent = mensagem;
        mensagensChat.appendChild(novaMensagem);
        mensagemInput.value = '';
        mensagensChat.scrollTop = mensagensChat.scrollHeight;
    }
}

// Função para upload de arquivos
function uploadFiles() {
    const files = document.getElementById('uploadFile').files;
    const downloads = JSON.parse(localStorage.getItem('downloads')) || [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            downloads.push({
                nome: file.name,
                url: e.target.result
            });
            localStorage.setItem('downloads', JSON.stringify(downloads));
        };
        reader.readAsDataURL(file);
    }
    alert('Arquivos enviados com sucesso!');
}
