// mainStyle.js
import { StyleSheet } from 'react-native';

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: corPrimaria,
    height: '18%',
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
    marginTop: '5%',
    flexDirection: 'row',
    fontSize: 20,
  }
});


export default styles;