import { useState } from "react";
import { api } from "../request/Api";
import { SubmitButton } from "../wedgits/SubmitButton";
import { useParams } from "react-router-dom";
import { BiQuestionMark } from "react-icons/bi";
import { createPortal } from "react-dom";
import { ParseError } from "../utils/ParseError";

export const AttendanceButton = ({student, dateValue, className, onUpdate}) =>{
    const [show, setShow] = useState(false);
    const [hasError, setHasError] = useState(null);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const toggle = (e) => {
        e.stopPropagation();
        setLoading(true);
        setHasError(null);
        const data = {
            dateValue: dateValue,
            studentId: student.id,
            groupId: params.groupId,
            hide: student.attributes.present
        }
        api.attendance.set(data).then((response)=>{
            const student = response.data.data[0];
            onUpdate?.({
                ...student,
                attributes: {
                    ...student.attributes,
                    present: !student.attributes.hide
                }
            });
            setShow(false);
        }).catch((error)=>{
            setHasError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    };

    const showError = (e, state) =>{
        e.stopPropagation();
        setShow(state);
    }

    return(
        <SubmitButton
            onClick={toggle}
            className={`rounded-pill ${className}`}
            bg={hasError ? 'danger' : student.attributes.present ? 'success' : 'secondary'}
            outline
            spinnerBgPrimary
            loading={loading}
        >
            {hasError ? (
                <>
                    Resend
                    <div className="position-absolute top-0 end-0 translate-middle-y">
                        <span
                            onClick={(e)=>showError(e, true)}
                            className="bg-danger rounded-circle border border-danger d-flex align-items-center justify-content-center"
                            style={{ width: '17px', height: '17px' }}
                        >
                            <BiQuestionMark className="text-light"/>
                        </span>
                    </div>
                </>
            ):(
                <>{student.attributes.present ? 'Present' : 'Absent'}</>
            )}
            {show && createPortal(
                <div onClick={(e)=>showError(e, false)} className="position-fixed top-0 start-0 w-100 vh-100">
                    <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-dark bg-opacity-10">
                        <div className="p-3">
                            <div className="bg-white rounded-4">
                                <div className="card bg-danger bg-opacity-10 border-0 shadow-sm rounded-4">
                                    <div className="card-body text-danger p-4" style={{minWidth: '300px'}}>
                                        <label className="fw-semibold">{student.attributes.fullName}</label>
                                        <div>Was not able to complete the request</div>
                                        <p>Error: {hasError}</p>
                                        <div className="d-flex justify-content-end">
                                            <button onClick={toggle} className="btn btn-sm btn-primary rounded-pill px-4">Resend</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </SubmitButton>
    )
}