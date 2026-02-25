import { useEffect, useRef, useState } from "react";
import { PageHeader, PageHeaderItem } from "../components/PageHeader";
import { routes } from "../routes/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../request/Api";
import { useAuth } from "../providers/AuthProvider";
import { NoResultDisplay } from "../components/NoResultDisplay";
import { Spinner } from "../components/Spinner";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { AttendanceButton } from "../components/AttendanceButton";
import { Page } from "../layout/Page";
import { DatePicker } from "../widgets/DatePicker";
import { dateTime } from "../utils/DateTime";

export const MarkAttendance = () =>{
    const today = dateTime.now().format('ym').toString();

    const { user } = useAuth();
    const { containsDefaultRouteId } = useRouteDetective();

    const [dateValue, setDateValue] = useState(today);
    const [group, setGroup] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const pickerRef = useRef();

    const toggleAttendance = (attendance) => {
        setStudents((previousStudents)=>
            previousStudents.map((prevStudent) =>
                prevStudent.id === attendance.attributes.studentId 
                    ? {
                        ...prevStudent,
                        attributes: {
                            ...prevStudent.attributes,
                            present: attendance.attributes.present
                        }
                    } 
                    : prevStudent
            )
        );
    };

    useEffect(()=>{
        if(containsDefaultRouteId()){
            navigate(routes.auth().concat().attendanceSchoolSelection(user.id));
            return;  
        }
        setLoading(true);
        api.group.list({groupId: params.groupId, date: dateValue}).then((response)=>{
            setGroup(response.data.data[0]);
            setStudents(response.data.data[0].attributes.students.map((student)=>{
                //once there is attendances in the array with the date value then its present
                if(student.attributes.attendances.length) student.attributes['present'] = true;
                else student.attributes['present'] = false;
                return student;
            }));
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [params.groupId, dateValue]);

    return (
        <Page>
            <PageHeader title="Student Attendance" subTitle="Mark attendance for selected date">
                <PageHeaderItem
                    onClick={()=>navigate(routes.auth().concat().attendanceSchoolSelection(user.id))}
                    icon="student"
                    title="New Attendance"
                />
                <PageHeaderItem
                    onClick={(e)=>pickerRef.current.openPicker()}
                    icon="calendar"
                    title="Date Picker"
                />
            </PageHeader>

            {group && (
                <>
                    <div className="fw-semibold">{group.attributes.name}</div>
                    <div className="small text-muted">
                        <small>{group.attributes.linkToSchools.length} School linked</small>
                    </div>
                </>
            )}
            
            <div className="d-flex justify-content-center">
                <div>
                    <DatePicker
                        ref={pickerRef}
                        onChange={(e)=>setDateValue(e.target.value)}
                        dateValue={dateValue}
                        month
                    />
                </div>
            </div>

            {loading ? <Spinner show inline /> : (
                <>
                    {group ? (
                        <div className="row justify-content-center mt-3">
                            <div className="col-12 col-lg-10">
                                {students.length > 0 ? (
                                    <div className="list-group">
                                        {students.map((student) => (
                                            <div className="list-group-item" key={student.id}>
                                                <div className="d-flex align-items-center justify-content-between gap-2">
                                                    <h6 className="fw-bold mb-0">{student.attributes.fullName}</h6>
                                                    <AttendanceButton
                                                        student={student}
                                                        dateValue={dateValue}
                                                        onUpdate={toggleAttendance}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ):(
                                    <NoResultDisplay
                                        icon="student"
                                        title="No student available"
                                        description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                                    >
                                        <div className="mb-3">
                                            <button
                                                onClick={(e)=>navigate(routes.auth().concat().attendanceSchoolSelection(user.id))}
                                                className="btn btn-sm btn-outline-dark rounded-pill px-4"
                                            >New attendance</button>
                                        </div>
                                    </NoResultDisplay>
                                )}
                            </div>
                        </div>
                    ) : (
                        <NoResultDisplay
                            icon="group"
                            title="No group available"
                            description="adfasdf asdasgasdasdfasdf asdfasd asda sd as asdf asdf a"
                        >
                            <div className="mb-3">
                                <button
                                    onClick={(e)=>navigate(routes.auth().concat().attendanceSchoolSelection(user.id))}
                                    className="btn btn-sm btn-outline-dark rounded-pill px-4"
                                >Choose a different school</button>
                            </div>
                        </NoResultDisplay>
                    )}
                </>
            )}
        </Page>
    );
}
