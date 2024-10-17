import { useContext } from "react"
import MainContext from "../../context/context"
import axios from "axios"
import dayjs from "dayjs";
import {jwtDecode} from "jwt-decode"


let baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
    const {authTokens,setAuthTokens,user,setUser} = useContext(MainContext)
    const authAxios = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    })

    authAxios.interceptors.request.use(async (req)=> {
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        console.log('checking if it is expired!')
        if (!isExpired) return req

        const response = await axios.post(`${baseURL}/users/refresh/`,{
            refresh: authTokens?.refresh
        });
        console.log('Updating the request')

        localStorage.setItem('authTokens',JSON.stringify(response.data))
        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
    })
    return authAxios
}

export default useAxios