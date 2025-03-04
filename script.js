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
