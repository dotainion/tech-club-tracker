import { useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { Spinner } from "./Spinner";
import { useParams } from "react-router-dom";

export const StudentDisplay = ({student: currentStudent, onSubmit, onSubmitRef, creatingMode, editMode, children}) =>{
    const [groups, setGroups] = useState([]);
    const [student, setStudent] = useState({
        id: null,
        attributes: {
            firstName: '',
            lastName: '',
            dob: '',
            grade: '',
            email: '',
            contact: '',
            group: '',
            status: 'Active',
            gender: '',
            studentLinks: []
        }
    });
    const [loading, setLoading] = useState(true);

    const params = useParams();

    const formRef = useRef();
    const didUpdateRef = useRef({
        count: 0,
        updated: false,
        fire: ()=>{
            if(didUpdateRef.current.count >= 4){
                return didUpdateRef.current.updated = true;
            }
            didUpdateRef.current.count ++;
        }
    });

    const handleChange = (e) => {
        setStudent(prev => ({
            id: prev.id, 
            attributes: { 
                ...prev.attributes, 
                [e.target.name]: e.target.value 
            }
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit?.({
            studentId: student.id,
            schoolId: params.schoolId,
            ...student.attributes,
            studentLinks: student.attributes.studentLinks.map((link)=>({
                ...link.attributes
            }))
        });
    }

    const toggleGroupLinks = (e) =>{
        if(!editMode) return;
        setStudent((prevsStudent)=>({
            ...prevsStudent,
            attributes: {
                ...prevsStudent.attributes,
                studentLinks: prevsStudent.attributes.studentLinks.map((link)=>({
                    ...link,
                    attributes: {
                        ...link.attributes,
                        hide: e.target.id === link.attributes.groupId 
                            ? !e.target.checked 
                            : link.attributes.hide
                    }
                }))
            }
        }));
    }

    useEffect(() => {
        if(!onSubmitRef) return;
        onSubmitRef.current = ()=>{
            formRef.current.click();
        };
    }, [onSubmitRef]);

    useEffect(() => {
        if (currentStudent) {
            setStudent(()=>(currentStudent));
        }
    }, [currentStudent]);

    useEffect(() => {
        if(didUpdateRef.current.updated || !groups.length) return;
        setStudent((prevs)=>({
            ...prevs,
            attributes: {
                ...prevs.attributes,
                studentLinks: groups.map((group)=>{
                    const link = student.attributes.studentLinks.find((link)=>link.attributes.groupId === group.id);
                    return {
                        attributes: {
                            groupId: group.id,
                            hide: link ? link.attributes.hide : true
                        }
                    }
                })
            }
        }));
        didUpdateRef.current.fire();
    }, [student, groups]);

    useEffect(()=>{
        api.group.list().then((response)=>{
            setGroups(response.data.data);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, []);

    if(loading) return(
        <Spinner show />
    );

    return(
        <form className="row" onSubmit={handleSubmit}>
            {/* First Name */}
            <button ref={formRef} className="d-none" type="submit" hidden></button>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>First Name</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={student.attributes.firstName}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>Last Name</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={student.attributes.lastName}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.lastName}</p>
                        )}
                    </div>

                    {/* Age */}
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>DOB</label>
                        {editMode ? (
                            <input
                                type="date"
                                name="dob"
                                className="form-control"
                                value={student.attributes.dob}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.dob}</p>
                        )}
                    </div>

                    {/* Grade */}
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>Grade</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="grade"
                                className="form-control"
                                value={student.attributes.grade}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.grade}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>Email</label>
                        {editMode ? (
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={student.attributes.email || ''}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.email}</p>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="col-12 col-md-6">
                        <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>Contact</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="contact"
                                className="form-control"
                                value={student.attributes.contact}
                                onChange={handleChange}
                            />
                        ):(
                            <p className="fw-semibold">{student.attributes.contact}</p>
                        )}
                    </div>

                    {/* Status */}
                    {!creatingMode && (
                        <div className="col-12 col-md-6">
                            <label className={`form-label ${editMode ? 'fw-semibold' : 'mb-0'}`}>Status</label>
                            {editMode ? (
                                <select
                                    name="status"
                                    className="form-control form-select"
                                    value={student.attributes.status}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            ):(
                                <div>
                                    <span className="badge bg-primary">{student.attributes.status}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="col-md-4 px-2 mt-4 mt-md-0">
                <div className="bg-light rounded-3 h-100">
                    {groups.map((group)=>{
                        const link = student.attributes.studentLinks.find((link)=>link.attributes.groupId === group.id);
                        const checked = link ? !link.attributes.hide : false;
                        return(
                            <div className="col-4 col-md-12" key={group.id}>
                                <label className="d-flex gap-3 px-2 py-2">
                                    <input
                                        id={group.id}
                                        onChange={toggleGroupLinks}
                                        className={`form-check-input ${editMode ? '' : 'shadow-none'}`}
                                        type="checkbox"
                                        checked={checked}
                                    />
                                    <div className="as-btn d-inline-block bg-light w-100 h-100 rounded-3 text-truncate" key={group.id}>
                                        <h6 className="small mb-0">{group.attributes.name}</h6>
                                        <small className="text-muted" title={group.attributes.description}>{group.attributes.description}</small>
                                    </div>
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            {children}
        </form>
    )
}