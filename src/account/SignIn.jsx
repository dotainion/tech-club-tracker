import { useRef, useState } from "react"
import { BiUser } from "react-icons/bi";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { DelayUi } from "../components/DelayUi";
import { SubmitButton } from "../wedgits/SubmitButton";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { ParseError } from "../utils/ParseError";

export const SignIn = () =>{
    const { user, signIn, signOut, authenticated } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        signIn(emailRef.current.value, passwordRef.current.value).then(()=>{
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
                                <BiUser className="fs-1" />
                            </div>
                            <div className="col-12 mb-3">
                                <h3 className="text-center">Sign In</h3>
                            </div>
                            <ErrorDisplay message={error} />
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <div>
                                    <a onClick={()=>navigate(routes.recovery)} className="link-danger text-decoration-none pointer">Recover password</a>
                                </div>
                                <div className="d-flex align-items-center text-nowrap">
                                    <SubmitButton loading={loading}>Sign In</SubmitButton>
                                </div>
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