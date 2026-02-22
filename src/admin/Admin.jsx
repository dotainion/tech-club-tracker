import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

export const Admin = () => {
    const navigate = useNavigate();

    const options = [
        {
            title: "Staff Management",
            description: "Manage user accounts and access levels efficiently.",
            icon: "👥",
            route: routes.admin().concat().users(),
        },{
            title: "School Profiles",
            description: "Maintain school information, addresses, and contacts.",
            icon: "🏫",
            route: routes.admin().concat().schools(),
        },{
            title: "Reports & Analytics",
            description: "View enerated reports and review attendance and performance trends.",
            icon: "📊",
            route: routes.admin().concat().analytics(),
        },{
            title: "Groups",
            description: "View groups and asign groups to schools",
            icon: "🗂️",
            route: routes.admin().concat().groups(),
        },{
            title: "Settings",
            description: "Configure system preferences, roles, and general options.",
            icon: "⚙️",
            route: routes.admin().concat().settings(),
        },
    ];

    return (
        <div className="container py-5">
            <div className="mb-5 rounded-3 bg-light p-4">
                <h5 className="fw-bold mb-3">Welcome to the Administrative Portal</h5>
                <p className="text-muted small mb-0">
                    This dashboard provides quick access to all key sections of the system.
                </p>
                <p className="text-muted small mb-0">
                    Navigate through staff management, school profiles, reports, and settings efficiently.
                </p>
            </div>

            <div className="row g-4">
                {options.map((opt) => (
                    <div className="col-6 col-md-4 col-lg-3" key={opt.title}>
                        <div onClick={()=>navigate(opt.route)} className="card as-btn border rounded-4 h-100 text-center">
                            <div className="card-body">
                                <span className="fs-3">{opt.icon}</span>
                                <h6 className="my-2">{opt.title}</h6>
                                <p className="text-muted small mb-0">{opt.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
