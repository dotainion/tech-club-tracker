import { useEffect, useRef, useState } from "react";

export const ErrorDisplay = ({message}) =>{
    const [overflow, setOverflow] = useState(false);

    const timeoutRef = useRef();

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        if(message){
            timeoutRef.current = setTimeout(() => {
                setOverflow(true);
            }, 500);
            return;
        }
        setOverflow(false)
    }, [message]);

    return(
        <div
            className={`${overflow ? 'overflow-auto' : 'text-nowrap overflow-hidden'} ${message ? 'mb-3' : ''}`}
            style={message ? {maxHeight: '100px', minHeight: '24px'} : {}}
        >
            {message && (
                <div className="expandable-x text-danger text-center">{message}</div>
            )}
        </div>
    )
}