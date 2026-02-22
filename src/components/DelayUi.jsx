import { useEffect, useRef, useState } from "react";

export const DelayUi = ({show, miliseconds, children}) =>{
    const [promise, setPromise] = useState(false);

    const timeoutRef = useRef();

    useEffect(()=>{
        if(!show){
            clearTimeout(timeoutRef.current);
            return;
        }
        timeoutRef.current = setTimeout(() => {
            setPromise(true);
        }, miliseconds || 500);
        return ()=> clearTimeout(timeoutRef.current);
    }, [show]);

    if(!show || !promise) return null;
    return children
}