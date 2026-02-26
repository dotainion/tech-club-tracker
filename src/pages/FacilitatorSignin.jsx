import { useEffect, useState } from "react"
import { PageHeader, PageHeaderItem } from "../components/PageHeader"
import { Page } from "../layout/Page"
import { routes } from "../routes/Routes"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import { api } from "../request/Api"
import { dateTime } from "../utils/DateTime"
import { Spinner } from "../components/Spinner"
import { SubmitButton } from "../widgets/SubmitButton"
import { ParseError } from "../utils/ParseError"
import { GrClose } from "react-icons/gr"

export const FacilitatorSignin = () => {
    const { user } = useAuth();

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [editTimeMode, setEditTimeMode] = useState(false);
    const [manualTime, setManualTime] = useState(currentTime.toISOString().substring(0, 16));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [log, setLog] = useState(null);

    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = currentTime.getHours()
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    const clockIn = (time) => {
        setSaving(true);
        const data = {
            userId: user.id,
            in: time ? time : dateTime.now().format('ymd h:m:s').toString(),
        }
        api.clock.set(data).then((response)=>{
            setError(null);
            setLog(response.data.data[0]);
            setIsClockedIn(true);
            setEditTimeMode(false);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    }

    const clockOut = (time) => {
        if(!log) return console.error('You have not clock in yet.');
        setSaving(true);
        const data = {
            clockId: log.id,
            ...log.attributes,
            out: time ? time : dateTime.now().format('ymd h:m:s').toString(),
        }
        api.clock.set(data).then((response)=>{
            setError(null);
            setLog(null);
            setIsClockedIn(false);
            setEditTimeMode(false);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setSaving(false));
    }

    const manualChange = (e) =>{
        const time = dateTime.set(new Date(e.target.value)).format('ymd h:m:s').toString();
        if(isClockedIn) return clockOut(time);
        clockIn(time);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
            if (!editTimeMode) setManualTime(new Date().toISOString().substring(0, 16))
        }, 1000)
        return () => clearInterval(timer)
    }, [editTimeMode]);

    useEffect(()=>{
        const data = {
            userId: user.id,
            active: true
        }
        api.clock.list(data).then((response)=>{
            setLog(response.data.data[0]);
            setIsClockedIn(true);
            setEditTimeMode(false);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    return (
        <Page>
            <PageHeader
                title="Facilitator Daily Sign-In"
                subTitle="Record your attendance for today"
            >
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().attendance())}
                    icon="back"
                    title="Go Back"
                />
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().facilitatorLogs())}
                    icon="log"
                    title="User Logs"
                />
            </PageHeader>

            {loading ? <Spinner show inline /> : (
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 text-center">
                            <h4 className="fw-bold mb-3">{getGreeting()}, {user.attributes.firstName}</h4>

                            {/* Current Time Display */}
                            <div className="text-muted mb-4">
                                <div className="d-flex justify-content-center gap-2 fw-semibold">
                                    <div className="">Current Time</div>
                                    <div className="">{currentTime.toLocaleTimeString()}</div>
                                </div>
                                {log && (
                                    <div className="d-flex justify-content-center gap-2 fw-semibold">
                                        <div className="">Clock In:</div>
                                        <div className="">{new Date(log.attributes.in.replace(' ', 'T')).toLocaleTimeString()}</div>
                                    </div>
                                )}
                            </div>

                            {!editTimeMode && (
                                <div className="row">
                                    <div className="col-12">
                                        {isClockedIn ? (
                                            <SubmitButton onClick={()=>clockOut()} className="w-100" bg="danger" loading={saving} md>
                                                Clock Out
                                            </SubmitButton>
                                        ):(
                                            <SubmitButton onClick={()=>clockIn()} className="w-100" bg="success" loading={saving} md>
                                                Clock In
                                            </SubmitButton>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="d-flex justify-content-end mt-2">
                                {editTimeMode && (
                                    <input
                                        onChange={manualChange}
                                        onClick={(e)=>{
                                            e.target.focus();
                                            e.target.showPicker?.();
                                        }}
                                        className="form-control form-control-sm me-2"
                                        type="datetime-local"
                                        value={manualTime}
                                    />
                                )}
                                {editTimeMode ? (
                                    <button
                                        onClick={()=>setEditTimeMode(false)}
                                        className="btn btn-outline-dark btn-sm"
                                        title="Edit Time"
                                        type="button"
                                    >
                                        <GrClose />
                                    </button>
                                ):(
                                    <button
                                        onClick={()=>setEditTimeMode(true)}
                                        className="btn btn-outline-dark btn-sm"
                                        title="Edit Time"
                                        type="button"
                                    >
                                        ✏️
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {error && (
                <div className="toast show position-fixed bottom-0 end-0 m-4 shadow" style={{zIndex: 9999}} role="alert">
                    <div className="d-flex toast-body text-danger py-3">
                        <div className="me-auto">{error}</div>
                        <button onClick={()=>setError(null)} className="btn-close" type="button" />
                    </div>
                </div>
            )}
        </Page>
    )
}