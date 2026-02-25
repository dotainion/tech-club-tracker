import { PageHeader } from "../components/PageHeader"
import { Page } from "../layout/Page"
import { useNavigate } from "react-router-dom"
import { routes } from "../routes/Routes"

export const Attendance = () => {
    const navigate = useNavigate();

    const options = [
        {
            icon: "🧑‍🎓",
            title: 'Student Attendance',
            description: 'View or mark student attendance.',
            route: routes.auth().concat().markAttendance()
        },{
            icon: "🧑‍🏫",
            title: 'Sign-In',
            description: 'Clock in clock out daily attendance.',
            route: routes.auth().concat().facilitatorSignin()
        },{
            icon: "📝",
            title: 'Student Logs',
            description: 'View student attendance logs.',
            route: routes.auth().concat().studentLogs()
        },{
            icon: "📋",
            title: 'My Logs',
            description: 'View facilitator loga.',
            route: routes.auth().concat().facilitatorLogs()
        }
    ];

    return(
        <Page>
            <PageHeader
                title="Attendance Hub"
                subTitle="Quickly access student or facilitator attendance tools."
            />

            <p className="text-muted mb-4">
                Use the options below to view student attendance or manage facilitator sign-in for today.
            </p>

            <div className="row">
                {options.map((option) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={option.title}>
                        <div
                            onClick={() => navigate(option.route)}
                            className="border rounded-4 p-4 h-100 text-center as-btn"
                            style={{ cursor: "pointer" }}
                        >
                            <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                                {option.icon}
                            </div>
                            <h6 className="fw-bold">{option.title}</h6>
                            <p className="text-muted mb-0">{option.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    )
}