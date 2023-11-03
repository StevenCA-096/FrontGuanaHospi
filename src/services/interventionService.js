import api from "../api/api";

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
    let data = await api.post('Intervencion',Intervention).then(result => result.data);
    return data;
};

export const deleteIntervention = async (id) => { 
    let data = await api.delete(`Intervencion/${id}`);
    return data;
};

export const updateIntervention = async (Intervention) => { 
    console.log(Intervention)
    const id = Intervention.id;
    let InterventionEdit = {
        name: Intervention.name,
    }

    let data = await api.put(`Intervencion/${id}`,InterventionEdit).then(result => result.data);
    
    return data;
};