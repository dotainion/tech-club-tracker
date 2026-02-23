import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../request/Api";
import { useRouteDetective } from "../hooks/RouteDetectiveProvider";
import { ErrorDisplay } from "./ErrorDisplay";
import { ParseError } from "../utils/ParseError";
import { SubmitButton } from "../wedgits/SubmitButton";
import { PageHeaderItem } from "./PageHeader";

const Context = createContext();

const defaultUser = () =>({
    id: null,
    attributes: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        schools: [],
        role: {
            attributes: {
                role: '',
                read: true,
                write: true,
                edit: true,
                delete: true,
            }
        }
    }
})

export const ProfileProvider = ({userId, onChange, onSuccess, onLoad, onLoading, editMode, creatingMode, children}) =>{
    const { containsDefaultRouteId } = useRouteDetective();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(defaultUser());

    const roles = ['Admin', 'Moderator', 'Member', 'Guest'];

    const change = (e) =>{
        const copy = {
            ...user,
            attributes: {
                ...user.attributes,
                [e.target.name]: e.target.value
            }
        }
        setUser(copy);
        onChange?.(copy);
    }

    const changeRole = (e) =>{
        const copy = {
            ...user,
            attributes: {
                ...user.attributes,
                role: {
                    attributes: {
                        ...user.attributes.role.attributes,
                        [e.target.name]: e.target.value
                    }
                }
            }
        }
        setUser(copy);
        onChange?.(copy);
    }

    const save = async() =>{
        let data = {
            ...user.attributes,
            ...user.attributes.role.attributes
        };
        if(creatingMode){
            data['userId'] = user.id;
            data['password'] = 'User1234#';
            data['confirmPassword'] = 'User1234#';
            return api.user.create(data);
        }
        data['id'] = user.id;
        return api.user.editProfile(data);
    }

    const submit = () =>{
        setError(null);
        setLoading(true);
        save().then((response)=>{
            const copy = {
                ...response.data.data[0],
                attributes: {
                    ...response.data.data[0].attributes,
                    role: user.attributes.role,
                }
            }
            setUser(copy);
            onSuccess?.(copy);
        }).catch((error)=>{
            setError(new ParseError().message(error));
        }).finally(()=>setLoading(false));
    }
    
    const values = {
        user,
        editMode,
        creatingMode,
        roles,
        error,
        loading,
        change,
        submit,
        changeRole
    }
    
    useEffect(()=>{
        onLoading(loading);
    }, [loading]);
    
    
    useEffect(()=>{
        if(containsDefaultRouteId(userId)){
            setUser(defaultUser());
            setLoading(false);
            return;
        }
        setLoading(true);
        api.user.user(userId).then((response)=>{
            onLoad(response.data.data[0]);
            setUser(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>setLoading(false));
    }, [userId]);

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export const Profile = () =>{
    const { user, roles, editMode, creatingMode, change, changeRole, error } = useContext(Context);

    let studentCount = 0;
    let groupCount = 0;

    user.attributes.schools.forEach((school)=>{
        studentCount = studentCount + school.attributes.students.length;
        groupCount = groupCount + school.attributes.groups.length;
    });

    return(
        <>
            <ErrorDisplay message={error} />
            <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between">
                    <label className={`form-label ${editMode ? '' : 'mb-0'}`}>First Name</label>
                    <span className="badge bg-primary">{user.attributes.role.attributes.label}</span>
                </div>
                {editMode ? (
                    <input
                        type="text"
                        name="firstName"
                        value={user.attributes.firstName}
                        onChange={change}
                        className="form-control"
                        placeholder="John"
                        required
                    />
                ):(
                    <p className="fw-semibold">{user.attributes.firstName}</p>
                )}
            </div>
            <div className="mb-3">
                <label className={`form-label ${editMode ? '' : 'mb-0'}`}>Last Name</label>
                {editMode ? (
                    <input
                        type="text"
                        name="lastName"
                        value={user.attributes.lastName}
                        onChange={change}
                        className="form-control"
                        placeholder="Doe"
                        required
                    />
                ):(
                    <p className="fw-semibold">{user.attributes.lastName}</p>
                )}
            </div>
            <div className="mb-3">
                <label className={`form-label ${editMode ? '' : 'mb-0'}`}>Email</label>
                {editMode ? (
                    <input
                        type="email"
                        name="email"
                        value={user.attributes.email}
                        onChange={change}
                        className="form-control"
                        placeholder="user@example.com"
                        required
                    />
                ):(
                    <p className="fw-semibold">{user.attributes.email}</p>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Contact</label>
                {editMode ? (
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={user.attributes.phoneNumber}
                        onChange={change}
                        className="form-control"
                        placeholder="0 000 000-0000"
                        required
                    />
                ):(
                    <p className="fw-semibold">{user.attributes.phoneNumber}</p>
                )}
            </div>
            {creatingMode && (
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select onChange={changeRole} className="form-control form-select" value={user.attributes.role.attributes.role} name="role">
                        <option hidden value="">Select a role</option>
                        {roles.map((role)=>(
                            <option value={role.toLowerCase()} key={role}>{role}</option>
                        ))}
                    </select>
                </div>
            )}
            {!creatingMode && (
                <div className="d-flex align-items-center gap-2 small text-muted">
                    <span>{user.attributes.schools.length} School</span>
                    <span className="d-flex align-items-center">
                        <span className="border border-dark border-2 rounded-circle"></span>
                    </span>
                    <span>{groupCount} Groups</span>
                    <span className="d-flex align-items-center">
                        <span className="border border-dark border-2 rounded-circle"></span>
                    </span>
                    <span>{studentCount} Student</span>
                </div>
            )}
        </>
    )
}

export const ProfileSubmit = () =>{
    const { loading, submit } = useContext(Context);
    return(
        <PageHeaderItem
            onClick={submit}
            loading={loading}
            icon="save"
            title="Save User"
        />
    )
}