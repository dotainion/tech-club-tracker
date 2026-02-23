import { useNavigate, useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { useAuth } from "../providers/AuthProvider"
import { useEffect, useState } from "react"
import { routes } from "../routes/Routes"
import { NoResultDisplay } from "../components/NoResultDisplay"
import { api } from "../request/Api"
import { Spinner } from "../components/Spinner"
import { useRouteDetective } from "../hooks/RouteDetectiveProvider"
import { Page } from "../layout/Page"

export const AttendanceSchoolSelection = () =>{
    const { isAdmin } = useAuth();
    const { containsDefaultRouteId } = useRouteDetective();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(containsDefaultRouteId()){
            setLoading(false);
            return;
        }
        api.school.list({userId: params.userId}).then((response)=>{
            setSchools(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [params.userId]);

    return(
        <Page>
            <PageHeader title="Attendance School Selection" subTitle="Select a school to mark attendance">
                
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <div className="row g-3">
                    {
                        schools.length ?
                        schools.map((school) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={school.id}>
                                <div onClick={()=>navigate(routes.auth().concat().attendanceGroupSelection(school.id))} className="card as-btn border p-4 h-100 text-center">
                                    <h6 className="fw-bold">{school.attributes.name}</h6>
                                    <div className="d-flex flex-wrap justify-content-center gap-2 text-muted small">
                                        <span>{school.attributes.linkToGroup.length} groups</span>
                                        <span className="d-flex align-items-center">
                                            <span className="border border-dark border-2 rounded-circle"></span>
                                        </span>
                                        <span>{school.attributes.students.length} students</span>
                                    </div>
                                </div>
                            </div>
                        )):
                        <NoResultDisplay
                            icon="school"
                            title="No school available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            {isAdmin ? (
                                <button
                                    onClick={()=>navigate(routes.auth().concat().school())}
                                    className="btn btn-sm btn-outline-dark px-4 rounded-pill mt-3 mb-4"
                                >+ Add your first school 🏫</button>
                            ):(
                                <p>Contact your administrator for asistance</p>
                            )}
                        </NoResultDisplay>
                    }
                </div>
            )}
        </Page>
    )
}