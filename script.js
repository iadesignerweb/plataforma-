// Array com dados dos usuários cadastrados
let usuarios = [
    { id: "12345", senha: "1316", nome: "Aluno Exemplo" }
];

// Função de login
function login() {
    const loginID = document.getElementById("loginID").value;
    const senha = document.getElementById("senha").value;
    
    // Verificar se o usuário existe com o ID e senha
    let usuarioEncontrado = usuarios.find(usuario => usuario.id === loginID && usuario.senha === senha);

    // Se o usuário for encontrado
    if (usuarioEncontrado) {
        alert("Login bem-sucedido!");
        document.getElementById("dashboardNome").innerText = usuarioEncontrado.nome;
        mostrarDashboard();
    } else {
        alert("ID ou senha incorretos!");
    }
}

// Função para exibir o painel do aluno
function mostrarDashboard() {
    document.getElementById("loginArea").style.display = "none"; // Esconder o login
    document.getElementById("dashboard").style.display = "block"; // Mostrar o dashboard
}

// Função para voltar para o cadastro
function voltarParaCadastro() {
    document.getElementById("dashboard").style.display = "none"; // Esconder o dashboard
    document.getElementById("cadastroArea").style.display = "block"; // Mostrar a área de cadastro
}

// Função para fazer logout
function logout() {
    document.getElementById("dashboard").style.display = "none"; // Esconder o dashboard
    document.getElementById("loginArea").style.display = "block"; // Mostrar a área de login
}

// Função de mostrar pop-up de preços
function mostrarPopupPrecos() {
    document.getElementById("popupPrecos").style.display = "block";
}

// Função para fechar o pop-up de preços
function fecharPopupPrecos() {
    document.getElementById("popupPrecos").style.display = "none";
}
