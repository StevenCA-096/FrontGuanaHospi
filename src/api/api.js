import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7280/api/',
    headers: {
      Authorization:`Bearer ${localStorage.getItem('bearer')}`,
      
    }
  });
  
  export default api;