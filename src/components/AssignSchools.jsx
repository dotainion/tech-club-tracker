import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { Spinner } from "./Spinner";

const Context = createContext();

export const AssignSchools = ({preLoadData, apiSchoolMethod, onLoadMap, onAssigedMap}) =>{
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const onReInitialize = (link) => {
        setSchools((prev)=>prev.map((ps)=>onAssigedMap(ps, link) ? link : ps));
    };

    const values = {
        preLoadData,
        apiSchoolMethod,
        onReInitialize
    }

    useEffect(()=>{
        api.school.list().then((response)=>{
            setSchools(response.data.data.map((school)=>({
                ...school, assigned: !!onLoadMap(school)
            })));
        }).catch(()=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Context.Provider value={values}>
            {loading ? <Spinner show inline /> : (
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-0">🏫 Schools</h5>
                        <span className="text-muted">
                            {schools.filter(s => s.assigned).length} selected
                        </span>
                    </div>

                    <div className="list-group">
                        {schools.map((school)=>(
                            <AssignSchoolRow
                                school={school}
                                key={school.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Context.Provider>
    )
}

const AssignSchoolRow = ({school}) =>{
    const { preLoadData, onReInitialize, apiSchoolMethod } = useContext(Context);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleSchool = (e) => {
        setError(null);
        setLoading(true);
        const data = {
            schoolId: school.id,
            ...preLoadData,
            hide: !e.target.checked
        }
        api.school[apiSchoolMethod](data).then((response)=>{
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
                    checked={school.assigned}
                    onChange={toggleSchool}
                />
                <span className="ms-2">{school.attributes.name}</span>
            </div>
            <div className="position-relative">
                {loading ? (
                    <Spinner show inline sm withoutMessage />
                ):(
                    <>
                        {school.assigned && (
                            <span className="badge bg-success">Assigned</span>
                        )}
                    </>
                )}
            </div>
        </label>
    )
}
