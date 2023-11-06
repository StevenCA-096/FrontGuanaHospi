import api from "../api/api";

export const getUnits = async () => { 
    let data = await api.get('Unidad').then(result => result.data);
    //console.log(data)
    return data;
};

export const getUnitById = async (id,state) => { 
    let data = await api.get(`Unidad/${id}`).then(result => result.data);
    state(data)
    console.log(data)
    return data;
};

export const createUnit = async (Units) => { 
    let data = await api.post('Unidad',Units).then(result => result.data);
    return data;
};

export const deleteUnits = async (id) => { 
    let data = await api.delete(`Unidad/${id}`);
    return data;
};

export const updateUnitS = async (UnitsEdit) => { 
    let unitEditToApi = {
        codigo: UnitsEdit.codigo,
        nombre: UnitsEdit.nombre,
        planta: UnitsEdit.planta,
        iD_Doctor: UnitsEdit.iD_Doctor
    }
    let data = await api.put(`Unidad/${UnitsEdit.id}`,unitEditToApi).then(result => result.data);
    
    return data;
};