import axios from "axios";

export async function conectionUser() {
    try {
        const response = await axios.get('http://172.29.8.176:8082/user');
        console.log('Conectado com sucesso!');
        return response.data;
    } catch (error) {
        console.log(error.response?.status)
        console.error('Erro na conexão:', error.response?.status || error.message);
    }
}

export async function conectionWallet() {
    try {
        const response = await axios.get('http://172.29.8.176:8082/wallet');
        console.log('Conectado com sucesso!');
        return response.data;
    } catch (error) {
        console.log(error.response?.status)
        console.error('Erro na conexão:', error.response?.status || error.message);
    }
}