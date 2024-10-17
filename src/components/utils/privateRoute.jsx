import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "../../context/context";


export const PrivateRoute = ({children}) => {
    const {authTokens} = useContext(MainContext)

    return authTokens? children : <Navigate to='/login'/>
}

export const AuthRoute = ({children}) => {
    const {authTokens} = useContext(MainContext)

    return authTokens? <Navigate to='/'/>: children
}

export const AdminRoute = ({children}) => {
    const {user} = useContext(MainContext)

    return user?.staff_status? children: <Navigate to='/'/>
}