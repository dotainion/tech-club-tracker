import { useNavigate } from "react-router-dom";
import { DatePicker } from "../widgets/DatePicker";
import { PageHeader } from "../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { Spinner } from "../components/Spinner";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { StackFilter } from "../widgets/StackFilter";
import { Page } from "../layout/Page";
import { routes } from "../routes/Routes";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { dateTime } from "../utils/DateTime";

export const Analytics = () => {
    const today = dateTime.now().format('ym').toString();

    const [reports, setReports] = useState([]);
    const [processedReports, setProcessedReports] = useState([]);
    const [overallStats, setOverallStats] = useState(null);
    const [dateValue, setDateValue] = useState(today);
    const [published, setPublished] = useState(true);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const timeoutRef = useRef();

    // FETCH REPORTS
    useEffect(()=>{
        setLoading(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.report.list({date: dateValue, published, limit}).then((response)=>{
                setReports(response.data.data);
            }).catch(()=>{
                setReports([]);
            }).finally(()=>setLoading(false));
        }, 500);
    }, [dateValue, published, limit]);


    // PROCESS ANALYTICS
    useEffect(()=>{
        if(!reports.length){
            setProcessedReports([]);
            setOverallStats(null);
            return;
        }

        const overall = {
            totalReports: reports.length,
            totalPresent: 0,
            totalAbsent: 0,
            totalSessions: 0,
            totalStudents: 0
        };

        const newReports = reports.map((report)=>{

            const school = report.attributes.school;
            const groups = school.attributes.groups || [];

            let reportTotalPresent = 0;
            let reportTotalAbsent = 0;
            let reportTotalSessions = 0;
            let reportTotalStudents = 0;

            const groupStats = [];

            groups.forEach((group)=>{

                const students = group.attributes.students || [];
                const totalStudents = students.length;
                reportTotalStudents += totalStudents;

                const attendanceByDate = {};

                students.forEach((student)=>{
                    const attendances = student.attributes.attendances || [];

                    attendances.forEach((att)=>{
                        if(att.attributes.groupId !== group.id) return;

                        const date = att.attributes.date.split(" ")[0];

                        if(!attendanceByDate[date]){
                            attendanceByDate[date] = new Set();
                        }

                        attendanceByDate[date].add(student.id);
                    });
                });

                const dates = Object.keys(attendanceByDate);
                reportTotalSessions += dates.length;

                let present = 0;
                let absent = 0;

                students.forEach((student)=>{
                    let presentCount = 0;

                    dates.forEach((date)=>{
                        if(attendanceByDate[date]?.has(student.id)){
                            presentCount++;
                        }
                    });

                    present += presentCount;
                    absent += (dates.length - presentCount);
                });

                reportTotalPresent += present;
                reportTotalAbsent += absent;

                const rate = (present + absent) > 0
                    ? ((present/(present+absent))*100).toFixed(2)
                    : 0;

                groupStats.push({
                    name: group.attributes.name,
                    sessions: dates.length,
                    present,
                    absent,
                    rate
                });

            });

            const reportRate = (reportTotalPresent + reportTotalAbsent) > 0
                ? ((reportTotalPresent/(reportTotalPresent+reportTotalAbsent)) * 100).toFixed(2)
                : 0;

            overall.totalPresent += reportTotalPresent;
            overall.totalAbsent += reportTotalAbsent;
            overall.totalSessions += reportTotalSessions;
            overall.totalStudents += reportTotalStudents;

            return {
                ...report,
                analytics:{
                    totalPresent: reportTotalPresent,
                    totalAbsent: reportTotalAbsent,
                    totalSessions: reportTotalSessions,
                    totalStudents: reportTotalStudents,
                    attendanceRate: reportRate,
                    groups: groupStats
                }
            };

        });

        overall.attendanceRate = (overall.totalPresent + overall.totalAbsent) > 0
            ? ((overall.totalPresent/(overall.totalPresent+overall.totalAbsent))*100).toFixed(2)
            : 0;

        setProcessedReports(newReports);
        setOverallStats(overall);

    }, [reports]);

    return (
        <Page>
            <PageHeader title="Reports & Analytics" subTitle="Complete attendance intelligence and performance tracking.">
                
            </PageHeader>

            <div className="d-flex justify-content-center mb-3">
                <StackFilter
                    defaultValues={{
                        limit,
                        date: dateValue,
                        published
                    }}
                    onChange={(filter)=>{
                        setLimit(filter.limit);
                        setDateValue(filter.date);
                        setPublished(filter.published);
                    }}
                />
            </div>

            <hr></hr>

            {loading ? <Spinner show inline /> : (
                <>
                    {processedReports.length > 0 ? (
                        <>
                            {/* GLOBAL SUMMARY CARDS */}
                            {overallStats && (
                                <div className="row g-4 mt-4 mb-5">

                                    <StatCard
                                        title="Overall Attendance"
                                        value={`${overallStats.attendanceRate}%`}
                                        text="Average attendance across all reports."
                                        bg="linear-gradient(135deg,#007bff,#4dabf7)"
                                    />

                                    <StatCard
                                        title="Total Present"
                                        value={overallStats.totalPresent}
                                        text="Total recorded attendances."
                                        bg="linear-gradient(135deg,#28a745,#20c997)"
                                    />

                                    <StatCard
                                        title="Total Absent"
                                        value={overallStats.totalAbsent}
                                        text="Total recorded absences."
                                        bg="linear-gradient(135deg,#dc3545,#ff6b6b)"
                                    />

                                    <StatCard
                                        title="Total Sessions"
                                        value={overallStats.totalSessions}
                                        text="Unique attendance days."
                                        bg="linear-gradient(135deg,#6610f2,#9775fa)"
                                    />

                                </div>
                            )}

                            {/* REPORT LIST */}
                            {processedReports.map((report)=>(
                                <div key={report.id} className="card p-4 mb-4 border">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="text-muted mb-0 small">{report.attributes.facilitator.attributes.fullName}</h6>
                                        <button
                                            onClick={()=>navigate(routes.admin().concat().report(report.id))}
                                            className="d-flex align-items-center gap-1 btn btn-sm btn-outline-primary text-decoration-none"
                                        >
                                            <HiOutlineDocumentReport />
                                            <span>View</span>
                                        </button>
                                    </div>
                                    <h5 className="fw-bold mb-1">{report.attributes.school.attributes.name}</h5>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="text-muted">{report.attributes.date.split(' ')[0]}</div>
                                        <span className={`badge bg-${report.attributes.published ? 'primary' : 'secondary'}`}>
                                            <small>{report.attributes.published ? 'Published' : 'Draft'}</small>
                                        </span>
                                    </div>

                                    {/* PER REPORT COLORED CARDS */}
                                    <div className="row g-3 mb-4">
                                        <StatCardSmall
                                            title="Attendance"
                                            value={`${report.analytics.attendanceRate}%`}
                                            bg="linear-gradient(135deg,#007bff,#4dabf7)"
                                        />

                                        <StatCardSmall
                                            title="Present"
                                            value={report.analytics.totalPresent}
                                            bg="linear-gradient(135deg,#28a745,#20c997)"
                                        />

                                        <StatCardSmall
                                            title="Absent"
                                            value={report.analytics.totalAbsent}
                                            bg="linear-gradient(135deg,#dc3545,#ff6b6b)"
                                        />

                                        <StatCardSmall
                                            title="Sessions"
                                            value={report.analytics.totalSessions}
                                            bg="linear-gradient(135deg,#6610f2,#9775fa)"
                                        />

                                    </div>

                                    {/* GROUP BREAKDOWN */}
                                    <div className="table-responsive">
                                        <table className="table table-bordered align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Group</th>
                                                    <th>Sessions</th>
                                                    <th>Present</th>
                                                    <th>Absent</th>
                                                    <th>Attendance %</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {report.analytics.groups.map((group)=>(
                                                    <tr key={group.name}>
                                                        <td>{group.name}</td>
                                                        <td>{group.sessions}</td>
                                                        <td className="text-success fw-semibold">{group.present}</td>
                                                        <td className="text-danger fw-semibold">{group.absent}</td>
                                                        <td><strong>{group.rate}%</strong></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (

                        <NoResultDisplay
                            icon="report"
                            title="No reports"
                            description="Select a month to view analytics."
                        >
                            <div className="my-3">
                                <DatePicker onChange={(e)=>setDateValue(e.target.value)} value={dateValue} month />
                            </div>
                        </NoResultDisplay>

                    )}
                </>
            )}
        </Page>
    );
};


const StatCard = ({title, value, text, bg})=>(
    <div className="col-md-3">
        <div className="card text-white p-4 rounded-4 shadow-sm h-100 border-0 text-center"
            style={{background:bg}}>
            <h6 className="fw-light">{title}</h6>
            <h3 className="fw-bold">{value}</h3>
            <small className="opacity-75">{text}</small>
        </div>
    </div>
);

const StatCardSmall = ({title, value, bg})=>(
    <div className="col-md-3">
        <div
            className="card text-white p-3 rounded-4 shadow-sm h-100 border-0 text-center"
            style={{background: bg}}
        >
            <div className="small opacity-75">{title}</div>
            <div className="fw-bold fs-4">{value}</div>
        </div>
    </div>
);
