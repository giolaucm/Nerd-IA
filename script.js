// Integração com API do ChatGPT e otimização do código do chat

// API Key (Substitua pela sua chave de API real)
const apiKey = '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';

// Função para adicionar mensagens ao chat
function addMessage(sender, message) {
  const chatBody = document.getElementById('chatBody');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-response');

  const messageContent = document.createElement('p');
  messageContent.textContent = message;

  messageDiv.appendChild(messageContent);
  chatBody.appendChild(messageDiv);

  // Rolagem automática para a última mensagem
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Função para obter resposta do ChatGPT
async function getChatGPTResponse(userMessage) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    if (response.ok) {
      return data.choices[0].message.content;
    } else {
      console.error('Erro na resposta da API:', data);
      return 'Erro ao obter resposta da IA. Tente novamente mais tarde.';
    }
  } catch (error) {
    console.error('Erro ao se conectar com a API:', error);
    return 'Erro ao se conectar com o servidor. Tente novamente.';
  }
}

// Adiciona evento ao botão de envio de mensagem no chat
document.getElementById('sendButton').addEventListener('click', async function () {
  const inputField = document.getElementById('userInput');
  const userMessage = inputField.value.trim();

  if (!userMessage) return;

  // Adiciona mensagem do usuário ao chat
  addMessage('user', userMessage);

  // Obter resposta da IA
  const aiResponse = await getChatGPTResponse(userMessage);
  addMessage('ai', aiResponse);

  inputField.value = ''; // Limpa o campo de entrada
});

// Função para alternar a visibilidade da barra lateral e ajustar o chat
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const sidebar = document.querySelector('.sidebar');
const chatWindow = document.querySelector('.chat-window');

toggleSidebarBtn.addEventListener('click', () => {
  // Alterna a classe "hidden" na barra lateral
  sidebar.classList.toggle('hidden');

  // Ajusta o chat para ocupar o espaço total
  chatWindow.classList.toggle('expanded');
});

// Função para gerenciar perguntas e respostas limitadas a três interações
let questionCount = 0;

document.getElementById('sendButton').addEventListener('click', async function () {
  if (questionCount >= 3) {
    addMessage('ai', 'Você atingiu o limite de três perguntas. Obrigado por utilizar nosso assistente!');
    return;
  }

  const inputField = document.getElementById('userInput');
  const userMessage = inputField.value.trim();

  if (!userMessage) return;

  // Adiciona mensagem do usuário ao chat
  addMessage('user', userMessage);

  // Obter resposta da IA
  const aiResponse = await getChatGPTResponse(userMessage);
  addMessage('ai', aiResponse);

  inputField.value = ''; // Limpa o campo de entrada

  questionCount++; // Incrementa o contador de perguntas
});
