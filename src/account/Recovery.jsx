import { Fragment, useRef, useState } from "react"
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { SubmitButton } from "../widgets/SubmitButton";
import { ErrorDisplay } from "../components/ErrorDisplay";

export const Recovery = () =>{
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const emailRef = useRef();

    const submit = (e) =>{
        e.preventDefault();
        setError(null);
        setLoading(true);
        api.auth.recover(emailRef.current.value).then((response)=>{
            setSent(true);
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
                                <h3 className="text-center">Recover Password</h3>
                            </div>
                            {sent ? (
                                <Fragment>
                                    <p>
                                        Recovery email sent. Please check your email for information on how to recover your account.
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <button onClick={()=>setSent(false)} className="btn btn-sm btn-primary">Resend</button>
                                    </div>
                                </Fragment>
                            ):(
                                <Fragment>
                                    <ErrorDisplay message={error} />
                                    <div className="col-12">
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
                                        <p className="small">
                                            Please enter a email address so that information on how to recover your account will be sent to you.
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <div>
                                            <a onClick={()=>navigate(routes.signin)} className="link-primary text-decoration-none pointer">Sign in instead</a>
                                        </div>
                                        <div className="d-flex align-items-center text-nowrap">
                                            <SubmitButton loading={loading}>Send</SubmitButton>
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}