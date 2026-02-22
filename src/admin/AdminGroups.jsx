import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { api } from "../request/Api";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { AddButton } from "../wedgits/AddButton";
import { Page } from "../layout/Page";

export const AdminGroups = () =>{
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=>{
        api.group.list().then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Groups" subTitle="View groups and asign groups to schools">
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().group())}>
                    + New Group
                </PageHeaderButton>
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            {loading ? <Spinner show inline/> : (
                <>
                    {groups.length ? (
                        <div className="row">
                            <AddButton
                                onClick={(e)=>navigate(routes.admin().concat().group())}
                                className="p-2"
                            />
                            {groups.map((group)=>(
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={group.id}>
                                    <div onClick={()=>navigate(routes.admin().concat().group(group.id))} className="card as-btn border h-100">
                                        <div className="card-body d-flex flex-column">
                                            <h6 className="fw-bold">{group.attributes.name}</h6>
                                            <div className="small text-muted mb-2">{group.attributes.description}</div>
                                            <div className="d-flex flex-wrap gap-2 text-muted small">
                                                <span>{group.attributes.students.length} Students</span>
                                                <span className="d-flex align-items-center">
                                                    <span className="border border-dark border-2 rounded-circle"></span>
                                                </span>
                                                <span>{group.attributes.linkToSchools.length} Schools</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):(
                        <NoResultDisplay
                            icon="group"
                            title="No group available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            <div className="my-3">
                                <button
                                    onClick={(e)=>navigate(routes.admin().concat().group())}
                                    className="btn btn-sm btn-outline-dark px-4 rounded-pill"
                                >+ New Group</button>
                            </div>
                        </NoResultDisplay>
                    )}
                </>
            )}
        </Page>
    );
}
