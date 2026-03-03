import { Spinner } from "../components/Spinner";
import { useAuth } from "../providers/AuthProvider"

export const AuthLoading = ({children}) =>{
    const { loading } = useAuth();

    if(loading) return(
        <Spinner show />
    )
    return children;
}