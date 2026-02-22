import { Fragment, useEffect, useState } from "react";
import { api } from "../request/Api";
import { BiCollapse, BiShow } from "react-icons/bi";
import { Spinner } from "./Spinner";
import { DownloadVisibility } from "../providers/DownloadProvider";

export const ReportAttendance = ({ report }) => {
    const [attendanceData, setAttendanceData] = useState({
        records: [],
        groupTotals: {},
        grandTotal: { 
            Present: 0,
            Absent: 0
        }
    });
    const [showAttendance, setShowAttendance] = useState(false);
    const [loading, setLoading] = useState(true);

    const daysInMonth = (year, month) => {
        const totalDays = new Date(year, month, 0).getDate();
        return Array.from({ length: totalDays }, (_, i) => String(i + 1).padStart(2, "0"));
    };

    const generateAttendanceRecords = (students) => {
        const [year, month] = report.attributes.date.split("-");
        const monthDays = daysInMonth(year, month);

        const records = [];
        const groupTotals = {};
        const grandTotal = { Present: 0, Absent: 0 };

        students.forEach((student) => {
            const name = student.attributes.fullName;
            const studentGroups = student.attributes.studentLinks.map((link) => link.attributes.group.attributes.name);
            const attendances = student.attributes.attendances || [];

            const attendanceMap = new Map(
                attendances.map((att) => [att.attributes.date.split(" ")[0], att])
            );

            studentGroups.forEach((group) => {
                if (!groupTotals[group]) groupTotals[group] = { Present: 0, Absent: 0 };

                monthDays.forEach((day) => {
                    const date = `${year}-${month}-${day}`;
                    const attendance = attendanceMap.get(date);
                    const status = attendance ? "Present" : "Absent";

                    records.push({
                        school: report.attributes.school.attributes.name,
                        group,
                        date,
                        studentName: name,
                        status,
                    });

                    groupTotals[group][status]++;
                    grandTotal[status]++;
                });
            });
        });

        return { records, groupTotals, grandTotal };
    };

    useEffect(() => {
        if (!report) return;
        setLoading(true);
        api.attendance.students({schoolId: report.attributes.schoolId}).then((response)=>{
            setAttendanceData(generateAttendanceRecords(response.data.data));
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }, [report]);

    if (loading) return(
        <Spinner show inline />
    )

    const uniqueGroups = [...new Set(attendanceData.records.map((r) => r.group))];

    return (
        <div className="card mb-3 p-4 border">
            <h6 className="fw-bold mb-3">3. Student Skill Group Overview Summary</h6>
            <div className="row g-3">
                <div className="col-md-3"><strong>Total Students:</strong> {report.attributes.summary.attributes.total}</div>
                {Object.keys(report.attributes.summary.attributes).map((attribute)=>{
                    if(['id', 'total', 'hide'].includes(attribute)  || attribute.includes('Id')) return null;
                    return(
                        <div className="col-md-3" key={attribute}>
                            <span className="me-2">{attribute}:</span>
                            <strong>{report.attributes.summary.attributes[attribute]}</strong>
                        </div>
                    )
                })}
            </div>

            <DownloadVisibility hidden={!showAttendance} showOnDownload>
                <hr></hr>
                <div className="d-flex justify-content-between">
                    <h6 className="fw-bold">Student Attendance</h6>
                    <DownloadVisibility hideOnDownload>
                        <button
                            onClick={()=>setShowAttendance(false)}
                            className="btn btn-sm btn-link text-decoration-none d-flex align-items-center gap-1 p-0"
                        >
                            <BiCollapse/>
                            Show Attendance
                        </button>
                    </DownloadVisibility>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2}>{report.attributes.school.attributes.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueGroups.map((group) => {
                                const groupRecords = attendanceData.records.filter((r) => r.group === group);
                                const uniqueDates = [...new Set(groupRecords.map((r) => r.date))];

                                return (
                                    <Fragment key={group}>
                                        {/* Group header */}
                                        <tr className="fw-bold">
                                            <td colSpan={2}>{group}</td>
                                        </tr>

                                        {uniqueDates.map((date) => {
                                            const dateRecords = groupRecords.filter((r) => r.date === date);
                                            return (
                                                <Fragment key={`${group}-${date}`}>
                                                    {/* Date row with group name */}
                                                    <tr>
                                                        <td>{date}</td>
                                                        <td>{group}</td>
                                                    </tr>

                                                    {/* Student rows */}
                                                    {dateRecords.map((rec) => (
                                                        <tr key={`${rec.group}-${rec.date}-${rec.studentName}`}>
                                                            <td style={{ paddingLeft: "2rem" }}>{rec.studentName}</td>
                                                            <td>{rec.status}</td>
                                                        </tr>
                                                    ))}
                                                </Fragment>
                                            );
                                        })}
                                    </Fragment>
                                );
                            })}

                            {/* Totals */}
                            <tr className="fw-bold">
                                <td colSpan={2}>Subtotals per Group:</td>
                            </tr>
                            {Object.entries(attendanceData.groupTotals).map(([group, totals]) => (
                                <tr key={group}>
                                    <td colSpan={2}>
                                        {group}: Present: {totals.Present} | Absent: {totals.Absent}
                                    </td>
                                </tr>
                            ))}
                            <tr className="fw-bold">
                                <td colSpan={2}>
                                    Grand Total: Present: {attendanceData.grandTotal.Present} | Absent: {attendanceData.grandTotal.Absent}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        onClick={()=>setShowAttendance(false)}
                        className="btn btn-sm btn-link text-decoration-none d-flex align-items-center gap-1 p-0"
                    >
                        <BiCollapse/>
                        Show Attendance
                    </button>
                </div>
            </DownloadVisibility>
            <DownloadVisibility hidden={showAttendance} hideOnDownload>
                <button
                    onClick={()=>setShowAttendance(true)}
                    className="btn btn-sm btn-link text-decoration-none d-flex align-items-center gap-1 p-0 mt-3"
                >
                    <BiShow/>
                    Show Attendance
                </button>
            </DownloadVisibility>
        </div>        
    );
};
