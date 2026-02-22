import { MdPassword } from "react-icons/md"
import { PageHeader } from "../components/PageHeader"
import { PageHeaderButton } from "../components/PageHeaderButton"
import { routes } from "../routes/Routes"
import { SubmitButton } from "../wedgits/SubmitButton"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../request/Api"
import { ErrorDisplay } from "../components/ErrorDisplay"
import { ParseError } from "../utils/ParseError"
import { Spinner } from "../components/Spinner"
import { Page } from "../layout/Page"

export const PasswordRecovery = () =>{
    const [user, setUser] = useState(null);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const submit = (e) =>{
        e.preventDefault();
        setError(null);
        setSending(true);
        api.auth.recover(user.attributes.email).then((response)=>{
            setSent(true);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSending(false));
    }

    useEffect(()=>{
        api.user.user(params.userId).then((response)=>{
            setUser(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return(
        <Page>
            <PageHeader
                title="User Password Recovery"
                subTitle="Send email with information to user on how to recover they account."
            >
                <PageHeaderButton onClick={() => navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card shadow-sm border rounded-4">
                            <form onSubmit={submit} className="card-body p-4">
                                <div className="col-12 mb-3 text-center">
                                    <MdPassword className="fs-1" />
                                </div>
                                <div className="col-12 mb-3 text-center">
                                    <h3 className="mb-0">Password Recovery</h3>
                                    <strong>{user.attributes.fullName}</strong>
                                </div>
                                {sent ? (
                                    <>
                                        <p>
                                            Recovery email sent. Please advice the <strong>{user.attributes.fullName}</strong> to check their email which will contain information on how to recover their account.
                                        </p>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={()=>setSent(false)} className="btn btn-sm btn-primary">Resend</button>
                                        </div>
                                    </>
                                ):(
                                    <>
                                        <ErrorDisplay message={error} />
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Email</label>
                                            <div className="form-control">{user.attributes.email}</div>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <p className="small">
                                                Clicking the button will send a email with information to the user on how to recover their account.
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-end mt-4">
                                            <SubmitButton loading={sending}>Send</SubmitButton>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Page>
    )
}