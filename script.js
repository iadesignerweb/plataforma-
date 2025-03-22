/* Área administrativa */
.admin-dashboard {
    padding: 20px;
    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.aluno-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin-bottom: 10px;
}

.aluno-item .controles {
    display: flex;
    gap: 10px;
}

.btn-admin {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-admin.bloquear {
    background-color: #e74c3c;
    color: white;
}

.btn-admin.desbloquear {
    background-color: #27ae60;
    color: white;
}

.btn-admin.excluir {
    background-color: #2c3e50;
    color: white;
}

.upload-area {
    margin-top: 20px;
    padding: 15px;
    background: #ecf0f1;
    border-radius: 10px;
    display: flex;
    gap: 15px;
    align-items: center;
}

#alunosSelecionados {
    min-width: 200px;
    padding: 5px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
}

/* Dashboard do aluno - Notificações */
.dashboard-content {
    position: relative;
}

.notificacao-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    color: #e74c3c;
    cursor: pointer;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
