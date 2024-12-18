import { StyleSheet } from 'react-native';

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mantido para o fundo transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', // Cabeçalho com cor secundária
    padding: 16,
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Texto branco
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    backgroundColor: corTexto, // Fundo branco para o conteúdo do modal
    padding: 16,
    width: '90%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: corPreta, // Cor preta para os textos
  },
  input: {
    borderWidth: 1,
    borderColor: corBorda, // Borda cinza
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: corPreta, // Texto preto
    backgroundColor: '#f9f9f9', // Fundo cinza claro
  },
  errorText: {
    color: 'red', // Mensagem de erro em vermelho
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: corPrimaria, // Botão com a cor primária
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc', // Botão desativado com cinza
  },
  saveButtonText: {
    color: corTexto, // Texto branco
    fontWeight: 'bold',
  },
  iconEdit: {
    position: 'absolute',
    bottom: 0, // Alinha ao fundo da imagem
    left: 15, // Alinha à esquerda da imagem
    backgroundColor: corPrimaria, // Opcional, adiciona contraste ao ícone
    borderRadius: 15, // Torna o fundo arredondado
    padding: 5, // Adiciona um pequeno espaçamento interno
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#c0c0c0', // Borda cinza
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9', // Fundo cinza claro
  },
  picker: {
    height: 40,
    color: 'black', // Cor do texto
  },
  
});

export default styles;
