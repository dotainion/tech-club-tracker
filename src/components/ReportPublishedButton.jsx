import { useEffect, useRef, useState } from "react";
import { Switch } from "../widgets/Switch"
import { ParseError } from "../utils/ParseError";
import { api } from "../request/Api";
import { Spinner } from "./Spinner";
import { ErrorDisplay } from "./ErrorDisplay";

export const ReportPublishedButton = ({report, onSuccess, allowToggle}) =>{
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const switchRef = useRef();
    const timeoutRef = useRef();

    const submit = () => {
        setLoading(true);
        setError(null);
        const data = {
            ...report.attributes,
            ...report.attributes.summary.attributes,
            reportId: report.id,
            focusAreas: [],
            published: switchRef.current.checked
        }
        api.report.set(data).then((response)=>{
            setIsSuccess(true);
            onSuccess?.(response.data.data[0]);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    }

    const undo = () =>{
        const checked = !switchRef.current.checked;
        switchRef.current.checked = checked;
        submit();
    }

    useEffect(()=>{
        if(!isSuccess) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsSuccess(false);
        }, 10000);
    }, [isSuccess]);

    if(report.attributes.published && !allowToggle){
        return <label className="badge bg-primary small">Published</label>;
    }

    return(
        <Switch ref={switchRef} onChange={submit} checked={report.attributes.published}>
            <div className="position-relative">
                {loading && <Spinner show inline sm withoutMessage />}
                <span className={`small ${loading ? 'opacity-25' : ''}`}>
                    {report.attributes.published ? 'Publish' : 'Draft'}
                </span>
            </div>
            {error && (
                <div className="position-relative">
                    <div className="position-absolute top-0 end-0 rounded-2 p-3 mt-3 bg-danger bg-opacity-10 text-danger" style={{zIndex: 1000}}>
                        <ErrorDisplay message={error} />
                    </div>
                </div>
            )}
            {isSuccess && (
                <div className="position-relative">
                    <div className="position-absolute top-0 end-0 mt-3" style={{zIndex: 1000}}>
                        <span className="bg-white">
                            <button onClick={undo} className="btn btn-sm btn-outline-primary py-0">Undo</button>
                        </span>
                    </div>
                </div>
            )}
        </Switch>
    )
}