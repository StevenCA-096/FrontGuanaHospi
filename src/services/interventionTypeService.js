import api from "../api/api";

export const getInterventionTypes = async () => { 
    let data = await api.get('TipoIntervencion').then(result => result.data);
    //console.log(data)
    return data;
};