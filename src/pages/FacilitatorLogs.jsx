import { useEffect, useState } from "react"
import { PageHeader, PageHeaderItem } from "../components/PageHeader"
import { Page } from "../layout/Page"
import { DatePicker } from "../widgets/DatePicker"
import { dateTime } from "../utils/DateTime"
import { Spinner } from "../components/Spinner"
import { NoResultDisplay } from "../components/NoResultDisplay"
import { api } from "../request/Api"
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

export const FacilitatorLogs = () => {
    const today = dateTime.now().format('ym').toString();

    const { user } = useAuth();

    const [logs, setLogs] = useState([]);
    const [dateValue, setDateValue] = useState(today);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.clock.list({userId: user.id, in: dateValue}).then((response)=>{
            setLogs(response.data.data.map((log)=>({
                id: log.id,
                attributes: {
                    ...log.attributes,
                    date: new Date(log.attributes.in.replace(' ', 'T')).toDateString(),
                    start: new Date(log.attributes.in.replace(' ', 'T')).toLocaleTimeString(),
                    end: new Date(log.attributes.out.replace(' ', 'T')).toLocaleTimeString(),
                }
            })));
        }).catch((error)=>{
            setLogs([]);
        }).finally(()=>setLoading(false));
    }, [dateValue]);

    return (
        <Page>
            <PageHeader
                title="Facilitator Logs"
                subTitle="View clock-in and clock-out records by month."
            >
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().attendance())}
                    icon="back"
                    title="Go Back"
                />
            </PageHeader>

            <div className="d-flex justify-content-center mb-3 mt-4">
                <DatePicker
                    month
                    value={dateValue}
                    onChange={(e)=>setDateValue(e.target.value)}
                />
            </div>

            {loading ? <Spinner show inline /> : (
                <>
                    {logs.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Clock In</th>
                                        <th>Clock Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.id}>
                                            <td>{user.attributes.fullName}</td>
                                            <td>{log.attributes.date}</td>
                                            <td>{log.attributes.start}</td>
                                            <td>{log.attributes.end}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ):(
                        <NoResultDisplay
                            icon="log"
                            title="No facilitator log"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        />
                    )}
                </>
            )}
        </Page>
    )
}