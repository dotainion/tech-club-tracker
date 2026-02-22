import { useEffect, useState } from "react";
import { DatePicker } from "../wedgits/DatePicker";
import { api } from "../request/Api";
import { Modal, ModalBody } from "./Modal";
import { Spinner } from "./Spinner";
import { SubmitButton } from "../wedgits/SubmitButton";
import { useAuth } from "../providers/AuthProvider";
import { useLocation, useParams } from "react-router-dom";
import { DelayUi } from "./DelayUi";
import { ParseError } from "../utils/ParseError";
import { CgClose } from "react-icons/cg";

const defaultData = () =>({
    id: null,
    attributes: {
        published: false,
        date: new Date().toISOString().split('T')[0].substring(0, 7),
        term: '',
        sessions: '',
        facilitatorId: null,
        facilitator: {
            id: null,
            attributes: {
                firstName: '',
                lastName: '',
                fullName: ''
            }
        },
        schoolId: null,
        school: {
            id: null,
            attributes: {
                name: ''
            }
        },
        summary: {
            id: null,
            attributes: {
                beginner: '',
                intermediate: '',
                advanced: '',
            }
        },
        focusAreas: [
            {
                attributes: {
                    groupId: '',
                    topic: '',
                    date: new Date().toISOString().split('T')[0].substring(0, 7),
                    lessonDetail: '',
                    engagement: '',
                    resources: '',
                }
            },
        ],
        challenges: '',
        successes: '',
    }
});

