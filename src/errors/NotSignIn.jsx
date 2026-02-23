import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"

export const NotSignIn = () =>{
    const navigate = useNavigate();

    return(
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center px-3 py-5">
            <div className="text-center card border-0 shadow-sm">
                <div className="card-body p-3 p-sm-5">
                    <h4>You are not authenticated.</h4>
                    <h5 className="text-muted d-flex flex-wrap gap-2">
                        Please sign in to continue
                        <button onClick={()=>navigate(routes.signin)} className="btn btn-sm btn-outline-primary rounded-pill px-4">Okay</button>
                    </h5>
                </div>
            </div>
        </div>
    )
}