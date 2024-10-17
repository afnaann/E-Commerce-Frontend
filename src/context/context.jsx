import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../Redux/features/cart/cartThunk";



const MainContext = createContext()

export const ContextProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens')? jwtDecode(authTokens.access): null)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            dispatch(fetchCart(user.user_id))
        }
    },[])
    return (
        <MainContext.Provider value={{
            authTokens,
            user,
            setUser,
            setAuthTokens
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext