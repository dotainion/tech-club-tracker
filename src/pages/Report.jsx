import { useEffect, useState } from "react";
import { ReportOverlay } from "../components/RepartOverlay";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { routes } from "../routes/Routes";
import { Downloadable, DownloadButton, DownloadProvider, DownloadVisibility } from "../providers/DownloadProvider";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { DeleteReport } from "../components/DeleteReport";
import { ReportAttendance } from "../components/ReportAttendance";
import { ReportPublishedButton } from "../components/ReportPublishedButton";
import { Page } from "../layout/Page";
import { createPortal } from "react-dom";

export const Report = () => {
    const [report, setReport] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showReportOverlay, setShowReportOverlay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const editReport = () =>{
        setEditMode(true);
        setShowReportOverlay(true);
    }

    useEffect(()=>{
        api.report.list({reportId: params.reportId}).then((response)=>{
            setReport(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [params.reportId]);

    return (
        <Page>
            <DownloadProvider>
                <PageHeader title="Reports" subTitle="Viewing generated report">
                    <PageHeaderItem
                        onClick={()=>setShowReportOverlay(true)}
                        icon="add"
                        title="New Report"
                    />
                    {report && !report.attributes.published && (
                        <>
                            <PageHeaderItem
                                onClick={editReport}
                                icon="edit"
                                title="Edit Report"
                            />
                            <DeleteReport
                                report={report}
                                onSuccess={(e)=>navigate(routes.auth().concat().reports())}
                                onSavingCallback={setSaving}
                            />
                        </>
                    )}
                    <DownloadButton />
                </PageHeader>

                <ReportOverlay
                    show={showReportOverlay}
                    report={report}
                    editMode={editMode}
                    onClose={()=>{
                        setShowReportOverlay(false);
                        setEditMode(false);
                    }}
                    onSuccess={(report)=>{
                        if(report.id === params.reportId) return setReport(report);
                        navigate(routes.auth().concat().report(report.id));
                    }}
                />

                <Spinner show={saving} />

                {loading ? <Spinner show={loading} inline /> : (
                    <>
                        {report ? (
                            <Downloadable>
                                <DownloadVisibility hideOnDownload>
                                    <div className="d-flex align-items-center justify-content-end user-select-none h-100">
                                        <ReportPublishedButton report={report} onSuccess={setReport} allowToggle />
                                    </div>
                                </DownloadVisibility>
                                <div className="text-center mb-4">
                                    <h4 className="fw-bold mb-1">Caribbean Coding Academy</h4>
                                    <p className="mb-0">H.A. Blaize Street, St. George's</p>
                                    <p className="mb-0">Telephone: 473-456-1568 or 437-1568</p>
                                    <p className="mb-0">E-mail: caribbeancodingacademy@gmail.com</p>
                                </div>

                                {/* Report Title */}
                                <div className="text-center mb-5">
                                    <h5 className="fw-bold">
                                        Caribbean Coding Academy Secondary School
                                    </h5>
                                    <h6 className="mb-0">Tech Club Monthly Facilitator Report</h6>
                                </div>

                                {/* Section 1: Report Information */}
                                <div className="card mb-3 p-4 border">
                                    <h6 className="fw-bold mb-3">1. Report Information</h6>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <strong>School Name:</strong>
                                        </div>
                                        <div className="col-md-6">{report.attributes.school.attributes.name}</div>

                                        <div className="col-md-6">
                                            <strong>Facilitator Name(s):</strong>
                                        </div>
                                        <div className="col-md-6">{report.attributes.facilitator.attributes.fullName}</div>

                                        <div className="col-md-6">
                                            <strong>Term:</strong>
                                        </div>
                                        <div className="col-md-6">{report.attributes.term}</div>

                                        <div className="col-md-6">
                                            <strong>Date:</strong>
                                        </div>
                                        <div className="col-md-6">{report.attributes.date}</div>

                                        <div className="col-md-6">
                                            <strong>Number of Sessions Conducted:</strong>
                                        </div>
                                        <div className="col-md-6">{report.attributes.sessions}</div>
                                    </div>
                                </div>

                                {/* Section 2: Focus Areas */}
                                <div className="card mb-3 p-4 border">
                                    <h6 className="fw-bold mb-3">2. Focus Areas This Month</h6>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Topic</th>
                                                    <th>Date</th>
                                                    <th>Lesson Detail</th>
                                                    <th>Group</th>
                                                    <th>Student Engagement & Progress</th>
                                                    <th>Activities & Resources Used</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {report.attributes.focusAreas.map((fa, key)=>(
                                                    <tr key={`fa-${key}`}>
                                                        <td>{fa.attributes.topic}</td>
                                                        <td>{fa.attributes.date}</td>
                                                        <td>{fa.attributes.lessonDetail}</td>
                                                        <td>{fa.attributes.group}</td>
                                                        <td>{fa.attributes.engagement}</td>
                                                        <td>{fa.attributes.resources}</td>
                                                    </tr>
                                                ))}
                                            {/* Add more rows dynamically as needed */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Section 6: Challenges & Constraints */}
                                <div className="card mb-3 p-4 border">
                                    <h6 className="fw-bold mb-3">6. Challenges & Constraints</h6>
                                    <p>{report.attributes.challenges}</p>
                                </div>

                                {/* Section 7: Successes & Notable Outcomes */}
                                <div className="card mb-3 p-4 border">
                                    <h6 className="fw-bold mb-3">7. Successes & Notable Outcomes</h6>
                                    <p>{report.attributes.successes}</p>
                                </div>

                                <ReportAttendance report={report}/>

                                {/* Section 8: Facilitator Declaration */}
                                <div className="card mb-3 p-4 border">
                                    <h6 className="fw-bold mb-3">8. Facilitator Declaration</h6>
                                    <p>
                                        Facilitator Name(s): _______________________________
                                    </p>
                                    <p>
                                        Signature(s): ___________________________________
                                    </p>
                                    <p>
                                        Date: _______________________________
                                    </p>
                                </div>
                            </Downloadable>
                        ):(
                            <NoResultDisplay
                                icon="report"
                                title="Report not found"
                                description="No reports have been generated yet. Once reports are available, they will appear here."
                            />
                        )}
                    </>
                )}
            </DownloadProvider>
        </Page>
    );
};
