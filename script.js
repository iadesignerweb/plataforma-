const users = [];
let currentUser = null;
const uploadedFiles = [];
const notifications = [];
const questions = [
    { question: 'O que é HTML?', answer: 'Linguagem de Marcação de Hipertexto.' },
    { question: 'O que é CSS?', answer: 'Folhas de Estilo em Cascata.' }
];
const classGroup = [
    { user: 'João', message: 'Alguém pode me ajudar com a lição 3?' },
    { user: 'Maria', message: 'Claro, João! Qual sua dúvida?' }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').style.display = 'block';
    renderQuestionBank();
    renderClassGroup();
});

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (name && email && password) {
        users.push({ name, email, password, role: 'student', blocked: false });
        alert('Registro bem-sucedido! Você já pode fazer login.');
        toggleForms();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function login() {
    const email0
