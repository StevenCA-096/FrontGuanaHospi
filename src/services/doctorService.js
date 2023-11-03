import api from "../api/api";

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
    let data = await api.post('doctor',doctor).then(result => result.data);
    return data;
};

export const deleteDoctor = async (id) => { 
    let data = await api.delete(`doctor/${id}`);
    return data;
};

export const updateDoctorS = async (doctorEdit) => { 
   

    let data = await api.put('doctor',doctorEdit).then(result => result.data);
    
    return data;
};