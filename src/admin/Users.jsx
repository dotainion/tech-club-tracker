import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"
import { useEffect, useState } from "react";
import { api } from "../request/Api";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { AddButton } from "../widgets/AddButton";
import { Page } from "../layout/Page";

export const Users = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        api.user.users().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);
    
    return(
        <Page>
            <PageHeader title="Users" subTitle="Manage and view all registered schools">
                <PageHeaderItem
                    onClick={()=>navigate(routes.admin().concat().user())}
                    icon="add"
                    title="New User"
                />
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <div className="row">
                    {users.length > 0 && (
                        <AddButton
                            onClick={()=>navigate(routes.admin().concat().user())}
                            className="p-2"
                        />
                    )}
                    {
                        users.length ?
                        users.map((user) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2" key={user.id}>
                                <div onClick={()=>navigate(routes.admin().concat().user(user.id))} className="card pointer border w-100 h-100">
                                    <div className="card-body">
                                        <h6 className="fw-bold mb-2">{user.attributes.fullName}</h6>
                                        <span className="badge bg-secondary mb-2">{user.attributes.role.attributes.label}</span>
                                        <div className="small text-muted">
                                            Schools
                                            {user.attributes.schools.length <= 0 && (
                                                <span className="small text-muted">: None</span>
                                            )}
                                        </div>
                                        <div className="d-flex flex-wrap gap-1">
                                            {user.attributes.schools.map((school)=>(
                                                <span className="bg-primary badge" key={`school-${school.id}`}>{school.attributes.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ):(
                        <NoResultDisplay
                            icon="user"
                            title="No user available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        />
                    )}
                </div>
            )}
        </Page>
    )
}