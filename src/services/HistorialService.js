import api from "../api/api";

export const getHistorial = async () => { 
    let data = await api.get('HistorialAcciones').then(result => result.data);
    //console.log(data)
    return data;
};
