import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentDisplay } from "../components/StudentDisplay";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { Spinner } from "../components/Spinner";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { ParseError } from "../utils/ParseError";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { SubmitButton } from "../wedgits/SubmitButton";
import { Page } from "../layout/Page";

export const Student = () => {
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    const onSubmitRef = useRef();

    const save = async(record) =>{
        const data = {
            ...record,
            groupId: params.groupId,
            schoolId: params.schoolId
        }
        return await api.attendance.setStudent(data)
    }

    const handleSave = (record) => {
        setError(null);
        setSaving(true);
        save(record).then((response)=>{
            navigate(routes.auth().concat().student(params.schoolId, response.data.data[0].id));
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    };

    const handleDelete = () =>{
        setError(null);
        setDeleting(true)
        save({
            studentId: student.id,
            ...student.attributes,
            studentLinks: student.attributes.studentLinks.map((link)=>({
                ...link.attributes,
                hide: true
            })),
            hide: true
        }).then((response)=>{
            navigate(routes.auth().concat().students(params.schoolId));
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
        api.attendance.students({studentId: params.studentId}).then((response)=>{
            setStudent(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return(
        <Spinner show />
    )

    return (
        <Page>
            <PageHeader title={creatingMode ? 'Create Student' : 'Edit Student'}>
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderItem
                            onClick={()=>onSubmitRef.current()}
                            icon="save"
                            title="Save Student"
                        />
                        {creatingMode ? (
                            <PageHeaderItem
                                onClick={()=>setEditMode(false)}
                                icon="cancel"
                                title="Cancel"
                            />
                        ):(
                            <PageHeaderItem
                                onClick={handleDelete}
                                loading={deleting}
                                icon="delete"
                                title="Delete Student"
                            />
                        )}
                    </>
                ) : (
                    <>
                        <PageHeaderItem
                            onClick={()=>navigate(routes.auth().concat().attendance())}
                            icon="view"
                            title="View Attendance"
                        />
                        <PageHeaderItem
                            onClick={()=>setEditMode(true)}
                            icon="edit"
                            title="Edit Student"
                        />
                    </>
                )}
            </PageHeader>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card border">
                        <div className="card-body px-4 py-5">
                            <ErrorDisplay message={error}/>
                            <StudentDisplay
                                onSubmitRef={onSubmitRef}
                                student={student}
                                onSubmit={handleSave}
                                creatingMode={creatingMode}
                                editMode={editMode}
                            >
                                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                                    {!creatingMode && editMode && (
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={()=>setEditMode(false)}
                                            type="button"
                                        >Cancel</button>
                                    )}
                                    {editMode && (
                                        <SubmitButton loading={saving}>Save</SubmitButton>
                                    )}
                                </div>
                            </StudentDisplay>                                
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};
