// Código Original (Mantido Intacto)
function generateUniqueCode() {
    return 'ALUNO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function submitForm() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const descricao = document.getElementById('descricao').value;
    const uniqueCode = generateUniqueCode();
    const formData = {
        nome: nome,
        idade: idade,
        descricao: descricao,
        dataMatricula: new Date().toLocaleDateString('pt-BR')
    };
    localStorage.setItem(uniqueCode, JSON.stringify(formData));
    document.getElementById('popupID').textContent = uniqueCode;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('formCadastro').reset();
    carregarListaAlunos();
    return false;
}

// Novas Funcionalidades (Adicionadas)
function renderizarGraficosAdmin() {
    const ctxFinancas = document.getElementById('graficoFinancas').getContext('2d');
    const ctxDesempenho = document.getElementById('graficoDesempenho').getContext('2d');

    new Chart(ctxFinancas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Receita (R$)',
                data: [5000, 7000, 6000, 8000, 9000, 10000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxDesempenho, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Desempenho Médio',
                data: [65, 70, 75, 80, 85, 90],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderizarGraficosAluno() {
    const ctxDesempenho = document.getElementById('graficoDesempenhoAluno').getContext('2d');

    new Chart(ctxDesempenho, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Desempenho',
                data: [70, 75, 80, 85, 90, 95],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarGraficosAdmin();
});
