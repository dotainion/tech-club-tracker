import { useEffect, useState } from "react";
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { api } from "../request/Api";
import { SpinnerConditional } from "../components/SpinnerConditional";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { SchoolDisplay } from "../components/SchoolDisplay";
import { SubmitButton } from "../wedgits/SubmitButton";
import { SchoolDisplayGroups } from "../components/SchoolDisplayGroups";
import { Page } from "../layout/Page";

export const AdminSchool = () =>{
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [school, setSchool] = useState({
        id: null,
        attributes: {
            name: '',
            principal: '',
            status: 'Active',
            email: '',
            contact: '',
        }
    });

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
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return null;

    return (
        <Page className="bg-light">
            {/* Header */}
            <PageHeader title={editMode ? `Edit School: ${school.attributes.name}` : school.attributes.name} subTitle="">
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderButton onClick={saveSchool}>
                            Save
                        </PageHeaderButton>
                        {!creatingMode && (
                            <PageHeaderButton onClick={(e)=>setEditMode(false)}>
                                Cancel
                            </PageHeaderButton>
                        )}
                    </>
                ) : (
                    <>
                        <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().school())}>
                            + New School
                        </PageHeaderButton>
                        <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().students(school.id))}>
                            Students
                        </PageHeaderButton>
                        <PageHeaderButton onClick={(e)=>setEditMode(true)}>
                            Edit School
                        </PageHeaderButton>
                    </>
                )}
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            <SpinnerConditional loading={loading}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card bg-white shadow-sm border-0 rounded-4">
                            <div className="card-body px-4 py-5">
                                <ErrorDisplay message={error} />
                                <SchoolDisplay school={school} editMode={editMode}>
                                    {!creatingMode && !editMode && (
                                        <SchoolDisplayGroups school={school}>
                                            <button
                                                onClick={()=>navigate(routes.admin().concat().students(school.id))}
                                                className="btn btn-sm btn-outline-primary"
                                            >Mange Students</button>
                                        </SchoolDisplayGroups>
                                    )}
                                    {editMode && (
                                        <div className="d-flex justify-content-end mt-4">
                                            <SubmitButton onClick={saveSchool} loading={saving}>Save</SubmitButton>
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
