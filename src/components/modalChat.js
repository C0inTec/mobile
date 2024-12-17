import { Text, View, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { sendMessageToGemini } from '../api/openIA';
import Icon from 'react-native-vector-icons/Feather';
import styles from './modalChatStyle';

export default function ModalChat({ modalVisible, setModalVisible }) {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [inputMessage, setInputMessage] = useState(''); // Estado do input
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Atualiza mensagens com a mensagem do usuário
    const updatedChat = [
      ...messages,
      { role: 'user', parts: [{ text: inputMessage }] },
    ];
    setMessages(updatedChat);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      // Chamada à API
      const gptResponse = await sendMessageToGemini(inputMessage, updatedChat);

      // Atualiza com a resposta da IA
      const updatedChatWithResponse = [
        ...updatedChat,
        { role: 'assistant', parts: [{ text: gptResponse }] },
      ];
      setMessages(updatedChatWithResponse);
    } catch (error) {
      console.error('Erro ao se comunicar com o GPT:', error);
      setError('Desculpe, ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Usa a função passada como prop
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.chatBox}>
          {/* Header */}
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat com CoinBot</Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Área de Mensagens */}
          <ScrollView style={styles.messageArea}>
            {messages.map((msg, index) => (
              <Text
                key={index}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#d4a413' : '#f5f5f5',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                  maxWidth: '70%',
                }}
              >
                {msg.parts[0].text}
              </Text>
            ))}
            {loading && (
              <Text style={{ alignSelf: 'center', marginVertical: 10 }}>
                Carregando...
              </Text>
            )}
            {error && (
              <Text style={{ alignSelf: 'center', marginVertical: 10, color: 'red' }}>
                {error}
              </Text>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#aaa"
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}