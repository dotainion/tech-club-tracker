import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { api } from "../request/Api";
import { Spinner } from "../components/Spinner";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { ParseError } from "../utils/ParseError";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { SubmitButton } from "../wedgits/SubmitButton";
import { Page } from "../layout/Page";

export const AdminGroup = () => {
    const { routeDetectiveOnCreate, routeDetectiveOnExist, containsDefaultRouteId } = useRouteDetective();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);                            
    const [deleting, setDeleting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [error, setError] = useState(null);
    const [group, setGroup] = useState({
        id: null,
        attributes: {
            name: '',
            description: '',
            students: [],
            linkToSchools: [],
            hide: false
        }
    });

    const navigate = useNavigate();
    const params = useParams();

    const onSave = () => {
        setError(null);
        setSaving(true);
        const data = {
            ...group.attributes,
            groupId: params.groupId
        }
        api.group.set(data).then((response)=>{
            navigate(routes.admin().concat().group(response.data.data[0].id));
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    };

    const onDelete = () =>{
        setError(null);
        setDeleting(true)
        const data = {
            ...group.attributes,
            groupId: params.groupId,
            hide: true
        }
        api.group.set(data).then((response)=>{
            navigate(routes.admin().concat().groups());
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setDeleting(false));;
    }

    const onInput = (e) =>{
        setGroup((prev)=>({
            attributes: {
                ...prev.attributes,
                [e.target.name]: e.target.value
            }
        }));
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
        api.group.list({groupId: params.groupId}).then((response)=>{
            console.log(response.data.data[0]);
            setGroup(response.data.data[0]);
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            <PageHeader title={creatingMode ? 'Create Group' : 'Edit Group'}>
                {editMode || creatingMode ? (
                    <>
                        <PageHeaderItem
                            onClick={onSave}
                            loading={saving}
                            icon="save"
                            title="Save Group"
                        />
                        {!creatingMode && (
                            <>
                                <PageHeaderItem
                                    onClick={(e)=>setEditMode(false)}
                                    icon="cancel"
                                    title="Cancel"
                                />
                                <PageHeaderItem
                                    onClick={onDelete}
                                    loading={deleting}
                                    icon="delete"
                                    title="Delete Group"
                                />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <PageHeaderItem
                            onClick={(e)=>navigate(routes.admin().concat().assignToSchool(params.groupId))}
                            icon="assign"
                            title="Assign School"
                        />
                        <PageHeaderItem
                            onClick={(e)=>setEditMode(true)}
                            icon="edit"
                            title="Edit Group"
                        />
                    </>
                )}
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <div className="row justify-content-center">
                    <div className="d-flex col-lg-8">
                        <div className="card border col-12">
                            <div className="card-body p-4 pt-3">
                                <ErrorDisplay message={error}/>
                                {!creatingMode && !editMode && (
                                    <div className="d-flex align-items-center justify-content-end">
                                        <button
                                            onClick={()=>navigate(routes.admin().concat().assignToSchool(group.id))}
                                            className="btn btn-sm btn-outline-dark border"
                                        >Assign Schools</button>
                                    </div>
                                )}
                                <label className={`form-label fw-semibold ${editMode ? '' : 'mb-0'}`}>Name</label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control mb-3"
                                        value={group.attributes.name}
                                        onChange={onInput}
                                    />
                                ):(
                                    <p className="text-muted">{group.attributes.name}</p>
                                )}
                                <label className={`form-label fw-semibold ${editMode ? '' : 'mb-0'}`}>Description</label>
                                {editMode ? (
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={group.attributes.description}
                                        onChange={onInput}
                                        rows={4}
                                    />
                                ):(
                                    <p className="text-muted">{group.attributes.description}</p>
                                )}

                                <div className="d-flex flex-wrap gap-2 text-muted small mt-3">
                                    <span>{group.attributes.students.length} Students</span>
                                    <span className="d-flex align-items-center">
                                        <span className="border border-dark border-2 rounded-circle"></span>
                                    </span>
                                    <span>{group.attributes.linkToSchools.length} Schools</span>
                                </div>

                                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                                    {!creatingMode && editMode && (
                                        <button
                                            className="btn btn-sm btn-outline-secondary px-4"
                                            onClick={()=>setEditMode(false)}
                                            type="button"
                                        >Cancel</button>
                                    )}
                                    {editMode && (
                                        <SubmitButton onClick={onSave} loading={saving}>
                                            Save
                                        </SubmitButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Page>
    );
};
