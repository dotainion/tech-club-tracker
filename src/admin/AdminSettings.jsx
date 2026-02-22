import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { PageHeaderButton } from "../components/PageHeaderButton";
import { routes } from "../routes/Routes";
import { useState } from "react";
import { Page } from "../layout/Page";

export const AdminSettings = () => {

    const navigate = useNavigate();

    const [settings,setSettings] = useState({
        organizationName: "My Education Platform",
        timezone: "UTC",
        academicYearStart: "September",
        allowMultipleSessions: false,
        lockAttendanceAfterDays: 7,
        autoPublishReports: false,
        attendanceThreshold: 60,
        emailNotifications: true,
        darkMode: false
    });

    const handleChange = (e)=>{
        const {name,value,type,checked} = e.target;
        setSettings(prev=>({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = ()=>{
        console.log("Saved Settings:",settings);
        alert("Settings saved (connect to API)");
    };

    return (
        <Page>
            <PageHeader
                title="Application Settings"
                subTitle="Configure system behavior, attendance rules, reporting logic and analytics preferences."
            >
                <PageHeaderButton onClick={()=>navigate(routes.admin().concat().admin())}>
                    🏡 Home
                </PageHeaderButton>
            </PageHeader>

            <div className="alert alert-warning">
                The setting in this page is not yet functional.
            </div>

            <div className="row g-4">
                {/* ORGANIZATION SETTINGS */}
                <SettingsCard title="🏫 Organization Settings" color="#0d6efd">
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Wysywig editor</label>
                        <textarea className="form-control rounded-3" />
                    </div>

                    <Input label="Organization Name"
                        name="organizationName"
                        value={settings.organizationName}
                        onChange={handleChange}
                    />

                    <Input label="Contact"
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleChange}
                    />
                </SettingsCard>

                {/* REPORT SETTINGS */}
                <SettingsCard title="📝 Report Settings" color="#6f42c1">

                    <Checkbox
                        label="Auto Publish Reports"
                        name="autoPublishReports"
                        checked={settings.autoPublishReports}
                        onChange={handleChange}
                    />

                    <div className="text-muted small">
                        Automatically publish reports when generated.
                    </div>

                </SettingsCard>

                {/* USER & PERMISSION SETTINGS */}
                <SettingsCard title="👥 User & Role Permissions" color="#dc3545">

                    <div className="mb-2 fw-semibold">Role Access Matrix</div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">
                            Facilitators can edit attendance
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">
                            Admins can publish reports
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">
                            Viewers can access analytics
                        </label>
                    </div>

                </SettingsCard>

                {/* NOTIFICATION SETTINGS */}
                <SettingsCard title="🔔 Notification Settings" color="#20c997">

                    <Checkbox
                        label="Enable Email Notifications"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                    />

                    <div className="text-muted small">
                        Send alerts for low attendance and report publishing.
                    </div>

                </SettingsCard>

                {/* APPEARANCE SETTINGS */}
                <SettingsCard title="🎨 Appearance Settings" color="#343a40">

                    <Checkbox
                        label="Enable Dark Mode"
                        name="darkMode"
                        checked={settings.darkMode}
                        onChange={handleChange}
                    />

                </SettingsCard>

            </div>

            {/* SAVE BUTTON */}
            <div className="mt-5 text-end">
                <button onClick={handleSave} className="btn btn-sm btn-primary px-4">
                    Save
                </button>
            </div>
        </Page>
    );
};



/* ---------------- COMPONENT HELPERS ---------------- */

const SettingsCard = ({title,children,color})=>(
    <div className="col-12">
        <div className="card shadow-sm rounded-4 border-0">
            <div
                className="card-header text-white fw-semibold"
                style={{
                    background: `linear-gradient(135deg, ${color}, #00000020)`
                }}
            >
                {title}
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    </div>
);

const Input = ({label,...props})=>(
    <div className="mb-3">
        <label className="form-label fw-semibold">{label}</label>
        <input className="form-control rounded-3" {...props} />
    </div>
);

const Checkbox = ({label,...props})=>(
    <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" {...props} />
        <label className="form-check-label">{label}</label>
    </div>
);
