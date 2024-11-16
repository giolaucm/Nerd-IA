document.getElementById('toggle-gov-header').addEventListener('click', function () {
  const govHeader = document.querySelector('.header-gov');
  if (govHeader.style.display === 'none' || govHeader.style.display === '') {
    govHeader.style.display = 'flex';
    this.innerHTML = '<img src="img/angle.small-up.png" alt="Expandir" width="20" height="20">';
  } else {
    govHeader.style.display = 'none';
    this.innerHTML = '<img src="img/angle.small-down.png" alt="Recolher" width="20" height="20">';
  }
});

document.getElementById('sendButton').addEventListener('click', async function() {
  const inputField = document.getElementById('userInput');
  const userMessage = inputField.value.trim();
  
  if (userMessage === '') return;

  addMessage('user', userMessage);
  const response = await getChatGPTResponse(userMessage);
  addMessage('ai', response);
  
  inputField.value = '';
});

function addMessage(sender, message) {
  const chatBody = document.getElementById('chatBody');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-response');
  
  const messageContent = document.createElement('p');
  messageContent.textContent = message;
  messageDiv.appendChild(messageContent);
  
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function getChatGPTResponse(userMessage) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Substituir por variável segura
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return 'Erro ao obter resposta. Tente novamente.';
  }
}


document.getElementById('toggleSidebar').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden'); // Adiciona ou remove a classe 'hidden'
});
