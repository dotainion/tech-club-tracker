import { useRef, useState } from "react"
import { BiUser } from "react-icons/bi";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { DelayUi } from "../components/DelayUi";
import { SubmitButton } from "../widgets/SubmitButton";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { ParseError } from "../utils/ParseError";
import { api } from "../request/Api";
import { MdPassword } from "react-icons/md";

export const UpdateByToken = () =>{
    const { user, signIn, signOut, authenticated } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const passwordRef = useRef();
    const conformPasswordRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        if(passwordRef.current.value !== conformPasswordRef.current.value){
            return setError('Passwdord mismatch.');
        }
        setLoading(true);
        setError(null);
        const data = {
            id: params.userId,
            password: passwordRef.current.value,
            refreshToken: params.token
        }
        api.auth.updateByRefereshToken(data).then(()=>{
            navigate(routes.auth().concat().home());
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    }

    return(
        <div className="container py-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm border rounded-4">
                        <form onSubmit={submit} className="card-body p-4">
                            <div className="col-12 mb-3 text-center">
                                <MdPassword className="fs-1" />
                            </div>
                            <div className="col-12 mb-3">
                                <h3 className="text-center">Change Password</h3>
                            </div>
                            <ErrorDisplay message={error} />
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">New Password</label>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">Confirm Password</label>
                                <input
                                    ref={conformPasswordRef}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                                <SubmitButton loading={loading}>Change</SubmitButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {user && (
                <DelayUi show={authenticated} miliseconds={500}>
                    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25">
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                            <div className="bg-white rounded-4 shadow-sm p-4 overflow-auto">
                                <h4>Hi {user.attributes.fullName}</h4>
                                <p className="mb-0">You are currently signed in</p>
                                <p>You can continue or sign in with a different account</p>
                                <div className="d-flex flex-column gap-2">
                                    <button onClick={signOut} className="btn btn-sm btn-outline-secondary">Sign in with a different account</button>
                                    <button onClick={()=>navigate(routes.auth().concat().home())} className="btn btn-sm btn-outline-primary">Continue as {user.attributes.fullName}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DelayUi>
            )}
        </div>
    )
}