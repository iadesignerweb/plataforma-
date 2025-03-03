// Função para cadastrar aluno
function submitForm() {
    let nome = document.getElementById("nome").value;
    document.getElementById("dashboardNome").innerText = nome;
    
    // Esconder formulário e mostrar dashboard
    document.getElementById("cadastroArea").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    
    return false; // Evita o recarregamento da página
}

// Função para login
function login() {
    let loginID = document.getElementById("loginID").value;
    if (loginID) {
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("loginArea").style.display = "none";
    }
}

// Função para voltar ao cadastro
function voltarParaCadastro() {
    document.getElementById("cadastroArea").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

// Função para logout
function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginArea").style.display = "block";
}