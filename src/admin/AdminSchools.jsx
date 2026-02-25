import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { api } from "../request/Api";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { AddButton } from "../widgets/AddButton";
import { Page } from "../layout/Page";

export const AdminSchools = () =>{
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=>{
        api.school.list().then((response)=>{
            setSchools(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Schools" subTitle="Manage and view all registered schools">
                <PageHeaderItem
                    onClick={()=>navigate(routes.admin().concat().school())}
                    icon="add"
                    title="New School"
                />
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <>
                    {schools.length ? (
                        <div className="row">
                            {schools.length > 0 && (
                                <AddButton
                                    onClick={(e)=>navigate(routes.admin().concat().school())}
                                    className="p-2"
                                />
                            )}
                            {schools.map((school)=>(
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={school.id}>
                                    <div onClick={(e)=>navigate(routes.admin().concat().school(school.id))} className="card pointer border w-100 h-100">
                                        <div className="card-body">
                                            <h6>{school.attributes.name}</h6>
                                            <div className="d-flex flex-wrap gap-2 text-muted small mb-2">
                                                <span>{school.attributes.students.length} Students</span>
                                                <span className="d-flex align-items-center">
                                                    <span className="border border-dark border-2 rounded-circle"></span>
                                                </span>
                                                <span>{school.attributes.groups.length} Groups</span>
                                            </div>
                                            <span className={`badge bg-${school.attributes.status === 'Active' ? 'success' : 'secondary'}`}>
                                                {school.attributes.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):(
                        <NoResultDisplay
                            icon="school"
                            title="No school available"
                            description="Add your first school to get started."
                        >
                            <div className="py-3">
                                <button className="btn btn-sm btn-outline-dark px-4 rounded-pill" onClick={(e)=>navigate(routes.admin().concat().school())}>
                                    + New School
                                </button>
                            </div>
                        </NoResultDisplay>
                    )}
                </>
            )}
        </Page>
    );
}
