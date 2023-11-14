import api from "../api/api";

export const getPatients = async () => { 
    let data = await api.get('paciente').then(result => result.data);
    //console.log(data)
    return data;
};