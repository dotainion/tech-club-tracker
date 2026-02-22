import { useEffect, useState } from "react";

export const SchoolDisplay = ({ school: currentSchool, editMode, children }) =>{
    const [school, setSchool] = useState({
        id: null,
        attributes: {
            name: '',
            principal: '',
            status: 'Active',
            email: '',
            contact: '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchool((prev) => ({
            ...prev, attributes: {
                ...prev.attributes,
                [name]: value
            }
        }));
    };
    
    useEffect(() => {
        if (currentSchool) {
            setSchool(()=>(currentSchool));
        }
    }, [currentSchool]);

    return(
        <div className="row g-3">
            {/* School Name */}
            <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">School Name {editMode && <span className="text-danger">*</span>}</h6>
                {editMode ? (
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={school.attributes.name}
                        onChange={handleChange}
                        required
                    />
                ) : (
                    <p className="fw-semibold mb-0">{school.attributes.name}</p>
                )}
            </div>

            {/* Principal */}
            <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Principal</h6>
                {editMode ? (
                    <input
                        type="text"
                        name="principal"
                        className="form-control"
                        value={school.attributes.principal}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="fw-semibold mb-0">{school.attributes.principal}</p>
                )}
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Email</h6>
                {editMode ? (
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={school.attributes.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="fw-semibold mb-0">{school.attributes.email}</p>
                )}
            </div>

            {/* Contact */}
            <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Contact</h6>
                {editMode ? (
                    <input
                        type="text"
                        name="contact"
                        className="form-control"
                        value={school.attributes.contact}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="fw-semibold mb-0">{school.attributes.contact}</p>
                )}
            </div>

            {/* Status */}
            <div className="col-12 col-md-6">
                <h6 className="text-muted mb-1">Status</h6>
                {editMode ? (
                    <select
                        name="status"
                        className="form-select"
                        value={school.attributes.status}
                        onChange={handleChange}
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                ) : (
                    <span className={`badge bg-${school.attributes.status === 'Active' ? 'success' : 'secondary'}`}>
                        {school.attributes.status}
                    </span>
                )}
            </div>
            {children}
        </div>
    )
}