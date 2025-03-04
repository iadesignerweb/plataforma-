// Funções para manipulação do menu hamburger
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
}

// Funções para login, logout, upload de arquivos, etc.
function login() {
    const loginID = document.getElementById('loginID').value.trim();
    const formData = localStorage.getItem(loginID);

    if (loginID === '1316') {
        // Login do administrador
        document.getElementById('loginArea').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
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

// Slideshow automático
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlides() {
    slides.forEach((slide, index) => {
        slide.style.opacity = index === slideIndex ? '1' : '0';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(mostrarSlides, 5000); // Troca de slide a cada 5 segundos
}

mostrarSlides();

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginArea').style.display = 'block';
}

// Funções para upload de arquivos e notificações
function abrirUpload() {
    document.getElementById('uploadArea').style.display = 'block';
}

function enviarArquivos() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length > 0) {
        alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
        fileInput.value = '';
    }
}

// Funções para pop-ups
function fecharPopup(id) {
    document.getElementById(id).style.display = 'none';
}

// Função para alternar o menu hamburger
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
}

// Função para exibir seções do menu
function showSection(sectionId) {
    const sections = ['quem-somos', 'precos', 'politica'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });
}

// Função para abrir o pop-up de preços
function abrirPrecos() {
    document.getElementById('popupPrecos').style.display = 'block';
}

// Função para fechar pop-ups
function fecharPopup(id) {
    document.getElementById(id).style.display = 'none';
}

// Função para abrir notificações
function abrirNotificacoes() {
    const notificacoesLista = document.getElementById('notificacoesLista');
    notificacoesLista.innerHTML = '<p>Nenhuma notificação nova.</p>';
    document.getElementById('popupNotificacoes').style.display = 'block';
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

// Função para voltar ao login
function voltarParaLogin() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginArea').style.display = 'block';
}

// Função para carregar arquivos na área de downloads
function carregarArquivos() {
    const arquivos = [
        { nome: 'Aula 1 - Introdução.pdf', link: '#' },
        { nome: 'Exercícios de Matemática.docx', link: '#' },
    ];
    const arquivosDiv = document.getElementById('arquivos');
    arquivosDiv.innerHTML = arquivos.map(arquivo => `
        <div class="arquivo-item">
            <span>${arquivo.nome}</span>
            <button onclick="window.open('${arquivo.link}', '_blank')">Baixar</button>
        </div>
    `).join('');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarArquivos();
});
