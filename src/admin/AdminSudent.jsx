import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentDisplay } from "../components/StudentDisplay";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { useAuth } from "../providers/AuthProvider";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { SubmitButton } from "../widgets/SubmitButton";
import { Page } from "../layout/Page";
import { Spinner } from "../components/Spinner";
import { ErrorDisplay } from "../components/ErrorDisplay";

export const AdminStudent = () => {
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [student, setStudent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const onSubmitRef = useRef();

    const handleSave = (data) => {
        setSaving(true);
        api.attendance.setStudent(data).then((response)=>{
            navigate(routes.admin().concat().student(params.schoolId, response.data.data[0].id));
        }).catch((error)=>{
            setError(error.message());
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
            setError(error.message());
        }).finally(()=>setDeleting(false));;
    }

    const reset = () =>{
        setStudent(null);
        setTimeout(()=>setLoading(false), 0);
    }

    const cancel = () =>{
        setEditMode(false);
        navigate(-1);
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
        setLoading(true);
        if(containsDefaultRouteId()){
            return reset();
        }
        api.attendance.students({studentId: params.studentId}).then((response)=>{
                setStudent(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [params.studentId]);

    return (
        <Page>
            <PageHeader title={editMode ? 'Edit Student' : 'Create Student'} subTitle="">
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderItem
                            onClick={()=>onSubmitRef.current()}
                            icon="save"
                            title="Save Student"
                        />
                        {!creatingMode && (
                            <PageHeaderItem
                                onClick={cancel}
                                icon="cancel"
                                title="Cancel"
                            />
                        )}
                        <PageHeaderItem
                            onClick={handleDelete}
                            loading={deleting}
                            icon="delete"
                            title="Delete Student"
                            requireConfirmation
                        />
                    </>
                ) : (
                    <>
                        <PageHeaderItem
                            onClick={()=>navigate(routes.auth().concat().student(params.schoolId))}
                            icon="add"
                            title="New Student"
                        />
                        <PageHeaderItem
                            onClick={(e)=>navigate(routes.admin().concat().students(params.schoolId))}
                            icon="student"
                            title="Students"
                        />
                        <PageHeaderItem
                            onClick={()=>setEditMode(true)}
                            icon="edit"
                            title="Edit Student"
                        />
                    </>
                )}
            </PageHeader>

            <div className="row justify-content-center mt-5">
                <div className="col-12 col-lg-8">
                    <div className="card border">
                        <div className="card-body px-4 py-md-5" style={{minHeight: '300px'}}>
                            <ErrorDisplay message={error}/>
                            {loading ? <Spinner show inline /> : (
                                <StudentDisplay
                                    onSubmitRef={onSubmitRef}
                                    student={student}
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};
