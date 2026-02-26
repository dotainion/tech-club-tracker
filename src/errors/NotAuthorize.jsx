import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes";

export const NotAuthorize = () =>{
    const navigate = useNavigate();
    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="card border-0">
                <div className="card-body text-center p-3 p-sm-5">
                    <h4>You are not authorize to access this service.</h4>
                    <p className="text-muted">Contact your administrator for assistance.</p>
                    <button onClick={()=>navigate(routes.signin)} className="btn btn-sm btn-outline-primary rounded-pill px-4">Go home</button>
                </div>
            </div>
        </div>
    )
}