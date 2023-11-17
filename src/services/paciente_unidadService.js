import api from "../api/api";
import { getIdUser } from "./getUserId";

export const getPatient_Units = async () => { 
    let data = await api.get('PacienteUnidad').then(result => result.data);
    //console.log(data)
    return data;
};

export const getPatient_UnitsById = async (id,state) => { 
    let data = await api.get(`PacienteUnidad/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createPatient_Units = async (Paciente_Unidad) => { 
    let data = await api.post(`PacienteUnidad?idUsuario=${getIdUser()}`,Paciente_Unidad).then(result => result.data);
    return data;
};

export const deletePatient_Units = async (id) => { 
    let data = await api.delete(`PacienteUnidad?idUsuario=${getIdUser()}&idPacienteUnidad=${id}`);
    return data;
};

export const updatePatient_Units = async (Paciente_UnidadEdit) => { 
    console.log(Paciente_UnidadEdit  )
   

    let data = await api.put(`PacienteUnidad?idUsuario=${getIdUser()}`,Paciente_UnidadEdit).then(result => result.data);
    

    return data;
};