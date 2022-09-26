/** Import des modules nécessaires */
import axios from 'axios'
import { accountService } from '@/_services/account.service'


const Axios = axios.create({
    baseURL: 'http://localhost:3000'
})

/**
 * Interceptor pour injection token
 */
Axios.interceptors.request.use(request => {

    // Si connecté on ajoute le token dans l'entête
    if (accountService.isLogged()) {
        request.headers.Authorization = 'Bearer ' + accountService.getToken()
    }

    return request
})


export default Axios