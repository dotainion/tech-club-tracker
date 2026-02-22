import { useEffect, useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { Page } from "../layout/Page";

const COUNT = 5;
export const Logout = () =>{
    const { signOut } = useAuth();

    const [countDown, setCountDown] = useState(COUNT);

    const navigate = useNavigate();

    const timeoutRef = useRef();
    const intervalRef = useRef();

    const clear = () =>{
        clearTimeout(timeoutRef.current);
        clearTimeout(intervalRef.current);
    }

    const onCancel = () =>{
        clear();
        navigate(-1);
    }

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        clearTimeout(intervalRef.current);

        timeoutRef.current = setTimeout(() => {
            signOut();
            navigate(routes.signin);
        }, COUNT * 1000);

        timeoutRef.current = setInterval(() => {
            setCountDown(count=>count-1);
        }, 1000);

        return () => clear();
    }, []);

    return(
        <Page>
            <div className="d-flex align-items-center justify-content-center p-3">
                <div className="card rounded-4">
                    <div className="card-body p-4">
                        <p className="fw-semibold">
                            Your account is now being logged out in 
                            <span className="text-primary ms-2">({countDown}).</span>
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <button onClick={onCancel} className="btn btn-sm btn-outline-dark rounded-pill px-4">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}