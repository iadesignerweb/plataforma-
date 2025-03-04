<!DOCTYPE html>  <html lang="pt-br">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Plataforma de Cursos</title>  
    <link rel="stylesheet" href="styles.css">  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">  
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>  
</head>  
<body>  
    <div class="container">  
        <!-- Menu Hamburger -->  
        <div class="menu-hamburger" onclick="toggleMenu()">  
            <i class="fas fa-bars"></i>  
        </div>  
        <div class="menu-lateral" id="menuLateral">  
            <a href="#" onclick="mostrarPopupPrecos()">Preços</a>  
            <a href="#">Quem Somos</a>  
            <a href="#">Política de Privacidade</a>  
        </div>  <!-- Cabeçalho -->  
    <header>  
        <h1>Plataforma de Cursos</h1>  
        <p>Seu portal para o conhecimento</p>  
    </header>  

    <!-- Conteúdo Principal -->  
    <div class="main-content">  
        <!-- Área de Cadastro -->  
        <div class="form-container" id="cadastroArea">  
            <h2>Cadastro de Aluno</h2>  
            <form id="formCadastro" onsubmit="return submitForm()">  
                <input type="text" id="nome" placeholder="Digite seu nome" required>  
                <input type="number" id="idade" placeholder="Digite sua idade" required>  
                <textarea id="descricao" placeholder="Descreva-se brevemente..." required></textarea>  
                <button type="submit">Cadastrar</button>  
            </form>  
        </div>  

        <!-- Área de Login -->  
        <div class="form-container" id="loginArea">  
            <h2>Login do Aluno</h2>  
            <input type="text" id="loginID" placeholder="Digite seu ID de acesso">  
            <button onclick="login()">Entrar</button>  
        </div>  

        <!-- Dashboard do Aluno -->  
        <div class="dashboard" id="dashboard">  
            <!-- Menu Superior -->  
            <div class="menu-superior">  
                <a href="#" onclick="voltarParaCadastro()">Área de Cadastro</a>  
                <a href="#" onclick="logout()">Logout</a>  
                <i class="fas fa-bell" onclick="abrirDownloads()"></i>  
            </div>  

            <!-- Conteúdo do Dashboard -->  
            <div class="dashboard-content">  
                <h1>Bem-vindo, <span id="dashboardNome"></span>!</h1>  
                <div class="dashboard-options">  
                    <div class="option" onclick="acessarCurso('Física')">  
                        <i class="fas fa-atom"></i>  
                        <p>Lições de Física</p>  
                    </div>  
                    <div class="option" onclick="acessarCurso('Matemática')">  
                        <i class="fas fa-calculator"></i>  
                        <p>Lições de Matemática</p>  
                    </div>  
                    <div class="option" onclick="acessarBancoQuestoes()">  
                        <i class="fas fa-book"></i>  
                        <p>Banco de Questões</p>  
                    </div>  
                    <div class="option" onclick="acessarBiblioteca()">  
                        <i class="fas fa-book-open"></i>  
                        <p>Biblioteca de Aulas</p>  
                    </div>  
                    <div class="option" onclick="acessarGrupoTurma()">  
                        <i class="fas fa-users"></i>  
                        <p>Grupo da Turma</p>  
                    </div>  
                    <div class="option" onclick="acessarAlunos()">  
                        <i class="fas fa-user-graduate"></i>  
                        <p>Alunos</p>  
                    </div>  
                </div>  

                <!-- Painel Gráfico -->  
                <div class="painel-grafico">  
                    <h2>Painel do Aluno</h2>  
                    <div class="status-pagamento">  
                        <span>Data da Matrícula: <strong id="dataMatricula">01/05/2025</strong></span>  
                        <span>Status: <span class="ativo">● Ativo</span></span>  
                    </div>  
                    <div class="grafico-mensalidades">  
                        <canvas id="graficoMensalidades"></canvas>  
                    </div>  
                    <div class="gerar-boleto">  
                        <button onclick="gerarBoleto()">Gerar Boleto</button>  
                    </div>  
                </div>  

                <!-- Vídeo Incorporado -->  
                <div class="video-container">  
                    <iframe src="https://www.youtube.com/embed/PGw2LhOak2s?si=AmUj5Ak_xFFHMyw_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
                </div>  
            </div>  
        </div>  

        <!-- Dashboard do Administrador -->  
        <div class="admin-dashboard" id="adminDashboard">  
            <h1>Painel do Administrador</h1>  
            <button onclick="logoutAdmin()">Logout</button>  
            <input type="file" id="uploadFile" multiple onchange="uploadFiles()">  
            <div class="lista-alunos" id="listaAlunos">  
                <!-- Lista de alunos será preenchida dinamicamente -->  
            </div>  
            <div class="graficos-admin">  
                <canvas id="graficoAlunos"></canvas>  
                <canvas id="graficoStatusPagamento"></canvas>  
                <canvas id="graficoIdadeAlunos"></canvas>  
            </div>  
        </div>  

        <!-- Página de Downloads -->  
        <div class="downloads" id="downloads">  
            <h1>Downloads</h1>  
            <div id="listaDownloads"></div>  
            <button onclick="voltarDashboard()">Voltar</button>  
        </div>  

        <!-- Chat -->  
        <div class="chat" id="chat">  
            <h1>Chat</h1>  
            <div id="mensagensChat"></div>  
            <input type="text" id="mensagemInput" placeholder="Digite sua mensagem">  
            <button onclick="enviarMensagem()">Enviar</button>  
            <button onclick="voltarDashboard()">Voltar</button>  
        </div>  
    </div>  
</div>  

<!-- Pop-up para Copiar ID -->  
<div class="popup" id="popup">  
    <p>Seu ID de acesso: <span id="popupID"></span></p>  
    <p style="color: #dc3545; font-size: 0.9rem;">Guarde seu ID em local seguro!</p>  
    <button onclick="copiarID()">Copiar ID</button>  
    <button onclick="fecharPopup()">Fechar</button>  
</div>  

<!-- Pop-up de Preços -->  
<div class="popup-precos" id="popupPrecos">  
    <p>Valor do Plano Mensal: R$ 299,00</p>  
    <p>Para Adquirir a Plataforma, Entre em Contato</p>  
    <button onclick="fecharPopupPrecos()">Fechar</button>  
</div>  

<!-- Rodapé -->  
<footer>  
    <p>@Copyright 2025 - Plínio Studio</p>  
    <a href="https://wa.me/5587999786261" target="_blank"><i class="fab fa-whatsapp"></i></a>  
</footer>  

<script src="script.js"></script>

</body>  
    </html>
