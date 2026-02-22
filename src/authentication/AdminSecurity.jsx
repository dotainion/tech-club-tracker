import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"
import { routes } from "../routes/Routes";

export const AdminSecurity = ({children}) =>{
    const { isAdmin, authenticated } = useAuth();

    if(!authenticated) return <Navigate to={routes.signin} />
    if(isAdmin) return children
    
    return <Navigate to={routes.error.authorization} />
}