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
            <div className="text-center card">
                <div className="card-body p-5">
                    <h4>Oooops</h4>
                    <h5 className="text-muted">
                        Your page not found
                        <button onClick={to} className="btn btn-sm btn-outline-primary rounded-pill px-4 ms-2">Go home</button>
                    </h5>
                </div>
            </div>
        </div>
    )
}