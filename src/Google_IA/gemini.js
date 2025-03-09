import axios from 'axios';

const API_KEY = 'AIzaSyCsNRlmxIYPEJzgbGHKcIbC0f1CoQPTP1k';

export async function sendMessageToGemini(userMessage, conversation = []) {
  // Cria o chat atualizado com a mensagem do usuário
  const updatedChat = [
    ...conversation,
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      { contents: updatedChat }
    );

    const modelResponse =
      response.data?.candidates[0]?.content?.parts[0].text || '';

    return modelResponse; // Retorna a resposta do modelo
  } catch (error) {
    console.error('Erro ao se comunicar com o Gemini:', error.response?.status, error.message);
    throw new Error('Falha ao obter resposta do GPT.');
  }
}