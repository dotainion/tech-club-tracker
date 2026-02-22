import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentDisplay } from "../components/StudentDisplay";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { useAuth } from "../providers/AuthProvider";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { SubmitButton } from "../wedgits/SubmitButton";
import { Page } from "../layout/Page";

export const AdminStudent = () => {
    const { user } = useAuth();
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [student, setStudent] = useState(null);
    const [schools, setSchools] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const onSubmitRef = useRef();

    const handleSave = (data) => {
        setSaving(true);
        api.attendance.setStudent(data).then((response)=>{
            navigate(routes.admin().concat().student(params.schoolId, response.data.data[0].id));
        }).catch((error)=>{

        }).finally(()=>setSaving(false));
    };
    
    const handleDelete = () =>{
        setError(null);
        setDeleting(true)
        api.attendance.setStudent({
            studentId: student.id,
            ...student.attributes,
            studentLinks: student.attributes.studentLinks.map((link)=>({
                ...link.attributes,
                hide: true
            })),
            hide: true
        }).then((response)=>{
            navigate(routes.admin().concat().students(params.schoolId));
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setDeleting(false));;
    }

    routeDetectiveOnCreate(() =>{
        setCreatingMode(true);
        setEditMode(true);
    });

    routeDetectiveOnExist(()=>{
        setCreatingMode(false);
        setEditMode(false);
    });

    useEffect(()=>{
        if(containsDefaultRouteId()){
            setLoading(false);
            return;
        }
        Promise.all([
            api.attendance.students({studentId: params.studentId}).then((response)=>{
                setStudent(response.data.data[0]);
            }).catch((error)=>{

            }),
            api.school.list({userId: user.id}).then((response)=>{
                setSchools(response.data.data);
            }).catch((error)=>{

            })
        ]).finally(()=>{
            
        });
    }, []);

    return (
        <Page className="bg-light">
            <PageHeader title={editMode ? 'Edit Student' : 'Create Student'} subTitle="">
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderButton onClick={()=>onSubmitRef.current()}>
                            Save
                        </PageHeaderButton>
                        {!creatingMode && (
                            <PageHeaderButton onClick={(e)=>setEditMode(false)}>
                                Cancel
                            </PageHeaderButton>
                        )}
                        <SubmitButton onClick={handleDelete} loading={deleting} outline px="none" bg="danger">
                            Delete
                        </SubmitButton>
                    </>
                ) : (
                    <>
                        <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().students(params.schoolId))}>
                            Students
                        </PageHeaderButton>
                        <PageHeaderButton onClick={(e)=>setEditMode(true)}>
                            Edit Student
                        </PageHeaderButton>
                    </>
                )}
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 bg-white">
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <StudentDisplay
                                    onSubmitRef={onSubmitRef}
                                    student={student}
                                    schools={schools}
                                    onSubmit={handleSave}
                                    creatingMode={creatingMode}
                                    editMode={editMode}
                                >
                                    <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={()=>navigate(routes.admin().concat().students(params.schoolId))}
                                            type="button"
                                        >Cancel</button>
                                        <SubmitButton loading={saving}>
                                            Save
                                        </SubmitButton>
                                    </div>
                                </StudentDisplay>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};
