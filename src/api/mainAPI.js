import axios from "axios";

// const url_base = "https://3093-2804-29b8-50ae-c9ad-1cfb-59b1-1ff1-22b7.ngrok-free.app";

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