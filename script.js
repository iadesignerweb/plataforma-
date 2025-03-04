document.addEventListener("DOMContentLoaded", function () {
    carregarListaAlunos();
});

function login() {
    let id = document.getElementById("loginID").value;

    if (id === "admin") {
        document.getElementById("adminDashboard").style.display = "block";
        document.getElementById("loginArea").style.display = "none";
    } else {
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("loginArea").style.display = "none";
        document.getElementById("dashboardNome").innerText = id;
    }
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginArea").style.display = "block";
}

function logoutAdmin() {
    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("loginArea").style.display = "block";
}

function carregarListaAlunos() {
    let lista = document.getElementById("listaAlunos");
    lista.innerHTML = "<p>Aluno: João Silva <button onclick='verAluno(\"João Silva\")'>Ver Dashboard</button></p>";
}

function verAluno(nome) {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("dashboardNome").innerText = nome;
}

function uploadFiles() {
    let files = document.getElementById("uploadFile").files;
    let lista = document.getElementById("arquivosEnviados");

    for (let file of files) {
        let item = document.createElement("p");
        item.innerHTML = `${file.name} <button onclick="removerArquivo(this)">Remover</button>`;
        lista.appendChild(item);
    }
}

function removerArquivo(element) {
    element.parentNode.remove();
}

function abrirDownloads() {
    let lista = document.getElementById("listaDownloads");
    lista.innerHTML = "<p>Arquivo enviado pelo Administrador: <a href='#'>Baixar</a></p>";
}

// Gráficos
let ctx1 = document.getElementById("graficoAlunos").getContext("2d");
new Chart(ctx1, {
    type: "bar",
    data: { labels: ["João", "Maria"], datasets: [{ label: "Progresso", data: [80, 90] }] },
});

let ctx2 = document.getElementById("graficoFinanceiro").getContext("2d");
new Chart(ctx2, {
    type: "line",
    data: { labels: ["Jan", "Fev"], datasets: [{ label: "Receitas", data: [5000, 6000] }] },
});
