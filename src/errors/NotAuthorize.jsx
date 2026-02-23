import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes";

export const NotAuthorize = () =>{
    const navigate = useNavigate();
    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center py-5">
            <div className="text-center card border rounded-4">
                <div className="card-body p-5">
                    <h4>You are not authorize to access this service.</h4>
                    <h5 className="text-muted">
                        Contact your administrator for assistance.
                        <button onClick={()=>navigate(routes.signin)} className="btn btn-sm btn-outline-primary rounded-pill px-4 ms-2">Go home</button>
                    </h5>
                </div>
            </div>
        </div>
    )
}