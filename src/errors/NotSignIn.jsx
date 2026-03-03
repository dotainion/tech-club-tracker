import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { Spinner } from "../components/Spinner";
import { LuLockKeyhole } from "react-icons/lu";
import { BsUnlock } from "react-icons/bs";

export const NotSignIn = () =>{
    const { user, clearCredentials, authenticated, signOut } = useAuth();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const useDifferentAccount = () =>{
        signOut().then(()=>{
            navigate(routes.autoHome());
        }).catch(()=>{

        });
    }

    useEffect(()=>{
        api.auth.session().then((response)=>{

        }).catch((error)=>{
            clearCredentials();
        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return(
        <Spinner show />
    )

    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center px-3 py-5">
            <div className="card border-0">
                <div className="card-body text-center p-3 p-sm-5">
                    {authenticated ? (
                        <>
                            <BsUnlock className="display-5 mb-3" />
                            <h4>You are currently signed in.</h4>
                            <p className="text-muted">What action would you like to take?</p>
                            <div className="d-flex flex-column gap-2">
                                <button
                                    onClick={useDifferentAccount}
                                    className="btn btn-sm btn-outline-secondary"
                                >Sign in with a different account</button>
                                <button
                                    onClick={()=>navigate(routes.auth().concat().home())}
                                    className="btn btn-sm btn-outline-primary"
                                >Continue as {user.attributes.fullName}</button>
                            </div>
                        </>
                    ):(
                        <>
                            <LuLockKeyhole className="display-5 mb-3" />
                            <h4>You are not authenticated.</h4>
                            <p className="text-muted">Please sign in to continue</p>
                            <button
                                onClick={()=>navigate(routes.signin)}
                                className="btn btn-sm btn-outline-primary rounded-pill px-4"
                            >Sign In</button>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}