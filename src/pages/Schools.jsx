import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../providers/AuthProvider";
import { api } from "../request/Api";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { FaEllipsisVertical } from "react-icons/fa6";
import { AddButton } from "../wedgits/AddButton";
import { Page } from "../layout/Page";

export const Schools = () =>{
    const { user } = useAuth();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        api.school.list({userId: user.id}).then((response)=>{
            setSchools(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader title="Schools" subTitle="Manage and view all registered schools">
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().school())}
                    icon="add"
                    title="New School"
                />
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <>
                    {schools.length ? (
                        <div className="row">
                            <AddButton
                                onClick={(e)=>navigate(routes.auth().concat().school())}
                                className="p-2"
                            />
                            {schools.map((school)=>(
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={school.id}>
                                    <div onClick={(e)=>navigate(routes.auth().concat().school(school.id))} className="card pointer border w-100 h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h6>{school.attributes.name}</h6>
                                                <div onClick={(e)=>e.stopPropagation()} className="dropdown">
                                                    <button className="btn btn-sm border-0" data-bs-toggle="dropdown">
                                                        <FaEllipsisVertical />
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={()=>navigate(routes.auth().concat().school(school.id))} className="dropdown-item">
                                                            View/Edit
                                                        </li>
                                                        <li onClick={()=>navigate(routes.auth().concat().students(school.id))} className="dropdown-item">
                                                            Students
                                                        </li>
                                                        <li onClick={()=>navigate(routes.auth().concat().reports(user.id), {state: {schoolId: school.id}})} className="dropdown-item">
                                                            Reports
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2 text-muted small">
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
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            <div className="py-3">
                                <button onClick={(e)=>navigate(routes.auth().concat().school())} className="btn btn-sm btn-outline-dark px-4 rounded-pill">
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
