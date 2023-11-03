import api from "../api/api";

export const getSpecialities = async () => { 
    let data = await api.get('Especialidad').then(result => result.data);
    //console.log(data)
    return data;
};
