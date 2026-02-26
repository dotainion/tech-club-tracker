import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"

export const NotSignIn = () =>{
    const navigate = useNavigate();

    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center px-3 py-5">
            <div className="card border-0">
                <div className="card-body text-center p-3 p-sm-5">
                    <h4>You are not authenticated.</h4>
                    <p className="text-muted">Please sign in to continue</p>
                    <button onClick={()=>navigate(routes.signin)} className="btn btn-sm btn-outline-primary rounded-pill px-4">Okay</button>
                </div>
            </div>
        </div>
    )
}