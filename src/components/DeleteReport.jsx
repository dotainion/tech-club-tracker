import { useEffect, useState } from "react";
import { ParseError } from "../utils/ParseError";
import { api } from "../request/Api";
import { PageHeaderItem } from "./PageHeader";
import { SubmitButton } from "../wedgits/SubmitButton";

export const DeleteReport = ({report, onSavingCallback, onSuccess, children}) =>{
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

    if(children) return(
        <SubmitButton
            onClick={deleteReport}
            className="border-0 py-0"
            loading={loading}
            outline
            bg="danger"
            px="0"
        >
            {children}
        </SubmitButton>
    )

    return(
        <PageHeaderItem
            onClick={deleteReport}
            loading={loading}
            icon="delete"
            title="Delete Report"
        />
    )
}