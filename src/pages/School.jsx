import { useEffect, useState } from "react";
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { api } from "../request/Api";
import { SpinnerConditional } from "../components/SpinnerConditional";
import { ParseError } from "../utils/ParseError";
import { SubmitButton } from "../wedgits/SubmitButton";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { SchoolDisplay } from "../components/SchoolDisplay";
import { SchoolDisplayGroups } from "../components/SchoolDisplayGroups";
import { Page } from "../layout/Page";

const defaultSchool = () =>({
    id: null,
    attributes: {
        name: '',
        principal: '',
        status: 'Active',
        email: '',
        contact: '',
    }
});

export const School = () =>{
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [school, setSchool] = useState(defaultSchool());

    const navigate = useNavigate();
    const params = useParams();

    const saveSchool = () => {
        setError(null);
        setSaving(true);
        const data = {
            schoolId: school.id,
            ...school.attributes,
            hide: null
        }
        api.school.set(data).then((response)=>{
            const resSchool = response.data.data[0];
            navigate(routes.auth().concat().school(resSchool.id))
            setSchool(resSchool);
            setEditMode(false);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    };

    routeDetectiveOnCreate(() =>{
        setCreatingMode(true);
        setEditMode(true);
        setSchool(defaultSchool());
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

        api.school.list({schoolId: params.schoolId}).then((response)=>{
            setSchool(response.data.data[0]);
        }).catch(()=>{
            
        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return null;

    return (
        <Page>
            {/* Header */}
            <PageHeader
                title={
                    creatingMode 
                        ? 'Create school' 
                        : editMode 
                            ? `Edit: ${school.attributes.name}` 
                            : school.attributes.name
                }
                subTitle={
                    creatingMode
                        ? 'Create a new school record'
                        : editMode 
                            ? `Making changes here will modify ${school.attributes.name}` 
                            : 'Fill out the form to create a new school record'
                }
            >
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderItem
                            onClick={saveSchool}
                            loading={saving}
                            icon="save"
                            title="Save School"
                        />
                        {!creatingMode && (
                            <PageHeaderItem
                                onClick={()=>setEditMode(false)}
                                icon="cancel"
                                title="Cancel"
                            />
                        )}
                    </>
                ) : (
                    <>
                        <PageHeaderItem
                            onClick={()=>navigate(routes.auth().concat().school())}
                            icon="add"
                            title="New School"
                        />
                        <PageHeaderItem
                            onClick={()=>navigate(routes.auth().concat().students(school.id))}
                            icon="student"
                            title="Students"
                        />
                        <PageHeaderItem
                            onClick={()=>setEditMode(true)}
                            icon="edit"
                            title="Edit School"
                        />
                    </>
                )}
            </PageHeader>

            <SpinnerConditional loading={loading}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card border">
                            <div className="card-body px-4 py-5">
                                <ErrorDisplay message={error} />
                                <SchoolDisplay school={school} editMode={editMode} onChange={setSchool}>
                                    {!creatingMode && !editMode && (
                                        <SchoolDisplayGroups school={school}>
                                            <button
                                                onClick={()=>navigate(routes.auth().concat().students(school.id))}
                                                className="btn btn-sm btn-outline-primary"
                                            >Mange Students</button>
                                        </SchoolDisplayGroups>
                                    )}
                                    {editMode && (
                                        <div className="d-flex justify-content-end mt-4">
                                            <SubmitButton onClick={saveSchool} loading={saving}>
                                                Save
                                            </SubmitButton>
                                        </div>
                                    )}
                                </SchoolDisplay>
                            </div>
                        </div>
                    </div>
                </div>
            </SpinnerConditional>
        </Page>
    );
}
