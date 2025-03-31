let chatHistory = []; // Armazena mensagens do chat
let drawing = false; // Estado do desenho
let ctx; // Contexto do canvas de desenho
let currentColor = '#000000'; // Cor padrão para desenho
let myChart; // Variável para armazenar a instância do gráfico

// Inicializa o canvas de desenho
function initDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
}

// Inicia o desenho
function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Para o desenho
function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Desenha no canvas
function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Limpa o desenho
function clearDrawing() {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

// Muda a cor do desenho
function changeColor(color) {
    currentColor = color;
}

// Salva o desenho
function saveDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const link = document.createElement('a');
    link.download = 'meu_desenho.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Desenha o gráfico
function drawChart() {
    const dataInput = document.getElementById('chartData').value;
    const chartType = document.getElementById('chartType').value;

    const dataValues = dataInput.split(',').map(Number);
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // Destrói o gráfico anterior se existir
    }

    // Verifica se os dados são válidos
    if (dataValues.length === 0 || dataValues.some(isNaN)) {
        alert("Por favor, insira dados válidos para o gráfico.");
        return;
    }

    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: dataValues.map((_, index) => `Label ${index + 1}`),
            datasets: [{
                label: 'Meu Gráfico',
                data: dataValues,
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
}

// Salva o gráfico
function saveChart() {
    const canvas = document.getElementById('myChart');
    const link = document.createElement('a');
    link.download = 'meu_grafico.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Normaliza a entrada
function normalizeInput(message) {
    const corrections = {
        "olá": ["ola", "olá", "ola", "olaa", "oláá", "ola!"],
        "oi": ["oi", "oii", "oiii", "oii", "oi!"],
        "moeda": ["moeda", "móeda", "moêda", "móéda", "moéda", "móeda"],
        "gráfico": ["grafico", "graficos", "grafico", "grafic", "graafico"],
        "desenho": ["desenho", "dsenho", "desenhoo", "deseho", "desenho!"],
        "ajuda": ["ajuda", "ajdu", "ajydas", "ajuda!"],
        "quem é você": ["quem é você", "quem vc é", "quem é tu", "quem é você?"],
        "criador": ["criador", "criadorr", "criadore", "meu criador"],
        "grafos": ["grafos", "graficos", "grafos"],
        "criar": ["criar", "criar!", "faço", "faça"],
    };

    let normalizedMessage = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    Object.keys(corrections).forEach(key => {
        corrections[key].forEach(variante => {
            normalizedMessage = normalizedMessage.replace(variante, key);
        });
    });

    return normalizedMessage;
}

// Responde ao chat
function respondToChat(message) {
    const normalizedMessage = normalizeInput(message);
    let response = "Desculpe, não entendi sua pergunta. Pode reformular ou perguntar sobre gráficos, desenhos ou conversão de moedas?";

    if (normalizedMessage.includes("oi") || normalizedMessage.includes("olá")) {
        response = "Olá! Como posso ajudar você hoje?";
    } else if (normalizedMessage.includes("quem é você") || normalizedMessage.includes("quem vc é")) {
        response = "Eu sou um assistente inteligente criado por Jmax para ajudá-lo a trabalhar com gráficos, desenhos e conversão de moedas.";
    } else if (normalizedMessage.includes("gráfico") || normalizedMessage.includes("grafos")) {
        response = "Para criar um gráfico, insira os dados e escolha o tipo desejado, como gráfico de linha, barra, pizza, entre outros.";
    } else if (normalizedMessage.includes("ajuda")) {
        response = "Claro! Pergunte-me sobre gráficos, desenhos, ou conversão de moedas.";
    } else if (normalizedMessage.includes("desenho")) {
        response = "Para criar um desenho, basta usar a seção de desenho. Aproveite as ferramentas disponíveis!";
    }

    chatHistory.push(`Bot: ${response}`);
    updateChatMessages();
}

// Atualiza as mensagens do chat
function updateChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = chatHistory.join('<br>');
}

// Envia a mensagem
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (message) {
        chatHistory.push(`Jmax: ${message}`);
        chatInput.value = '';
        updateChatMessages();
        respondToChat(message);
    } else {
        alert("Por favor, digite uma mensagem antes de enviar.");
    }
}

// Inicializa o desenho
initDrawing();