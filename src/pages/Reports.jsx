import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { ReportOverlay } from "../components/RepartOverlay";
import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { api } from "../request/Api";
import { SpinnerConditional } from "../components/SpinnerConditional";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { useAuth } from "../providers/AuthProvider";
import reportImg from "../images/report.png";
import { DeleteReport } from "../components/DeleteReport";
import { CgClose } from "react-icons/cg";
import { AddButton } from "../wedgits/AddButton";
import { StackFilter } from "../wedgits/StackFilter";
import { Page } from "../layout/Page";

export const Reports = () => {
    const { user } = useAuth();

    const [reports, setReports] = useState([]);
    const [showReportOverlay, setShowReportOverlay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        limit: 100,
        date: new Date().toISOString().split('T')[0].substring(0, 7),
        published: null
    });
    
    const navigate = useNavigate();
    const location = useLocation();

    const timeoutRef = useRef();

    const filterReportOnDelete = (report) =>{
        setReports((prevReports)=>prevReports.filter((prev)=>prev.id !== report.id));
    }

    useEffect(()=>{
        if(location.state?.schoolId){
            setShowReportOverlay(true);
        }
        setLoading(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.report.list({facilitatorId: user.id, ...filter}).then((response)=>{
                setReports(response.data.data);
            }).catch((error)=>{
                setReports([]);
            }).finally(()=>setLoading(false));
        }, 500);
    }, [filter]);

    return (
        <Page>
            <PageHeader title="Report" subTitle="View and generate reports">
                <PageHeaderButton onClick={(e)=>setShowReportOverlay(true)}>
                    + New report
                </PageHeaderButton>
                <PageHeaderButton onClick={(e)=>navigate(routes.auth().concat().home())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            <div className="d-flex justify-content-center mb-4">
                <StackFilter
                    defaultValues={filter}
                    onChange={setFilter}
                />
            </div>

            <SpinnerConditional loading={loading}>
                <div className="row">
                    {reports.length > 0 && (
                        <AddButton
                            onClick={(e)=>setShowReportOverlay(true)}
                            className="p-2"
                        />
                    )}
                    {
                        reports.length ?
                        reports.map((report) => (
                            <div key={report.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                                <div
                                    onClick={()=>navigate(routes.auth().concat().report(report.id))}
                                    className="card on-hover pointer border h-100 position-relative"
                                >
                                    <img src={reportImg} className="w-100 h-100" />
                                    <div className="px-4 py-2">
                                        <h6 className="mb-0 text-truncate" title={report.attributes.school.attributes.name}>
                                            {report.attributes.school.attributes.name}
                                        </h6>
                                        <small className="text-muted text-truncate">{report.attributes.date}</small>
                                    </div>
                                    <div className="position-absolute top-0 start-0 user-select-none mt-2 ms-2">
                                    <span className={`badge bg-${report.attributes.published ? 'primary' : 'secondary'}`} style={{fontSize: '9px'}}>
                                        {report.attributes.published ? 'Published' : 'Draft'}
                                    </span>
                                    </div>
                                    <div className="on-hover-show position-absolute top-0 end-0 mt-2 me-2">
                                        <DeleteReport className="p-1 pt-0 border-0" report={report} onSuccess={filterReportOnDelete}>
                                            <CgClose className="fs-5" />
                                        </DeleteReport>
                                    </div>
                                </div>
                            </div>
                        )):
                        <NoResultDisplay
                            icon="report"
                            title="No report available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            <div className="py-3">
                                <button className="btn btn-sm btn-outline-dark px-4 rounded-pill" onClick={(e)=>setShowReportOverlay(true)}>
                                    + New report
                                </button>
                            </div>
                        </NoResultDisplay>
                    }
                </div>
            </SpinnerConditional>
            <ReportOverlay
                show={showReportOverlay}
                onClose={()=>setShowReportOverlay(false)}
                onSuccess={(report)=>navigate(routes.auth().concat().report(report.id))}
            />
        </Page>
    );
};
