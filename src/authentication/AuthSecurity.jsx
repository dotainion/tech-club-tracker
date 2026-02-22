import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"
import { routes } from "../routes/Routes";

export const AuthSecurity = ({children}) =>{
    const { authenticated } = useAuth();

    if(authenticated){
        return children
    }

    return <Navigate to={routes.signin} />
}