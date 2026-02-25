import { useEffect, useState } from "react"
import { PageHeader, PageHeaderItem } from "../components/PageHeader"
import { Page } from "../layout/Page"
import { StudentLogsFilter } from "../widgets/StudentLogsFilter";
import { Spinner } from "../components/Spinner";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";

export const StudentLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        groupId: null,
        studentId: null,
        month: null,
        limit: 100
    });

    const navigate = useNavigate();

    useEffect(() => {
        api.attendance.list({...filter, date: filter.month}).then((response)=>{
            setLogs(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [filter]);

    return (
        <Page>
            <PageHeader
                title="Student Logs"
                subTitle="View student attendance by school, group, student, and month."
            >
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().attendance())}
                    icon="back"
                    title="Go Back"
                />
            </PageHeader>

            {/* Month filter */}
            <div className="d-flex justify-content-center mb-3 mt-4">
                <StudentLogsFilter onChange={setFilter} />
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
                                            <td>{log.name}</td>
                                            <td>{log.date}</td>
                                            <td>{log.clockIn}</td>
                                            <td>{log.clockOut}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ):(
                        <NoResultDisplay
                            icon="log"
                            title="No student log"
                            description="No student logs have been recorded yet. Once logs are added, they will appear here."
                        />
                    )}
                </>
            )}
        </Page>
    )
}