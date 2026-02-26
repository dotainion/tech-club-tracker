import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"
import { useAuth } from "../providers/AuthProvider";

export const Error404 = () =>{
    const { authenticated } = useAuth();

    const navigate = useNavigate();

    const to = () =>{
        if(authenticated){
            if(routes.type().isAdmin()) return navigate(routes.admin().concat().admin());
            return navigate(routes.auth().concat().home());
        }
        navigate(routes.signin);
    }

    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0">
                <div className="card-body text-center p-5">
                    <h4>Oooops</h4>
                    <p className="text-muted">Your page not found</p>
                    <button onClick={to} className="btn btn-sm btn-outline-primary rounded-pill px-4">Go home</button>
                </div>
            </div>
        </div>
    )
}