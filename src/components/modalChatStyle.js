// mainStyle.js
import { StyleSheet } from 'react-native';

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

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


export default styles;