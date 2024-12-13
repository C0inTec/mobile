import { Text, View, TouchableOpacity, ScrollView, Modal, TextInput} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styles from './modalChatStyle';

export default function ModalChat(){

    const [modalVisible, setModalVisible] = useState(true); // Estado do modal
    const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
    const [inputMessage, setInputMessage] = useState(''); // Estado do input


    const handleSendMessage = async () => {
      if (inputMessage.trim() === '') return;
  
      // Adiciona a mensagem do usuário ao estado
      const userMessage = { role: 'user', content: inputMessage };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
  
      // Envia para a API do GPT
      try {
        const gptResponse = await sendMessageToGemini(inputMessage);
        const gptMessage = { role: 'assistant', content: gptResponse };
        setMessages((prev) => [...prev, gptMessage]);
      } catch (error) {
        console.error('Erro ao se comunicar com o GPT:', error);
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Desculpe, algo deu errado.' }]);
      }
    };

    
      const closeModal = () => {
        setModalVisible(false); // Fecha o modal
      };    

    return(
        <View>
            {/* Modal de Chat */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.chatBox}>
                    {/* Header do Chat */}
                    <View style={styles.chatHeader}>
                      <Text style={styles.chatTitle}>Chat com GPT</Text>
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
                          {msg.content}
                        </Text>
                      ))}
                    </ScrollView>
        
                    {/* Input para Mensagens */}
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
        </View>
    )
}