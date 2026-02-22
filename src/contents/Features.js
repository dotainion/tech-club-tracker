import { routes } from "../routes/Routes";

export const features = [
    {
        title: "Attendance",
        description: "Mark and view attendance for groups",
        icon: "📝",
        route: routes.auth().concat().attendance()
    },{
        title: "Daily Engagement & Progress",
        description: "Progress, activities & resources used",
        icon: "📚",
        route: routes.auth().concat().engagementAndProgress()
    },{
        title: "Reports",
        description: "View attendance reports and analytics",
        icon: "📊",
        route: routes.auth().concat().reports()
    },{
        title: "Schools",
        description: "Manage schools, groups, and students",   
        icon: "🏫",
        route: routes.auth().concat().schools()
    },{
        title: "Administration",
        description: "Manage administrative tasks and settings",
        icon: "🛠️",
        route: routes.admin().concat().admin(),
    },{
        title: "Profile",
        description: "View and edit your account info",
        icon: "👤",
        route: '#',
        disabled: true
    },{
        title: "Notifications",
        description: "View alerts and messages",
        icon: "🔔",
        route: '#',
        disabled: true
    },{
        title: "Settings",
        description: "Manage app preferences",
        icon: "⚙️",
        route: '#',
        disabled: true
    }
];