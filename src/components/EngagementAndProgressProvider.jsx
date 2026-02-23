import { createContext, useContext, useEffect, useRef, useState } from "react";
import { routes } from "../routes/Routes";
import { DatePicker } from "../wedgits/DatePicker";
import { SubmitButton } from "../wedgits/SubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegFileAlt, FaPlusCircle } from "react-icons/fa";
import { api } from "../request/Api";
import { useAuth } from "../providers/AuthProvider";
import { ParseError } from "../utils/ParseError";
import { Spinner } from "../components/Spinner";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { GrGroup } from "react-icons/gr";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { NoResultDisplay } from "./NoResultDisplay";
import { PageHeaderItem } from "./PageHeader";
import { dateTime } from "../utils/DateTime";

const Context = createContext();

export const EngagementAndProgressProvider = ({children}) => {
    const { user } = useAuth();
    const { containsDefaultRouteId } = useRouteDetective();

    const [draftReport, setDraftReport] = useState(null);
    const [draftReports, setDraftReports] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingDraft, setIsAnimatingDraft] = useState(false);
    const [creatingDraft, setCreatingDraft] = useState(false);
    const [toast, setToast] = useState(null);
    const [school, setSchool] = useState(null);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stash, setStash] = useState({
        reports: [],
        draft: null
    });

    const hasDraft = !!draftReport;
    const focusAreas = draftReport?.attributes.focusAreas || [];
    const currentFocus = focusAreas[currentIndex];

    const params = useParams();

    const createEmptyFocusArea = () => ({
        id: null,
        isSaved: false,
        attributes: {
            groupId: '',
            topic: '',
            date: dateTime.now().format('ymd').toString(),
            lessonDetail: '',
            engagement: '',
            resources: '',
        },
    });

    const triggerToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleCreateDraft = () => {
        if(containsDefaultRouteId()){
            return setToast('Please select a school.');
        }
        setLoading(true);
        const data = {
            reportId: null,
            schoolId: params.schoolId,
            facilitatorId: user.id,
            term: '',
            date: dateTime.now().format('ym').toString(),
            sessions: 0,
            challenges: '',
            successes: '',
            hide: false,
            published: false,
            //summary
            beginner: 0,
            intermediate: 0,
            advanced: 0,
            //focus areas
            focusAreas: [],
        }

        api.report.set(data).then((response)=>{
            setDraftReport(fromReportsMarkFocusAreaAsSaved(response.data.data)[0]);
        }).catch((error)=>{
            setToast(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    };

    const triggerAnimation = (callback) => {
        setIsAnimating(true);
        setTimeout(() => {
            callback();
            setTimeout(() => setIsAnimating(false), 50);
        }, 200);
    };

    const triggerAnimationDraft = (callback) => {
        setIsAnimatingDraft(true);
        setTimeout(() => {
            callback();
            setTimeout(() => setIsAnimatingDraft(false), 50);
        }, 200);
    };

    const fromReportsMarkFocusAreaAsSaved = (reports) =>{
        return reports.map((report)=>({
            id: report.id,
            attributes: {
                ...report.attributes,
                focusAreas: report.attributes.focusAreas.map((focusArea)=>({
                    ...focusArea,
                    isSaved: true
                }))
            }
        }));
    };

    const handleAddNew = () => {
        if (!hasDraft) return;
        if (currentFocus && !currentFocus.isSaved) {
            triggerToast('Please save the current entry before adding a new one.');
            return;
        }

        triggerAnimation(() => {
            const newEntry = createEmptyFocusArea();
            const updated = [...focusAreas, newEntry];

            setDraftReport({
                ...draftReport,
                attributes: {
                    ...draftReport.attributes,
                    focusAreas: updated,
                },
            });
            setCurrentIndex(updated.length - 1);
        });
    };

    const handleChange = (field, value) => {
        const updatedFocusAreas = [...focusAreas];
        updatedFocusAreas[currentIndex] = {
            ...updatedFocusAreas[currentIndex],
            attributes: {
                ...updatedFocusAreas[currentIndex].attributes,
                [field]: value,
            },
            isSaved: false,
        };

        setDraftReport({
            ...draftReport,
            attributes: {
                ...draftReport.attributes,
                focusAreas: updatedFocusAreas,
            },
        });
    };

    const handleSave = () => {
        setLoading(true);
        const data = {
            ...draftReport.attributes,
            ...draftReport.attributes.summary.attributes,
            focusAreas: focusAreas.map((focusAreas)=>({
                ...focusAreas.attributes, 
                focusAreaId: focusAreas.id || null
            })),
            reportId: draftReport.id,
        }

        api.report.set(data).then((response)=>{
            const draft = fromReportsMarkFocusAreaAsSaved(response.data.data)[0];
            setDraftReport(draft);
            setDraftReports((prevs)=>prevs.map((prevDraft)=>{
                return prevDraft.id === draft.id ? draft : prevDraft
            }));
        }).catch((error)=>{
            setToast(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    };

    const changeSchool = () =>{
        setCreatingDraft(true);
        setDraftReport(null);
        setDraftReports([]);
    };

    const reuseStash = () =>{
        setCreatingDraft(false);
        setDraftReport(stash.draft);
        setDraftReports(stash.reports);
    };

    const goPrevious = () => {
        if (currentIndex === 0) return;
        triggerAnimation(() => setCurrentIndex((prev) => prev - 1));
    };

    const goNext = () => {
        if (currentIndex === focusAreas.length - 1) return;
        triggerAnimation(() => setCurrentIndex((prev) => prev + 1));
    };

    const values = {
        hasDraft,
        toast,
        setToast,
        draftReport,
        draftReports,
        setDraftReport,
        triggerAnimationDraft,
        setCreatingDraft,
        changeSchool,
        currentFocus,
        handleChange,
        handleSave,
        school,
        loading,
        isAnimatingDraft,
        schools,
        stash,
        handleCreateDraft,
        reuseStash,
        handleAddNew,
        focusAreas,
        goPrevious,
        goNext,
        currentIndex,
        isAnimating,
        creatingDraft,
        triggerAnimation
    }

    useEffect(()=>{
        if(containsDefaultRouteId() || !schools.length) return;
        setSchool(schools.find((s)=>s.id === params.schoolId));
    }, [schools, params.schoolId]);

    useEffect(()=>{
        api.school.list({userId: user.id}).then((response)=>{
            setSchools(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    useEffect(()=>{
        api.report.list({facilitatorId: user.id, published: false}).then((response)=>{
            const draftReportsCopies = fromReportsMarkFocusAreaAsSaved(response.data.data);
            setSchool(draftReportsCopies[0].attributes.school);
            setDraftReport(draftReportsCopies[0]);
            setDraftReports(draftReportsCopies);
            setStash((prev)=>({
                ...prev,
                reports: draftReportsCopies,
                draft: draftReportsCopies[0]
            }));
        }).catch((error)=>{
            
        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return <Spinner show inline />;

    return (
        <Context.Provider value={values}>
            {children}
            <EngagementAndProgressToast />
            <EngagementAndProgressSchoolDisplay />
            <EngagementAndProgressNavigatorBar />

            <div className="row justify-content-center mt-4">
                <div className="col-lg-8">
                    <EngagementAndProgressNoDraftCard />
                    <EngagementAndProgressNoEntryCard />

                    {school && school.attributes.groups.length ? (
                        <EngagementandProgressEntryExistCard />
                    ):(
                        <EngagementAndProgressNoGroupFound />
                    )}
                </div>
            </div>
        </Context.Provider>
    );
};

const EngagementAndProgressSchoolDisplay = () =>{
    const { school } = useContext(Context);
    if(!school) return null;
    return(
        <div className="mb-2">
            <h6>{school.attributes.name}</h6>
        </div>
    )
}

const EngagementAndProgressToast = () =>{
    const { toast, setToast } = useContext(Context);
    if(!toast) return null;
    return(
        <div className="toast show position-fixed bottom-0 end-0 m-4 shadow" style={{zIndex: 9999}} role="alert">
            <div className="d-flex toast-body text-danger py-3">
                <div className="me-auto">{toast}</div>
                <button onClick={()=>setToast(null)} className="btn-close" type="button" />
            </div>
        </div>
    )
}

export const AddNewEntry = () =>{
    const { hasDraft, handleAddNew } = useContext(Context);
    if(!hasDraft) return null;
    return (
        <PageHeaderItem
            onClick={handleAddNew}
            icon="add"
            title="New Entry"
        />
    )
}

const EngagementAndProgressNavigatorBar = () =>{
    const { draftReport, draftReports, setDraftReport, changeSchool, triggerAnimation } = useContext(Context);
    
    const [isScrollable, setIsScrollable] = useState(false);

    const navigate = useNavigate();

    const scrollRef = useRef();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const left = (e) =>{
        scrollRef.current.scroll({
            left: scrollRef.current.scrollLeft + 70,
            behavior: 'smooth'
        });
    }

    const right = () =>{
        scrollRef.current.scroll({
            left: scrollRef.current.scrollLeft - 70,
            behavior: 'smooth'
        });
    }

    const getMonth = (report) =>{
        const dataString = report.attributes.date.split(' ')[0];
        const date = new Date(dataString);
        return months[date.getMonth()];
    }

    useEffect(()=>{
        if(!scrollRef.current) return;
        const width = scrollRef.current.clientWidth;
        const scrollWidth = scrollRef.current.scrollWidth;
        setIsScrollable(scrollWidth > width);
    }, [draftReports]);

    if(!draftReports.length) return null;
    return(
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="small">Available draft reports</div>
                <button
                    onClick={changeSchool}
                    className="btn btn-sm btn-outline-primary"
                >🏫 Change School</button>
            </div>
            <div ref={scrollRef} className="d-flex overflow-auto text-nowrap rounded-2 scrollbar-none border-bottom">
                {isScrollable && (
                    <span className="bg-white position-sticky top-0 start-0 me-1" style={{zIndex: 1000}}>
                        <button onClick={left} className="btn btn-sm btn-outline-dark border rounded-circle d-flex align-items-center justify-content-center h-100">
                            <BiCaretLeft />
                        </button>
                    </span>
                )}
                {draftReports.map((report)=>(
                    <button
                        onClick={()=>triggerAnimation(()=>setDraftReport(report))}
                        className={`btn btn-sm rounded-bottom-0 rounded-top-3 ${draftReport.id === report.id ? 'bg-primary text-white border-0' : 'btn-outline-dark border'} position-relative`}
                        disabled={draftReport.id === report.id}
                        title={report.attributes.date.split(' ')[0]}
                        key={report.id}
                    >
                        {getMonth(report)}
                    </button>
                ))}
                {isScrollable && (
                    <span className="bg-white position-sticky top-0 end-0 ms-1" style={{zIndex: 1000}}>
                        <button onClick={right} className="btn btn-sm btn-outline-dark border rounded-circle d-flex align-items-center justify-content-center h-100">
                            <BiCaretRight />
                        </button>
                    </span>
                )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <a onClick={()=>navigate(routes.auth().concat().report(draftReport.id))} className="small text-decoration-none pointer">
                    View {getMonth(draftReport)} Report
                </a>
            </div>
            <hr className="border"></hr>
        </>
    )
}

const EngagementAndProgressNoGroupFound = () =>{
    const { draftReport, school } = useContext(Context);

    const navigate = useNavigate();

    if(!draftReport) return null;
    return(
        <div className="card shadow-sm border-0 rounded-4 text-center p-5">
            <div className="card-body">
                <div className="mb-3 fs-1">
                    <GrGroup />
                </div>
                <h5 className="fw-semibold mb-2">No group found</h5>
                <p className="text-muted mb-4">
                    The selected school is not related to a group.
                </p>
                <div className="d-flex justify-content-center">
                    <button onClick={()=>navigate(routes.admin().concat().assignToGroup(school.id))} className="btn btn-sm btn-primary px-4">
                        Assign a group
                    </button>
                </div>
            </div>
        </div>
    )
}

const EngagementAndProgressNoReportFound = () =>{
    const { triggerAnimationDraft, setCreatingDraft } = useContext(Context);
    return(
        <>
            <h5 className="fw-semibold mb-2">
                No draft report found for the month
            </h5>
            <p className="text-muted mb-4">
                You must create a draft report before adding engagement entries.
            </p>
            <div className="d-flex justify-content-center">
                <button onClick={()=>triggerAnimationDraft(()=>setCreatingDraft(true))} className="btn btn-sm btn-primary px-4">
                    Create Draft Report
                </button>
            </div>
        </>
    )
}

const EngagementAndProgressEntry = () =>{
    const { currentFocus, handleChange, handleSave, school, loading } = useContext(Context);
    return(
        <>
            <div className="card border mb-3">
                <div className="card-body p-sm-4">
                    <div className="mb-3">
                        <label className="form-label fw-medium me-3">Date</label>
                        <DatePicker
                            value={currentFocus.attributes.date}
                            onChange={(date)=>handleChange("date", date)}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Topic</label>
                            <input
                                className="form-control"
                                value={currentFocus.attributes.topic}
                                onChange={(e)=>handleChange("topic", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium">Group</label>
                            {school && (
                                <select onChange={(e)=>handleChange('groupId', e.target.value)} className="form-control form-select" value={currentFocus.attributes.groupId}>
                                    <option hidden value="" >Select a group</option>
                                    {school.attributes.groups.map((s)=>(
                                        <option value={s.id} key={s.id}>{s.attributes.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                </div>
            </div>
                    
            <div className="card border mb-3">
                <div className="card-body p-sm-4">
                    <div className="mb-3">
                        <label className="form-label fw-medium">Lesson Detail</label>
                        <textarea
                            rows={3}
                            className="form-control"
                            value={currentFocus.attributes.lessonDetail}
                            onChange={(e)=>handleChange("lessonDetail", e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Student Engagement & Progress</label>
                        <textarea
                            rows={3}
                            className="form-control"
                            value={currentFocus.attributes.engagement}
                            onChange={(e)=>handleChange("engagement", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium">Activities & Resources Used</label>
                        <textarea
                            rows={3}
                            className="form-control"
                            value={currentFocus.attributes.resources}
                            onChange={(e)=>handleChange("resources", e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <SubmitButton onClick={handleSave} loading={loading}>
                            {currentFocus.isSaved ? 'Saved ✓' : 'Save Entry'}
                        </SubmitButton>
                    </div>
                </div>
            </div>
        </>
    )
}

const EngagementAndProgressNoDraftCard = () =>{
    const {
        hasDraft,
        isAnimatingDraft,
        creatingDraft,
        setCreatingDraft,
        schools,
        stash,
        handleCreateDraft,
        loading,
        triggerAnimationDraft,
        reuseStash
    } = useContext(Context);
    const { containsDefaultRouteId } = useRouteDetective();

    const [schoolId, setSchoolId] = useState(null);
    
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(containsDefaultRouteId()) setSchoolId('');
        else setSchoolId(params.schoolId);
    }, [params.schoolId]);

    if(hasDraft) return null;
    return(
        <div
            className="text-center p-5"
            style={{
                opacity: isAnimatingDraft ? 0 : 1,
                transform: isAnimatingDraft ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
            }}
        >
            {schools.length > 0 ? (
                <>
                    {isAnimatingDraft ? (
                        <div className="text-center py-5">
                            <Spinner show inline />
                        </div>
                    ):(
                        <>
                            <div className="mb-3 text-primary fs-1">
                                <FaRegFileAlt />
                            </div>
                            {creatingDraft ? (
                                <>
                                    <h5 className="fw-semibold mb-2">
                                        Select a school
                                    </h5>
                                    <p className="text-muted mb-4">
                                        Select a school in order to start a monthly report.
                                    </p>
                                    <div className="d-flex justify-content-center mb-5">
                                        <select
                                            onChange={(e)=>navigate(routes.auth().concat().engagementAndProgress(e.target.value))}
                                            className="form-control form-select w-auto"
                                            value={schoolId}
                                        >
                                            <option hidden value="">Select a school</option>
                                            {schools.map((school)=>(
                                                <option value={school.id} key={school.id}>{school.attributes.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            {stash.draft ? (
                                                <button onClick={reuseStash} className="btn btn-sm btn-secondary px-4">
                                                    Cancel
                                                </button>
                                            ):(
                                                <button onClick={()=>triggerAnimationDraft(()=>setCreatingDraft(false))} className="btn btn-sm btn-secondary px-4">
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                        <SubmitButton onClick={handleCreateDraft} loading={loading}>
                                            Submit
                                        </SubmitButton>
                                    </div>
                                </>
                            ):(
                                <EngagementAndProgressNoReportFound />
                            )}
                        </>
                    )}
                </>
            ):(
                <NoResultDisplay
                    mt="0"
                    icon="school"
                    title="No schools available"
                    description="You might have not been assign to any school. Please contact your administration for assistance."
                />
            )}
        </div>
    )
}

const EngagementAndProgressNoEntryCard = () =>{
    const { handleAddNew, hasDraft, focusAreas, school } = useContext(Context);

    if(hasDraft && focusAreas.length === 0 && school && school.attributes.groups.length > 0) return(
        <EngagementAndProgressAnimation>
            <div className="text-center p-5">
                <div className="mb-3 text-success fs-1">
                    <FaPlusCircle />
                </div>
                <h5 className="fw-semibold mb-2">
                    No Entries Yet
                </h5>
                <p className="text-muted mb-4">
                    Start by adding your first daily engagement entry.
                </p>
                <div className="d-flex justify-content-center">
                    <button onClick={handleAddNew} className="btn btn-sm btn-primary px-4">
                        + Add First Entry
                    </button>
                </div>
            </div>
        </EngagementAndProgressAnimation>
    );
    return null;
}

const EngagementandProgressEntryExistCard = () =>{
    const { hasDraft, handleAddNew, focusAreas, goPrevious, goNext, currentIndex, isAnimating } = useContext(Context);

    if(hasDraft && focusAreas.length > 0) return(
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    <button onClick={goPrevious} className="btn btn-outline-secondary" disabled={currentIndex === 0 || isAnimating}>
                        ←
                    </button>
                    <button onClick={goNext} className="btn btn-outline-secondary" disabled={currentIndex === focusAreas.length - 1 || isAnimating}>
                        →
                    </button>
                </div>
                <span className="badge bg-primary rounded-pill px-3 py-2">
                    {currentIndex + 1} / {focusAreas.length}
                </span>
                <button onClick={handleAddNew} className="btn btn-sm btn-outline-primary" disabled={isAnimating}>
                    + New Entry
                </button>
            </div>

            {/* Animated Card */}
            <EngagementAndProgressAnimation>
                <EngagementAndProgressEntry />
            </EngagementAndProgressAnimation>
        </>
    )
}

const EngagementAndProgressAnimation = ({children}) =>{
    const { isAnimating } = useContext(Context);
    return(
        <div
            style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.25s ease',
            }}
        >
            {
                isAnimating ? (
                    <div className="text-center py-5">
                        <Spinner show inline />
                    </div>
                ) : children
            }
        </div>
    )
}
