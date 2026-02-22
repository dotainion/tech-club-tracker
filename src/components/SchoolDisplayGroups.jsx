import { useEffect, useState } from "react"
import { api } from "../request/Api";
import { Spinner } from "./Spinner";
import { NoResultDisplay } from "./NoResultDisplay";
import { AddButton } from "../wedgits/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";

export const SchoolDisplayGroups = ({ school, children }) =>{
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!school) return;
        api.group.list({schoolId: school.id}).then((response)=>{
            setGroups(response.data.data);
        }).catch(()=>{
            
        }).finally(()=>setLoading(false));
    }, []);

    return(
        <div className="position-relative">
            {loading ? <Spinner show inline /> : (
                <>
                    <hr></hr>
                    <div className="row">
                        <AddButton
                            onClick={()=>navigate(routes.admin().concat().assignToGroup(school.id))}
                            minHeight="77px"
                            smVisible
                            className="p-1"
                            col="col-12 col-sm-4"
                        >
                            <small className="text-primary">add</small>
                            <small className="text-muted">/</small>
                            <small className="text-danger">remove</small>
                        </AddButton>
                        {
                            groups.length ?
                            groups.map((group)=>(
                                <div className="col-12 col-sm-4 p-1" key={group.id}>
                                    <div className="d-inline-block bg-light w-100 h-100 rounded-3 px-3 py-2" title={group.attributes.description}>
                                        <h6 className="mb-0">{group.attributes.name}</h6>
                                        <div className="small text-muted text-truncate">{group.attributes.description}</div>
                                        <div className="d-flex align-items-center gap-2 small text-muted">
                                            <span className="d-flex align-items-center">
                                                <span className="border border-dark border-2 rounded-circle"></span>
                                            </span>
                                            <span>{group.attributes.students.length} Students</span>
                                            <span className="d-flex align-items-center">
                                                <span className="border border-dark border-2 rounded-circle"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )):
                            <NoResultDisplay
                                mt='0'
                                icon="group"
                                title="No linked group"
                                description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                            >
                                <div className="my-3">
                                    <button onClick={()=>navigate(routes.admin().concat().assignToGroup(school.id))} className="btn btn-sm btn-outline-dark px-4 rounded-pill">
                                        + Add Group
                                    </button>
                                </div>
                            </NoResultDisplay>
                        }
                    </div>
                    <hr></hr>
                    {children}
                </>
            )}
        </div>
    )
}