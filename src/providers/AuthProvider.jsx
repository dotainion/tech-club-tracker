import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { token } from "../utils/Token";
import { Spinner } from "../components/Spinner";

const Context = createContext();

export const useAuth = ()=>useContext(Context);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const authenticationHandler = (authUser) =>{
        if(authUser && authUser.attributes.token){
            token.set(authUser.attributes.token);
            api.reInitializeAuthorizationHeader();
        }
        setUser(authUser);
        setAuthenticated(!!authUser);
        setIsAdmin(authUser ? authUser.attributes.role.attributes.isAdmin : false);
        return authUser;
    }

    const signIn = async(email, password) =>{
        return api.auth.signIn(email, password).then((response)=>{
            return authenticationHandler(response.data.data[0]);
        });
    }

    const signOut = () =>{
        api.auth.logout().then((response)=>{
            token.unset();
            api.unsetAuthorizationHeader();
            authenticationHandler(null);
        }).catch((error)=>{

        });
    }

    const values = {
        user,
        authenticated,
        isAdmin,
        signIn,
        signOut,
    }

    useEffect(()=>{
        api.auth.session().then((response)=>{
            authenticationHandler(response.data.data[0]);
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <Context.Provider value={values}>
            {loading ? <Spinner show inline /> : children}
        </Context.Provider>
    )
}