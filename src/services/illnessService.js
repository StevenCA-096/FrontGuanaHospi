import api from "../api/api";

export const getillness = async () => { 
    let data = await api.get('Enfermedad').then(result => result.data);
    //console.log(data)
    return data;
};

export const getillnessById = async (id,state) => { 
    let data = await api.get(`Enfermedad/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createillness = async (illness) => { 
    let data = await api.post('Enfermedad',illness).then(result => result.data);
    return data;
};

export const deleteillness = async (id) => { 
    let data = await api.delete(`Enfermedad/${id}`);
    return data;
};

export const updateillness = async (illness) => { 
    console.log(illness)
    const id = illness.id;
    let illnessEdit = {
        name: illness.name,
    }

    let data = await api.put(`Enfermedad/${id}`,illnessEdit).then(result => result.data);
    
    return data;
};