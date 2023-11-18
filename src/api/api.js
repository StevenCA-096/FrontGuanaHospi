import axios from "axios";

const api = axios.create({
    baseURL: 'https://t259rltw-7280.use2.devtunnels.ms/api/',
    headers: {
      Authorization:`Bearer ${sessionStorage.getItem('bearer')}`,
      
    }
  });
  
  export default api;