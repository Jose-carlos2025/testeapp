let chatHistory = []; // Armazena mensagens do chat
let drawing = false; // Estado do desenho
let ctx; // Contexto do canvas de desenho
let currentColor = '#000000'; // Cor padrão para desenho
let myChart; // Variável para armazenar a instância do gráfico

// Função para normalizar a entrada
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

// Função de resumo de texto
function summarizeText(text) {
    const sentences = text.split('.');
    const totalSentences = sentences.length;
    const middleSentence = Math.floor(totalSentences / 2);
    
    return sentences.slice(0, middleSentence).join('.') + '... ' + sentences.slice(middleSentence).join('.').substring(0, 100) + '...';
}

// Função para raciocinar e dar respostas mais completas
function reasoning(message) {
    const reasoningResponses = {
        "qual é o sentido da vida?": "O sentido da vida é uma questão filosófica que muitos ainda tentam responder. Alguns acreditam que o sentido está na busca de felicidade, outros em fazer a diferença para o bem do mundo.",
        "o que você pensa sobre inteligência artificial?": "Inteligência artificial é uma tecnologia fascinante. Ela tem o potencial de transformar diversas áreas da vida humana, mas também é importante refletir sobre suas implicações éticas e o impacto no emprego e privacidade.",
        "o que é a realidade?": "A realidade é um conceito filosófico e científico que tem sido debatido por séculos. Para alguns, é o mundo físico ao nosso redor, mas para outros, a realidade pode ser subjetiva, sendo determinada pelas nossas percepções e experiências."
    };
    
    return reasoningResponses[message.toLowerCase()] || "Essa é uma boa pergunta! Vamos explorar mais sobre o que você quer saber.";
}

// Função para responder ao chat
function respondToChat(message) {
    const normalizedMessage = normalizeInput(message);
    let response = "Desculpe, não entendi sua pergunta. Pode reformular ou perguntar sobre gráficos, desenhos ou conversão de moedas?";

    if (normalizedMessage.includes("resumir texto")) {
        response = "Claro, envie o texto e eu farei um resumo para você.";
    } else if (normalizedMessage.length > 100) {
        const summarizedText = summarizeText(message);
        response = `Aqui está seu resumo: ${summarizedText}`;
    } else if (normalizedMessage.includes("oi") || normalizedMessage.includes("olá")) {
        response = "Olá! Como posso ajudar você hoje? Podemos falar sobre gráficos, desenhos ou conversão de moedas.";
    } else if (normalizedMessage.includes("quem é você") || normalizedMessage.includes("quem vc é")) {
        response = "Eu sou um assistente inteligente criado por Jmax para ajudá-lo a trabalhar com gráficos, desenhos e conversão de moedas.";
    } else if (normalizedMessage.includes("gráfico") || normalizedMessage.includes("grafos")) {
        response = "Para criar um gráfico, insira os dados e escolha o tipo desejado, como gráfico de linha, barra, pizza, entre outros.";
    } else if (normalizedMessage.includes("ajuda")) {
        response = "Claro! Pergunte-me sobre gráficos, desenhos, ou conversão de moedas.";
    } else if (normalizedMessage.includes("desenho")) {
        response = "Para criar um desenho, basta usar a seção de desenho. Aproveite as ferramentas disponíveis!";
    } else if (normalizedMessage.includes("resumo")) {
        response = "Você quer que eu resuma algo para você? Me envie o texto!";
    } else if (normalizedMessage.includes("raciocinar") || normalizedMessage.includes("sentido da vida") || normalizedMessage.includes("realidade")) {
        response = reasoning(normalizedMessage);
    } else {
        response = "Desculpe, não consegui entender a pergunta. Você pode tentar algo diferente ou perguntar sobre gráficos ou moedas?";
    }

    chatHistory.push(`Bot: ${response}`);
    updateChatMessages();
}

// Função de atualização das mensagens do chat
function updateChatMessages() {
    let chatBox = document.getElementById("chatMessages");
    chatBox.innerHTML = chatHistory.join('<br>');
}

// Função para enviar mensagem
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

// Função para mostrar perguntas frequentes
function showFAQ() {
    const faq = `
    Perguntas Frequentes:
    1. O que é a calculadora Jmax?
    2. Como posso criar um gráfico?
    3. Como posso desenhar?
    4. O que é inteligência artificial?
    5. Como funciona a conversão de moedas?
    6. Quem é o criador da calculadora?
    7. Qual é o sentido da vida?
    8. O que você pensa sobre a realidade?
    9. Como posso salvar meu desenho?
    10. Quais tipos de gráficos posso criar?
    11. Como posso limpar a tela de desenho?
    12. O que é uma função matemática?
    13. Como posso calcular a raiz quadrada?
    14. O que é um gráfico de pizza?
    15. Como posso mudar a cor do meu desenho?
    16. O que é a função "eval" na JavaScript?
    17. Como posso converter moedas?
    18. O que é um gráfico de barras?
    19. Como posso usar a calculadora para operações científicas?
    20. Como posso entrar em contato com o suporte?
    `;
    alert(faq);
}

// Funções da calculadora
function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value); // Cuidado com eval em produção
    } catch (error) {
        alert("Erro na expressão!");
    }
}

// Funções para o gráfico
function drawChart() {
    const dataInput = document.getElementById('chartData').value;
    const chartType = document.getElementById('chartType').value;

    const dataValues = dataInput.split(',').map(Number);
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // Destrói o gráfico anterior se existir
    }

    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: dataValues.map((_, index) => `Label ${index + 1}`), // Labels genéricas
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

// Funções para o desenho
function initDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
}

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(event) {
    if (!drawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function clearDrawing() {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function changeColor(color) {
    currentColor = color;
}

// Função para pesquisa no Google
function searchGoogle() {
    const query = document.getElementById('display').value;
    if (query) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank'); // Abre a pesquisa em uma nova aba
    } else {
        alert("Por favor, insira uma consulta para pesquisar.");
    }
}

// Função para abrir o chat
function openChat() {
    const chatSection = document.querySelector('.chat-section');
    chatSection.style.display = chatSection.style.display === 'none' ? 'block' : 'none';
}

// Inicializa o desenho
initDrawing();