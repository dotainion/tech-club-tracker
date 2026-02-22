import { useNavigate, useParams } from "react-router-dom"
import { routes } from "../routes/Routes"
import { useState } from "react";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { Profile, ProfileProvider, ProfileSubmit } from "../components/Profile";
import { Page } from "../layout/Page";

export const User = () =>{
    const { routeDetectiveOnCreate, routeDetectiveOnExist } = useRouteDetective();

    const [editMode, setEditMode] = useState(false);
    const [creatingMode, setCreatingMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: null,
        attributes: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: '',
            schools: []
        }
    });

    const navigate = useNavigate();
    const params = useParams();

    routeDetectiveOnCreate(() =>{
        setCreatingMode(true);
        setEditMode(true);
    });

    routeDetectiveOnExist(()=>{
        setCreatingMode(false);
        setEditMode(false);
    });

    return(
        <Page className="bg-light">
            <ProfileProvider
                userId={params.userId}
                editMode={editMode}
                creatingMode={creatingMode}
                onChange={setUser}
                onLoad={setUser}
                onLoading={setLoading}
                onSuccess={(user)=>{
                    if(creatingMode){
                        return navigate(routes.admin().concat().user(user.id));
                    }
                    setEditMode(false);
                }}
            >
            {/* Header */}
            <PageHeader
                title={
                    creatingMode
                        ? 'Create new user'
                        : editMode
                            ? `Edit: ${user.attributes.fullName}`
                            : user.attributes.fullName
                }
                subTitle="Students facilitate"
            >
                {editMode || creatingMode ? (
                    <>
                    
                        <ProfileSubmit className="border" bg="dark" px="none">
                            Save
                        </ProfileSubmit>
                        {!creatingMode && (
                            <PageHeaderButton onClick={(e)=>setEditMode(false)}>
                                Cancel
                            </PageHeaderButton>
                        )}
                    </>
                ) : (
                    <>
                        <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().user())}>
                            + New User
                        </PageHeaderButton>
                        <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().userSettings(params.userId))}>
                            Settings
                        </PageHeaderButton>
                        <PageHeaderButton onClick={(e)=>setEditMode(true)}>
                            Edit User
                        </PageHeaderButton>
                    </>
                )}
                <PageHeaderButton onClick={(e)=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            {/* Card Form */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        <div className="card shadow-sm border-0 bg-white">
                            <div className="card-body p-4">
                                {/* User Name */}
                                <div className="row">
                                    <div className={creatingMode ? '' : 'col-md-6'}>
                                        <Profile />
                                    </div>

                                    {!creatingMode && (
                                        <div className="col-md-6 px-2 mt-md-0 mt-3">
                                            <div className="d-flex flex-column bg-light rounded-3 p-3 h-100">
                                                <div className="d-flex align-items-center justify-content-between text-muted border-bottom">
                                                    <div className="fw-semibold">Schools</div>
                                                    <span className="badge border text-muted">{user.attributes.schools.length}</span>
                                                </div>
                                                {user.attributes.schools.length ? (
                                                    <div className="text-muted small mb-2">Schools that is assigned:</div>
                                                ):(
                                                    <div className="text-muted small mb-2">Schools that is assigned will appear here</div>
                                                )}
                                                <div className="d-flex flex-wrap gap-1 mb-auto">
                                                    {user.attributes.schools.map((school)=>(
                                                        <span
                                                            className="bg-primary badge"
                                                            key={`school-${school.id}`}
                                                        >{school.attributes.name}</span>
                                                    ))}
                                                </div>
                                                <div className="d-flex justify-content-end mt-3 mt-md-0">
                                                    <button
                                                        onClick={()=>navigate(routes.admin().concat().assignSchools(params.userId))}
                                                        className="btn btn-outline-primary px-4 btn-sm"
                                                        type="button"
                                                    >Add/Remove Schools</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {editMode && (
                                    <div className="col-12 d-flex justify-content-end gap-2 flex-wrap mt-4">
                                        <button
                                            onClick={()=>navigate(routes.admin().concat().users())}
                                            className="btn btn-sm btn-outline-secondary px-4"
                                        >
                                            Cancel
                                        </button>
                                        <ProfileSubmit>
                                            Save
                                        </ProfileSubmit>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileProvider>
        </Page>
    )
}