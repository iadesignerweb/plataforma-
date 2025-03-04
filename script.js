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
    document.getElementById('popup').style.display = 'block'; // Exibe o popup

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
    } else if (formData) {
        // Login do aluno
        const data = JSON.parse(formData);
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
            `;
            alunoItem.onclick = () => abrirDashboardAluno(key);
            listaAlunos.appendChild(alunoItem);
        }
    }
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

// Função para abrir dashboard do aluno
function abrirDashboardAluno(id) {
    const aluno = JSON.parse(localStorage.getItem(id));
    document.getElementById('dashboardNome').textContent = aluno.nome;
    document.getElementById('dataMatricula').textContent = aluno.dataMatricula;
    document.getElementById('cadastroArea').style.display = 'none';
    document.getElementById('loginArea').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';

    // Renderizar gráfico de mensalidades
    renderizarGraficoMensalidades(aluno.dataMatricula);
}

// Função para renderizar gráfico de mensalidades
function renderizarGraficoMensalidades(dataMatricula) {
    const ctx = document.getElementById('graficoMensalidades').getContext('2d');
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const dataMatriculaObj = new Date(dataMatricula.split('/').reverse().join('-'));
    const mesMatricula = dataMatriculaObj.getMonth();
    const anoMatricula = dataMatriculaObj.getFullYear();
    const hoje = new Date();
    const statusMesAtual = calcularStatusMesAtual(dataMatricula);

    const dados = meses.map((mes, index) => {
        if (index < mesMatricula) {
            return null; // Meses antes da matrícula
        } else if (index === mesMatricula) {
            if (statusMesAtual === -1) {
                return '#dc3545'; // Inadimplente
            } else {
                const verde = Math.floor(255 * statusMesAtual);
                return `rgba(40, 167, 69, ${statusMesAtual})`; // Gradiente de verde
            }
        } else {
            return '#ffc107'; // Meses futuros em amarelo
        }
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: '',
                data: dados.map((cor, index) => cor ? 1 : null),
                backgroundColor: dados,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuad'
            }
        }
    });
}

// Função para calcular o status do mês atual
function calcularStatusMesAtual(dataMatricula) {
    const hoje = new Date();
    const dataMatriculaObj = new Date(dataMatricula.split('/').reverse().join('-'));
    const diffTime = Math.abs(hoje - dataMatriculaObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
        return (30 - diffDays) / 30; // Retorna a porcentagem de dias restantes
    } else {
        return -1; // Mês inadimplente
    }
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

// Função para acessar a lista de alunos
function acessarAlunos() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
}

// Função para voltar à área de cadastro
function voltarParaCadastro() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('cadastroArea').style.display = 'block';
    document.getElementById('loginArea').style.display = 'block';
}

// Função para logout
function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('cadastroArea').style.display = 'block';
    document.getElementById('loginArea').style.display = 'block';
    document.getElementById('loginID').value = '';
    alert('Você saiu do sistema.');
}

// Função para logout do administrador
function logoutAdmin() {
    document.getElementById('adminDashboard').style.display = 'none';
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
