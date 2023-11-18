import api from "../api/api";

export const getReportByName = async (reportname) => { 
    let data = await api.get(`DataWarehouse/${reportname}`).then(result => result.data);
    console.log(data)
    return data;
};

