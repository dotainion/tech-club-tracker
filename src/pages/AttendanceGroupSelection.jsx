import { useNavigate, useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { useEffect, useState } from "react"
import { routes } from "../routes/Routes"
import { NoResultDisplay } from "../components/NoResultDisplay"
import { api } from "../request/Api"
import { Spinner } from "../components/Spinner"
import { useRouteDetective } from "../hooks/RouteDetectiveProvider"
import { Page } from "../layout/Page"

export const AttendanceGroupSelection = () =>{
    const { containsDefaultRouteId } = useRouteDetective();

    const [groups, setGroups] = useState([]);
    const [school, setSchool] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(containsDefaultRouteId()){
            setLoading(false);
            return;
        }
        Promise.all([
            api.school.list({schoolId: params.schoolId}).then((response)=>{
                setSchool(response.data.data[0]);
            }).catch((error)=>{
                setSchool(null);
            }),
            api.group.list({schoolId: params.schoolId}).then((response)=>{
                setGroups(response.data.data);
            }).catch((error)=>{
                setGroups([]);
            })
        ]).finally(()=>setLoading(false));
    }, [params.schoolId]);

    return(
        <Page>
            <PageHeader title="Attendance Group Selection" subTitle="Select a group to mark attendance">
                
            </PageHeader>

            {school && (
                <div className="mb-3">
                    <span className="fw-semibold">{school.attributes.name}</span>
                </div>
            )}

            {loading ? <Spinner show inline /> : (
                <div className="row g-3">
                    {
                        groups.length ?
                        groups.map((group) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={group.id}>
                                <div onClick={()=>navigate(routes.auth().concat().attendance(group.id))} className="card as-btn border p-4 h-100 text-center">
                                    <h6 className="fw-bold">{group.attributes.name}</h6>
                                    <div className="small text-muted mb-2">{group.attributes.description}</div>
                                    <div className="d-flex flex-wrap justify-content-center gap-2 text-muted small">
                                        <span>{group.attributes.students.length} Students</span>
                                        <span className="d-flex align-items-center">
                                            <span className="border border-dark border-2 rounded-circle"></span>
                                        </span>
                                        <span>{group.attributes.linkToSchools.length} Schools</span>
                                    </div>
                                </div>
                            </div>
                        )):
                        <NoResultDisplay
                            icon="group"
                            title="No group available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        />
                    }
                </div>
            )}
        </Page>
    )
}