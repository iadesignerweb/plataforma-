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
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        carregarListaAlunos();
    } else if (formData) {
        const data = JSON.parse(formData);
        document.getElementById('dashboardNome').textContent = data.nome;
        document.getElementById('dataMatricula').textContent = data.dataMatricula;
        document.getElementById('cadastroArea').style.display = 'none';
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';

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
            listaAlunos.appendChild(alunoItem);
        }
    }
}

// Função para calcular dias restantes
function calcularDiasRestantes(dataMatricula) {
    const dataMat = new Date(dataMatricula.split('/').reverse().join('-'));
    const dataAtual = new Date();
    const diff = dataMat.getTime() - dataAtual.getTime();
    const dias = Math.ceil(diff / (1000 * 3600 * 24));
    return dias;
}

// Função para calcular status do pagamento
function calcularStatusPagamento(dataMatricula) {
    const dataMat = new Date(dataMatricula.split('/').reverse().join('-'));
    const dataAtual = new Date();
    const diff = dataAtual.getTime() - dataMat.getTime();
    const dias = Math.floor(diff / (1000 * 3600 * 24));
    return dias <= 30;
}

// Função para voltar para a página anterior
function voltarParaCadastro() {
    window.history.back();
}
