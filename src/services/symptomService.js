import api from "../api/api";

export const getSymptom = async () => { 
    let data = await api.get('Sintoma').then(result => result.data);
    //console.log(data)
    return data;
};

export const getSymptomById = async (id,state) => { 
    let data = await api.get(`Sintoma/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createSymptom = async (Symptom) => { 
    let data = await api.post('Sintoma',Symptom).then(result => result.data);
    return data;
};

export const deleteSymptom = async (id) => { 
    let data = await api.delete(`Sintoma/${id}`);
    return data;
};

export const updateSymptom = async (Symptom) => { 
    console.log(Symptom)
    const id = Symptom.id;
    let SymptomEdit = {
        name: Symptom.name,
    }

    let data = await api.put(`Sintoma/${id}`,SymptomEdit).then(result => result.data);
    
    return data;
};