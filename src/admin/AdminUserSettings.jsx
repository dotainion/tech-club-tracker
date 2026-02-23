import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../wedgits/Switch";
import { api } from "../request/Api";
import { Spinner } from "../components/Spinner";
import { Page } from "../layout/Page";

export const AdminUserSettings = () => {
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(true);
    const [permissions, setPermissions] = useState({
        checkAttendance: true,
        manageGroups: true,
        generateReports: true,
    });
    const [notifications, setNotifications] = useState({
        systemNotifications: true,
    });

    const navigate = useNavigate();
    const params = useParams();

    const togglePermission = (key) => {
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const saveSettings = () => {
        const data = {
            userId: params.userId,
            isActive,
            ...permissions,
            ...notifications,
        };

        api.settings.set(data).then(()=>[
            
        ]).catch((err)=>{
            
        });
    };

    useEffect(() => {
        if (!loading) saveSettings();
    }, [isActive, permissions, notifications]);

    useEffect(() => {
        api.settings
            .fetch({ userId: params.userId, useDefaultIfSettingsNotExist: true })
            .then((response) => {
                const s = response.data.data[0]?.attributes;
                if (s) {
                    setIsActive(s.isActive);
                    setPermissions({
                        checkAttendance: s.checkAttendance,
                        manageGroups: s.manageGroups,
                        generateReports: s.generateReports,
                    });
                    setNotifications({
                        systemNotifications: s.systemNotifications,
                    });
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Page>
            {/* Header */}
            <PageHeader
                title="User Settings"
                subTitle="Manage user access, permissions, notifications, and school assignments."
            >
            </PageHeader>

            {loading ? (
                <Spinner show inline />
            ) : (
                <>
                    {/* Access & Permissions */}
                    <SettingsCard hidden title="Access & Permissions" color="#0d6efd">
                        <Switch
                            onChange={() => setIsActive(!isActive)}
                            checked={isActive}
                            className="as-btn rounded-3 px-3 py-2 mb-3"
                        >
                            Active User
                        </Switch>

                        <Switch
                            onChange={() => togglePermission("checkAttendance")}
                            checked={permissions.checkAttendance}
                            disabled={!isActive}
                            className="as-btn rounded-3 px-3 py-2 mb-2"
                        >
                            Check Attendance
                        </Switch>
                        <Switch
                            onChange={() => togglePermission("manageGroups")}
                            checked={permissions.manageGroups}
                            disabled={!isActive}
                            className="as-btn rounded-3 px-3 py-2 mb-2"
                        >
                            Manage School Groups & Students
                        </Switch>
                        <Switch
                            onChange={() => togglePermission("generateReports")}
                            checked={permissions.generateReports}
                            disabled={!isActive}
                            className="as-btn rounded-3 px-3 py-2 mb-2"
                        >
                            Generate Reports
                        </Switch>
                    </SettingsCard>

                    {/* Preferences */}
                    <SettingsCard hidden title="Preferences" color="#198754">
                        <Switch
                            onChange={() => toggleNotification("systemNotifications")}
                            checked={notifications.systemNotifications}
                            className="as-btn rounded-3 px-3 py-2"
                        >
                            Allow System Notifications
                        </Switch>
                        <div className="text-muted small mt-1">
                            Enable or disable notifications for reports and attendance alerts.
                        </div>
                    </SettingsCard>

                    {/* Password Assistance */}
                    <SettingsCard title="🔑 Password Assistance" color="#6f42c1">
                        <div className="text-muted mb-3">
                            Help the user reset their password safely.
                        </div>
                        <button onClick={()=>navigate(routes.admin().concat().passwordRecovery(params.userId))} className="btn btn-sm btn-primary">
                            Send Reset Email
                        </button>
                    </SettingsCard>

                    {/* School Assignments */}
                    <SettingsCard hidden title="🏫 School Access" color="#fd7e14">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div className="text-muted mb-1">
                                    Control which schools this user can access
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    navigate(routes.admin().concat().assignSchools(params.userId))
                                }
                                className="btn btn-outline-primary"
                            >
                                Assign Schools
                            </button>
                        </div>
                    </SettingsCard>
                </>
            )}
        </Page>
    );
};

/* ---------- HELPERS ---------- */
const SettingsCard = ({ title, color, hidden, children }) => (
    <div className="card shadow-sm rounded-4 border-0 mb-4" hidden={hidden}>
        <div
            className="card-header fw-semibold text-white"
            style={{
                background: `linear-gradient(135deg, ${color}, #00000020)`
            }}
        >
            {title}
        </div>
        <div className="card-body">{children}</div>
    </div>
);
