import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { Page } from "../layout/Page";

export const AdminStudents = () => {    
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        api.attendance.students({schoolId: params.schoolId}).then((response)=>{
            setStudents(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            <PageHeader title="Students">
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().student(params.schoolId))}>
                    + New Student
                </PageHeaderButton>
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <>
                    {students.length ? (
                        <div className="d-block d-md-none">
                            <div className="row g-3">
                                {students.map((student) => (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={student.id}>
                                        <div onClick={()=>navigate(routes.admin().concat().student(params.schoolId, student.id))} className="card border as-btn w-100 h-100">
                                            <div className="card-body d-flex flex-column">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="text-muted mb-0">{student.attributes.fullName}</h6>
                                                    <span className={`badge bg-${student.attributes.status === 'Active' ? 'success' : 'secondary'}`}>
                                                        {student.attributes.status}
                                                    </span>
                                                </div>
                                                <div className="small text-muted mb-2">{student.attributes.email}</div>
                                                <div className="d-flex justify-content-between mt-auto">
                                                    <div className="text-muted small">
                                                        <h6 className="mb-0">Age</h6>
                                                        <div className="small text-center">{student.attributes.age || 'NA'}</div>
                                                    </div>
                                                    <div className="text-muted small">
                                                        <h6 className="mb-0">Grade</h6>
                                                        <div className="small text-center">{student.attributes.grade || 'NA'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ):(
                        <NoResultDisplay
                            icon="student"
                            title="No student available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            <div className="my-3">
                                <button
                                    onClick={(e)=>navigate(routes.admin().concat().student(params.schoolId))}
                                    className="btn btn-sm btn-outline-dark px-4 rounded-pill"
                                >+ New Student</button>
                            </div>
                        </NoResultDisplay>
                    )}
                </>
            )}
        </Page>
    );
};
