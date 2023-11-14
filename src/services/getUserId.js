export function getIdUser(){
let user = JSON.parse(sessionStorage.getItem('user'))
console.log(user)
let userId = user.id_Usuario;
return userId;
}   