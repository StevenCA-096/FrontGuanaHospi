import api from "../api/api";
import { getIdUser } from "./getUserId";

export const getPatients = async () => { 
    let data = await api.get('paciente').then(result => result.data);
    //console.log(data)
    return data;
};

export const createPatient = async (patient) => { 
    let data = await api.post(`paciente?idUsuario=${getIdUser()}`,patient).then(result => result.data);
    return data;
};

export const deletePatiente = async (id) => { 
    let data = await api.delete(`paciente/${id}?idUsuario=${getIdUser()}`);
    return data;
};