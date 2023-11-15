import api from "../api/api";
import { getIdUser } from "./getUserId";

export const getIntervention = async () => { 
    let data = await api.get('Intervencion').then(result => result.data);
    //console.log(data)
    return data;
};

export const getInterventionById = async (id,state) => { 
    let data = await api.get(`Intervencion/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createIntervention = async (Intervention) => { 
    let data = await api.post(`Intervencion?idUsuario=${4}`,Intervention).then(result => result.data);
    return data;
};

export const deleteIntervention = async (id) => { 
    let data = await api.delete(`Intervencion?id=${id}&idUsuario=${getIdUser()}`);
    return data;
};

export const updateInterventionSe = async (Intervention) => { 
    console.log(Intervention)

    let data = await api.put(`Intervencion?idUsuario=${getIdUser()}`,Intervention).then(result => result.data);
    
    return data;
};