import api from "../api/api";
import { getIdUser } from "./getUserId";
export const getDoctors = async () => { 
    let data = await api.get('doctor').then(result => result.data);
    //console.log(data)
    return data;
};

export const getDoctorById = async (id,state) => { 
    let data = await api.get(`doctor/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createDoctor = async (doctor) => { 
    let data = await api.post(`doctor?idUsuario=${getIdUser()}`,doctor).then(result => result.data);
    return data;
};

export const deleteDoctor = async (id) => { 
    let data = await api.delete(`doctor/${id}`);
    return data;
};

export const updateDoctorS = async (doctorEdit) => { 
    console.log(doctorEdit  )
    let doctorToApi = { 
        codigo:doctorEdit.codigo,
        nombreD:doctorEdit.nombreD,
        apellido1:doctorEdit.apellido1,
        apellido2:doctorEdit.apellido2,
        iD_Especialidad:doctorEdit.iD_Especialidad
    }

    let data = await api.put(`doctor${doctorEdit.id}`,doctorToApi).then(result => result.data);
    

    return data;
};