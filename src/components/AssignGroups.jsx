import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { Spinner } from "./Spinner";

const Context = createContext();

export const AssignGroups = ({preLoadData, apiGroupMethod, onLoadMap, onAssigedMap}) =>{
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const onReInitialize = (link) => {
        setGroups((prev)=>prev.map((ps)=>onAssigedMap(ps, link) ? link : ps));
    };

    const values = {
        preLoadData,
        apiGroupMethod,
        onReInitialize
    }

    useEffect(()=>{
        api.group.list().then((response)=>{
            setGroups(response.data.data.map((group)=>({
                ...group, assigned: !!onLoadMap(group)
            })));
        }).catch(()=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Context.Provider value={values}>
            {loading ? <Spinner show inline /> : (
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-0">🗂️ Groups</h5>
                        <span className="text-muted">
                            {groups.filter(s => s.assigned).length} selected
                        </span>
                    </div>

                    <div className="list-group">
                        {groups.map((group)=>(
                            <AssignGroupRow
                                group={group}
                                key={group.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Context.Provider>
    )
}

const AssignGroupRow = ({group}) =>{
    const { preLoadData, onReInitialize, apiGroupMethod } = useContext(Context);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleSchool = (e) => {
        setError(null);
        setLoading(true);
        const data = {
            groupId: group.id,
            ...preLoadData,
            hide: !e.target.checked
        }
        api.group[apiGroupMethod](data).then((response)=>{
            const link = response.data.data[0];
            onReInitialize({
                ...link,
                assigned: !link.attributes.hide
            });
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    };

    return(
        <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center pointer">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={group.assigned}
                    onChange={toggleSchool}
                />
                <span className="ms-2">{group.attributes.name}</span>
            </div>
            <div className="position-relative">
                {loading ? (
                    <Spinner show inline sm withoutMessage />
                ):(
                    <>
                        {group.assigned && (
                            <span className="badge bg-success">Assigned</span>
                        )}
                    </>
                )}
            </div>
        </label>
    )
}
