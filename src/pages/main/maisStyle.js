// mainStyle.js
import { StyleSheet } from 'react-native';

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corTexto,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    backgroundColor: corPrimaria,
    height: '25%',
    width: '100%',
  },
  headerDiv1: {
    marginHorizontal: '8%',
    marginTop: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDiv2: {
    marginHorizontal: '8%',
    marginTop: '10%',
    flexDirection: 'row',
    fontSize: 20,
  },
  mainDiv: {
    backgroundColor: corSecundaria,
    minHeight: '100%',
    width: '100%',
    height: '100%',
  },
  contentBox: {
    backgroundColor: corSecundaria,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  gastosComponent: {
    backgroundColor: corPreta,
    width: '100%',
    height: '10%',
    borderColor: corBorda,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  gastosChart: {
    backgroundColor: corPreta,
    width: '100%',
    height: '35%',
    borderColor: corBorda,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  contaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  contaText: {
    color: corTexto,
    fontSize: 17,
    fontWeight: 'bold',
  },
  valorText: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: corTexto,
    fontWeight: 'bold',
    marginTop: 5,
  },
  fab: {
    width: 60,
    height: 60,
    backgroundColor: corPrimaria, 
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (iOS)
    shadowOpacity: 0.25, // Opacidade da sombra (iOS)
    shadowRadius: 3.5, // Raio da sombra (iOS)
  },
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


export default styles;