export const ReportOverlay = ({ show, report: reportForEditing, editMode, onClose, onSuccess }) => {
    const { user } = useAuth();
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [school, setSchool] = useState(null);
    const [schools, setSchools] = useState([]);
    const [form, setForm] = useState(defaultData());
    const [reportExtracted, setReportExtracted] = useState(null);
    const [extractedError, setExtractedError] = useState(null);

    const params = useParams();
    const location = useLocation();

    const close = () =>{
        setError(null);
        setExtractedError(null);
        setForm(defaultData());
        onClose?.();
    }

    const update = (field, value) =>{
        setForm((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [field]: value
            }
        }));
    }

    const updateFocus = (i, field, value) => {
        const copy = [...form.attributes.focusAreas];
        copy[i].attributes[field] = value;
        setForm((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                focusAreas: copy
            }  
        }));
    };

    const addFocusRow = () =>{
        setForm((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                focusAreas: [
                    ...prev.attributes.focusAreas,
                    {
                        attributes: {
                            roupId: '',
                            topic: '',
                            date: '',
                            lessonDetail: '',
                            engagement: '',
                            resources: '',
                        }
                    },
                ],
            }
        }));
    }

    const removeFocusRow = (i) =>{
        setForm((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                focusAreas: prev.attributes.focusAreas.filter((_, index) => index !== i),
            }
        }));
    }
    
    const onSelect = (e) =>{
        setSchool(schools.find((s)=>s.id === e.target.value));
    }

    const extractPreviousReport = (timeout=0, month=1) =>{
        setLoading(true);
        const date = new Date();
        date.setMonth(date.getMonth() - month);
        const data = {
            facilitatorId: user.id,
            date: date.toISOString().split('T')[0].substring(0, 7)
        }
        api.report.list(data).then((response)=>{
            setForm(response.data.data[0]);
            setReportExtracted(response.data.data[0]);
        }).catch((error)=>{
            if(timeout < 5){
                return extractPreviousReport(timeout +1, month);
            }
            setError('No previous report to be extracted.');
            setExtractedError(true);
        }).finally(()=>setLoading(false));
    }

    const clearPreviousReportExtraction = () =>{
        setLoading(true);
        setError(null);
        setExtractedError(null);

        new Promise((resolve)=>{
            setTimeout(()=>{
                setForm(defaultData());
                setReportExtracted(null);
                setLoading(false);
                resolve();
            }, 500);
        });
    }

    const submit = () => {
        setSaving(true);
        setError(null);
        const data = {
            ...form.attributes,
            ...form.attributes.summary.attributes,
            focusAreas: form.attributes.focusAreas.map((fa)=>({
                ...fa.attributes, 
                focusAreaId: fa.id || null
            })),
            reportId: form.id,
            schoolId: school.id,
            facilitatorId: user.id,
            published: false
        }
        api.report.set(data).then((response)=>{
            setForm(response.data.data[0]);
            onSuccess?.(response.data.data[0]);
            close?.();
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    };

    const defaultSummary = () =>{
        //once new group is crated it will get added by this code..
        //no need to do it manually.. just add the attribues in the backend summary object.
        let summaries = {}
        let sessions = {};
        school && school.attributes.groups.forEach((group)=>{
            const attribute = group.attributes.name.toLowerCase();
            summaries[attribute] = group.attributes.students.length;

            group.attributes.students.forEach((student)=>{
                student.attributes.attendances.forEach((attendance)=>{
                    sessions[attendance.attributes.date] = attendance;
                });
            });
        });

        const defaultReport = defaultData();
        return {
            ...defaultReport,
            attributes: {
                ...defaultReport.attributes,
                sessions: Object.keys(sessions).length,
                summary: {
                    attributes: summaries
                }
            }
        }
    }

    useEffect(()=>{
        if(location.state?.schoolId){
            onSelect({target: { value: location.state.schoolId}});
        }
        setForm(defaultSummary());
    }, [params]);// removed schools dependency here

    useEffect(()=>{
        if(!editMode){
            setForm(defaultSummary());
            return;
        }
        if(!reportForEditing){
            setSchool(null);
            setForm(defaultSummary());
            return;
        }

        onSelect({
            target: {
                value: reportForEditing.attributes.schoolId
            }
        });
        setForm({
            ...reportForEditing,
            attributes: {
                ...reportForEditing.attributes,
                date: reportForEditing.attributes.date.substring(0, 7),
                focusAreas: reportForEditing.attributes.focusAreas.map((fa)=>({
                    ...fa,
                    attributes: {
                        ...fa.attributes,
                        date: fa.attributes.date.substring(0, 10),
                    }
                }))
            }
        });
    }, [show, reportForEditing, editMode]);

    useEffect(()=>{
        const dateValue = form.attributes.date.substring(0, 7);
        api.school.list({userId: user.id, date: dateValue}).then((response)=>{
            if(response.data.data.length === 1){
                setSchool(response.data.data[0]);
            }
            setSchools(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [form.attributes.date]);

    if(loading) return(
        <Spinner show />
    )

    if(!show) return null;

    if (!school) return(
        <DelayUi show miliseconds={50}>
            <div onClick={close} className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-10">
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <div onClick={e=>e.stopPropagation()} className="bg-white rounded-4 p-4">
                        <h5>To create a report a school must first be chosen.</h5>
                        <label className="form-label fw-semibold">Schools</label>
                        <select onChange={onSelect} className="form-control form-select" defaultValue="">
                            <option value="" hidden>Please select a school</option>
                            {schools.map((school)=>(
                                <option
                                    value={school.id}
                                    key={school.id}
                                >{school.attributes.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </DelayUi>
    );

    return (
        <Modal show={show} onClose={close} useBackdropDismist>
            {/* SCHOOL + DATE */}
            <ModalBody className="py-0">
                <div className="position-sticky top-0 bg-white mb-3 pt-3 pb-2" style={{zIndex: 1}}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="fw-bold mb-0">{school.attributes.name}</h6>
                            <small className="text-muted">Tech Club Monthly Facilitator Report</small>
                        </div>
                        {!editMode && (
                            <>
                                {reportExtracted ? (
                                    <button
                                        onClick={clearPreviousReportExtraction}
                                        className="btn btn-sm text-decoration-none btn-link"
                                    >Bank report</button>
                                ):(
                                    <button
                                        onClick={()=>extractPreviousReport()}
                                        className="btn btn-sm text-decoration-none btn-link"
                                    >Extract from previouse report</button>
                                )}                                
                            </>
                        )}
                    </div>
                    {error && (
                        <div className="position-relative">
                            <div className="position-absolute top-0 w-100 bg-white rounded-3 overflow-hidden">
                                <div className="bg-danger bg-opacity-10 w-100 h-100 p-3">
                                    <div className="text-center text-danger">{error}</div>
                                    {extractedError && (
                                        <div className="d-flex justify-content-end gap-2 mt-3 bg-white p-2 rounded-1">
                                            <button
                                                onClick={clearPreviousReportExtraction}
                                                className="btn btn-sm btn-outline-primary px-3"
                                            >Use blank report</button>
                                            <button
                                                onClick={close}
                                                className="btn btn-sm btn-outline-primary px-3"
                                            >Cancel</button>
                                        </div>
                                    )}
                                    <button onClick={()=>setError(null)} className="position-absolute top-0 end-0 btn p-0 me-1">
                                        <CgClose className="fs-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border rounded-4 p-3 mb-4">
                    <h6 className="fw-bold mb-3">1. Monthly Report Date</h6>
                    <DatePicker
                        value={form.attributes.date}
                        onChange={(e)=>update('date', e.target.value)}
                        month
                    />
                    <div className="small text-muted mt-2">Records like attendances will be pull based on the selected month.</div>
                </div>

                {/* REPORT INFO */}
                <div className="border rounded-4 p-3 mb-4">
                    <h6 className="fw-bold mb-3">1. Report Information</h6>

                    <div className="row g-3">
                        <div className="col-md-6">
                        <label className="form-label">School Term</label>
                            <select
                                className="form-select pointer"
                                value={form.attributes.term}
                                onChange={(e)=>update('term', e.target.value)}
                            >
                                <option value="" hidden>Select term</option>
                                {['Michaelmas Term', 'Lent Term', 'Trinity Term'].map((term)=>(
                                    <option key={term}>{term}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Number of Sessions Conducted</label>
                            <input
                                type="number"
                                className="form-control shadow-none pointer-not-allowed border"
                                value={form.attributes.sessions}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* FOCUS AREAS */}
                <div className="border rounded-4 p-3 mb-4">
                    <h6 className="fw-bold mb-3">3. Focus Areas</h6>
                    <small>*Add rows based on the number of topics covered</small>
                    {form.attributes.focusAreas.map((row, i) => (
                        <div key={i} className="border rounded p-2 mb-3">
                            <div className="row g-2">
                                <div className="col-md-3">
                                    <input
                                        className="form-control"
                                        placeholder="Topic"
                                        value={row.attributes.topic}
                                        onChange={(e)=>updateFocus(i, 'topic', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={row.attributes.date}
                                        onChange={(e)=>updateFocus(i, 'date', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        className="form-control"
                                        placeholder="Lesson Detail"
                                        value={row.attributes.lessonDetail}
                                        onChange={(e)=>updateFocus(i, 'lessonDetail', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <select onChange={(e)=>updateFocus(i, 'groupId', e.target.value)} className="form-control form-select">
                                        <option hidden value="">Select a group</option>
                                        {school.attributes.groups.map((group)=>(
                                            <option value={group.id} key={group.id}>{group.attributes.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <input
                                        className="form-control"
                                        placeholder="Student Engagement & Progress"
                                        value={row.attributes.engagement}
                                        onChange={(e)=>updateFocus(i, 'engagement', e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        className="form-control"
                                        placeholder="Activities & Resources Used"
                                        value={row.attributes.resources}
                                        onChange={(e)=>updateFocus(i, 'resources', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={()=>removeFocusRow(i)} className="btn btn-sm btn-outline-danger mt-2">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button  onClick={addFocusRow} className="btn btn-sm btn-outline-primary">
                        + Add Focus Area
                    </button>
                </div>

                {/* CHALLENGES */}
                <div className="border rounded-4 p-3 mb-4">
                    <h6 className="fw-bold mb-2">4. Challenges & Constraints</h6>
                    <textarea
                        className="form-control"
                        rows={3}
                        value={form.attributes.challenges}
                        onChange={(e)=>update("challenges", e.target.value)}
                    />
                </div>

                {/* SUCCESSES */}
                <div className="border rounded-4 p-3 mb-4">
                    <h6 className="fw-bold mb-2">5. Successes & Notable Outcomes</h6>
                    <textarea
                        className="form-control"
                        rows={3}
                        value={form.attributes.successes}
                        onChange={(e)=>update("successes", e.target.value)}
                    />
                </div>

                {/* ACTIONS */}
                <div className="position-sticky bottom-0 bg-white d-flex justify-content-end gap-2 pb-4 pt-2">
                    <button onClick={close} className="btn btn-sm btn-outline-secondary px-4">
                        Close
                    </button>
                    <SubmitButton onClick={submit} loading={saving}>Save</SubmitButton>
                </div>
            </ModalBody>
        </Modal>
    );
};
