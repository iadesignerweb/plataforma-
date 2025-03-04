// Função para alternar a visibilidade do menu lateral
function toggleMenu() {
    const menuLateral = document.getElementById("menuLateral");
    menuLateral.classList.toggle("mostrar");
}

// Função para mostrar o pop-up de preços
function mostrarPopupPrecos() {
    const popupPrecos = document.getElementById("popupPrecos");
    popupPrecos.style.display = "block";
}

// Função para fechar o pop-up de preços
function fecharPopupPrecos() {
    const popupPrecos = document.getElementById("popupPrecos");
    popupPrecos.style.display = "none";
}

// Função para enviar o formulário de cadastro
function submitForm() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const descricao = document.getElementById("descricao").value;

    if (nome && idade && descricao) {
        alert("Cadastro realizado com sucesso!");
        return true; // Permite o envio do formulário
    } else {
        alert("Preencha todos os campos.");
        return false; // Impede o envio do formulário
    }
}

// Função de login
function login() {
    const loginID = document.getElementById("loginID").value;
    if (loginID) {
        alert("Bem-vindo, " + loginID);
        // Redirecionar para o dashboard ou outro local
    } else {
        alert("Digite seu ID de acesso.");
    }
}

// Função para voltar à área de cadastro
function voltarParaCadastro() {
    document.getElementById("cadastroArea").style.display = "block";
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
}

// Função para logout
function logout() {
    alert("Você saiu do sistema.");
    // Redirecionar para a página inicial ou login
    document.getElementById("loginArea").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

// Função para abrir a página de downloads
function abrirDownloads() {
    document.getElementById("downloads").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

// Função para voltar ao dashboard
function voltarDashboard() {
    document.getElementById("downloads").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

// Função para enviar mensagem no chat
function enviarMensagem() {
    const mensagemInput = document.getElementById("mensagemInput").value;
    if (mensagemInput) {
        const mensagensChat = document.getElementById("mensagensChat");
        const novaMensagem = document.createElement("div");
        novaMensagem.classList.add("mensagem");
        novaMensagem.textContent = mensagemInput;
        mensagensChat.appendChild(novaMensagem);
        document.getElementById("mensagemInput").value = ""; // Limpar campo de mensagem
    }
}

// Função para exibir o ID do aluno no pop-up
function mostrarPopupID(id) {
    document.getElementById("popupID").textContent = id;
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Função para copiar o ID
function copiarID() {
    const popupID = document.getElementById("popupID");
    const range = document.createRange();
    range.selectNode(popupID);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert("ID copiado!");
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Função para gerar o gráfico de mensalidades com Chart.js
window.onload = function() {
    var ctx = document.getElementById("graficoMensalidades").getContext("2d");
    var graficoMensalidades = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], // Exemplo de meses
            datasets: [{
                label: 'Mensalidades',
                data: [100, 200, 150, 180, 220], // Exemplo de valores de mensalidade
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
};
