// script.js

// Dados simulados para alunos
const students = [
    { id: 1, name: 'João Silva', blocked: false, notifications: [] },
    { id: 2, name: 'Maria Souza', blocked: false, notifications: [] },
    { id: 3, name: 'Carlos Pereira', blocked: true, notifications: [] }
];

// Dados simulados para arquivos
let files = [
    { id: 1, name: 'Apostila de Matemática.pdf' },
    { id: 2, name: 'Exercícios de Física.docx' }
];

// Elementos do DOM
const loginContainer = document.getElementById('login-container');
const adminDashboard = document.getElementById('admin-dashboard');
const studentDashboard = document.getElementById('student-dashboard');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login-form');
const studentList = document.getElementById('student-list');
const fileUploadInput = document.getElementById('file-upload');
const fileList = document.getElementById('file-list');
const notificationInput = document.getElementById('notification-input');
const notificationList = document.getElementById('notification-list');
const studentNotificationList = document.getElementById('student-notification-list');
const libraryList = document.getElementById('library-list');
const questionBank = document.getElementById('question-bank');
const groupList = document.getElementById('group-list');
const adminChartCtx = document.getElementById('admin-chart').getContext('2d');
const studentChartCtx = document.getElementById('student-chart').getContext('2d');

// Função para exibir o dashboard do administrador
function showAdminDashboard() {
    loginContainer.style.display = 'none';
    adminDashboard.style.display = 'block';
    studentDashboard.style.display = 'none';
    renderStudentList();
    renderFileList();
    renderAdminChart();
}

// Função para exibir o dashboard do aluno
function showStudentDashboard(student) {
    loginContainer.style.display = 'none';
    adminDashboard.style.display = 'none';
    studentDashboard.style.display = 'block';
    renderStudentNotifications(student);
    renderLibraryList();
    renderQuestionBank();
    renderGroupList();
    renderStudentChart();
}

// Função para renderizar a lista de alunos no dashboard do administrador
function renderStudentList() {
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name} - ${student.blocked ? 'Bloqueado' : 'Ativo'}`;
        const toggleButton = document.createElement('button');
        toggleButton.textContent = student.blocked ? 'Desbloquear' : 'Bloquear';
        toggleButton.addEventListener('click', () => toggleStudentStatus(student));
        li.appendChild(toggleButton);
        studentList.appendChild(li);
    });
}

// Função para alternar o status de bloqueio de um aluno
function toggleStudentStatus(student) {
    student.blocked = !student.blocked;
    renderStudentList();
}

// Função para renderizar a lista de arquivos no dashboard do administrador
function renderFileList() {
    fileList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => removeFile(file));
        li.appendChild(removeButton);
        fileList.appendChild(li);
    });
}

// Função para remover um arquivo
function removeFile(file) {
    files = files.filter(f => f.id !== file.id);
    renderFileList();
}

// Função para enviar uma notificação para todos os alunos
function sendNotification() {
    const message = notificationInput.value.trim();
    if (message) {
        students.forEach(student => {
            student.notifications.push(message);
        });
        renderNotificationList(message);
        notificationInput.value = '';
    }
}

// Função para renderizar a lista de notificações no dashboard do administrador
function renderNotificationList(message) {
    const li = document.createElement('li');
    li.textContent = message;
    notificationList.appendChild(li);
}

// Função para renderizar as notificações no dashboard do aluno
function renderStudentNotifications(student) {
    studentNotificationList.innerHTML = '';
    student.notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        studentNotificationList.appendChild(li);
    });
}

// Função para renderizar a lista de arquivos na biblioteca do aluno
function renderLibraryList() {
    libraryList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        libraryList.appendChild(li);
    });
}

// Função para renderizar o banco de questões
function renderQuestionBank() {
    // Exemplo de questões simuladas
    const questions = [
        'Qual é a fórmula de Bhaskara?',
        'Explique a teoria da relatividade.',
        'Quais são as leis de Newton?'
    ];
    questionBank.innerHTML = '';
    questions.forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        questionBank.appendChild(li);
    });
}

// Função para renderizar a lista de grupos da turma
function renderGroupList() {
    // Exemplo de grupos simulados
    const groups = [
        'Grupo de Estudos de Matemática',
        'Grupo de Física Aplicada',
        'Discussões sobre Literatura'
    ];
    groupList.innerHTML = '';
    groups.forEach(group => {
        const li = document.createElement('li');
        li.textContent = group;
        groupList.appendChild(li);
    });
}

// Função para renderizar o gráfico no dashboard do administrador
function renderAdminChart() {
    new Chart(adminChartCtx, {
        type: 'bar',
        data: {
            labels: ['Alunos Ativos', 'Alunos Bloqueados'],
            datasets: [{
                label: 'Quantidade de Alunos',
                data: [
                    students.filter(student => !student.blocked).length,
                    students.filter(student => student.blocked).length
                ],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Função para renderizar o gráfico no dashboard do aluno
function renderStudentChart() {
    new Chart(studentChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Progresso', 'Restante'],
            datasets: [{
                data: [70, 30], // Exemplo de progresso: 70% concluído
0
