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

// Função para obter resposta simulada da IA (substituir futuramente pela integração real)
async function getChatGPTResponse(userMessage) {
  try {
    const apiKey = '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'; // Substitua pela sua API Key válida
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao obter resposta da API:', error);
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

  // Obter resposta da IA (simulada ou real)
  const aiResponse = await getChatGPTResponse(userMessage);
  addMessage('ai', aiResponse);

  inputField.value = ''; // Limpa o campo de entrada
});function addMessage(sender, message) {
  const chatBody = document.getElementById('chatBody');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-response');
  
  const messageContent = document.createElement('p');
  messageContent.textContent = message;
  
  messageDiv.appendChild(messageContent);
  chatBody.appendChild(messageDiv);

  // Scroll automático para a última mensagem
  chatBody.scrollTop = chatBody.scrollHeight;
}


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