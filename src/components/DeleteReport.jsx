import { useEffect, useState } from "react";
import { SubmitButton } from "../wedgits/SubmitButton"
import { ParseError } from "../utils/ParseError";
import { api } from "../request/Api";

export const DeleteReport = ({className, report, onSavingCallback, onSuccess, children}) =>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteReport = (e) =>{
        e.stopPropagation();
        setLoading(true);
        const data = {
            ...report.attributes,
            ...report.attributes.summary.attributes,
            focusAreas: report.attributes.focusAreas.map((fa)=>({
                ...fa.attributes, 
                focusAreaId: fa.id || null,
            })),
            reportId: report.id,
            hide: true
        }
        api.report.set(data).then((response)=>{
            onSuccess?.(response.data.data[0]);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    }

    useEffect(()=>{
        onSavingCallback?.(loading);
    }, [loading]);

    return(
        <SubmitButton
            onClick={deleteReport}
            loading={loading}
            outline
            px="none"
            bg="danger"
            className={className}
        >
            {children}
        </SubmitButton>
    )
}