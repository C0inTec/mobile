import axios from "axios";

export default  async function conection(){
    try{
        const response = await axios.get('https://localhost:8081')
        return response.data
    }catch(error){
        console.log(error.response?.status)
    }
}