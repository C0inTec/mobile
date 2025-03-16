import { Text, View, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { sendMessageToGemini } from '../Google_IA/gemini';
import Icon from 'react-native-vector-icons/Feather';

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
      animationType='slide'
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.chatBox}>
          {/* Header */}
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat com CoinBot</Text>
            <TouchableOpacity onPress={closeModal}>
              <Icon name="x" size={24} color='#00000' />
            </TouchableOpacity>
          </View>

          {/* Área de Mensagens */}
          <ScrollView style={styles.messageArea}>
            {messages.map((msg, index) => (
              <Text
                key={index}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? '#D4A413' : '#F5F5F5',
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
              <Text style={{ alignSelf: 'center', marginVertical: 10, color: '#FF0000' }}>
                {error}
              </Text>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Digite sua mensagem...'
              placeholderTextColor='#AAAAAA'
              value={inputMessage}
              onChangeText={setInputMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name='send' size={20} color='#000000' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
   modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageArea: {
    flex: 1,
    paddingVertical: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: 'black',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#d4a413',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});