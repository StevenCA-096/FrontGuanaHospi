import api from "../api/api";

export const trylogin = async (credentials) => { 
    console.log(credentials)
    let data = await api.get(`Authentication/Login?email=${credentials.email}&password=${credentials.password}`).then(result => result.data);
    //console.log(data)
    return data;
};

export const getLoginInfo = async (credentials) => { 
    let data = await api.get(`Authentication/getLoginInfo?email=${credentials.email}&password=${credentials.password}`).then(result => result.data);  
    console.log(data)
    return data;
};