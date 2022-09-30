/** Import des modules nécessaires */
import Axios from './caller.service'
import jwt_Decode from "jwt-decode";

// appel service de l'api
// fonction decodage token
let tokenDecode = (token) => {
    let decode = jwt_Decode(token);
    return decode
}

// fonction recuperation de tout les users
let getAllUsers = () => {
    return Axios.get('/api/auth/')
}

// fonction login
let loginUser = (data) => {
    return Axios.post('/api/auth/login', data)
}

// fonction inscription
let signupUser = (data) => {
    return Axios.post('/api/auth/signup', data)
}

// fonction deconnexion
let logout = () => {
    localStorage.removeItem('token')
}

// fonction recuperation du token
let getToken = () => {
    return localStorage.getItem('token')
}

// fonction insertion du token dans le local storage
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

// fonction verification connexion
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

// export des fonction pour les reutiliser dans les pages
export const accountService = {
    loginUser,
    logout,
    saveToken,
    getToken,
    isLogged,
    tokenDecode,
    signupUser,
    getAllUsers
}

