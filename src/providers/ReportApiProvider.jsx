import { createContext, useContext, useState } from "react";
import { api } from "../request/Api";
import { SubmitButton } from "../widgets/SubmitButton"

const Context = createContext();

export const ReportApiProvider = ({onSuccess, onError, report, children}) =>{
    const [loading, setLoading] = useState(false);
    
    const submit = (option={}) => {
        setLoading(true);
        onError(null);
        const data = {
            ...report.attributes,
            ...report.attributes.summary.attributes,
            focusAreas: report.attributes.focusAreas.map((fa)=>({
                ...fa.attributes, 
                focusAreaId: fa.id || null
            })),
            reportId: report.id,
            schoolId: school.id || report.schoolId,
            facilitatorId: user.id,
            ...option
        }
        api.report.set(data).then((response)=>{
            onSuccess?.(response.data.data[0]);
        }).catch((error)=>{
            onError(error);
        }).finally(()=>setLoading(false));
    };

    const values = {
        submit,
        loading
    }

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export const SaveReport = ({className, children}) =>{
    const { submit, loading } = useContext(Context);
    return(
        <SubmitButton
            className={className}
            onClick={()=>submit()}
            loading={loading}
        >
            {children}
        </SubmitButton>
    )
}

export const DeleteReport = ({className, children}) =>{
    const { submit, loading } = useContext(Context);
    return(
        <SubmitButton
            bg="danger"
            px="none"
            className={className}
            onClick={()=>submit({hide: true})}
            loading={loading}
            outline
        >
            {children}
        </SubmitButton>
    )
}