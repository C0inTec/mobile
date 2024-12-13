import axios from 'axios';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// GPT
const API_KEY = 'x';
const BASE_URL = 'https://api.openai.com/v1/chat/completions';

// Gemini
const genAI = new GoogleGenerativeAI("AIzaSyCsNRlmxIYPEJzgbGHKcIbC0f1CoQPTP1k");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function sendMessageToGPT(message) {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: 'gpt-3.5-turbo', // ou 'gpt-3.5-turbo', dependendo do que você quer usar
        messages: [{ role: 'user', content: message }],
        max_tokens: 150, // Limite de palavras para a resposta
        temperature: 0.7, // Criatividade na resposta
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content; // Retorna a resposta do GPT
  } catch (error) {
    console.error('Erro ao comunicar com o GPT:', {status: error.response?.status, data: error.response?.data, message: error.response?.message});
    return 'Desculpe, algo deu errado. Tente novamente mais tarde.';
  }
}


export async function sendMessageToGemini(message) {
    try {
    const genAI = new GoogleGenerativeAI("AIzaSyCsNRlmxIYPEJzgbGHKcIbC0f1CoQPTP1k").then(console.log("Teste"));
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).then(console.log('Conectado'));
      console.log("tentando - ", message)  
      const result = await model.generateContent({
        prompt: message, // Certifique-se de que "prompt" é o parâmetro esperado pela API
      });
      console.log('resutado - ', result.response?.text); // Log para depuração
      return result.response?.text || 'Resposta vazia da API Gemini'; // Resposta padrão caso esteja vazia
    } catch (error) {
      console.error('Erro ao comunicar com o Gemini:', error.status?.status, error.status?.data, error.status?.message);
      return 'Desculpe, algo deu errado ao usar o Gemini. Tente novamente mais tarde.';
    }
  }
  