import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { MenuButton, MenuHeader, MenuProvider } from "./Menu";

export const MenuLayout = ({children}) =>{
    const navigate = useNavigate();

    const menu = [
        {
            title: "Home",
            icon: "🏡",
            route: routes.auth().concat().home()
        },{
            title: "Daily Engagement & Progress",
            icon: "📚",
            route: routes.auth().concat().engagementAndProgress()
        },{
            title: "Attendance",
            icon: "📝",
            route: routes.auth().concat().attendance()
        },{
            title: "Administration",
            icon: "🛠️",
            route: routes.admin().concat().admin(),
        }
    ];

    return(
        <MenuProvider>
            <div className="d-flex position-relative vh-100 w-100">
                <div className="d-flex flex-column overflow-auto h-100 user-select-none py-2">
                    <MenuButton className="d-none d-sm-block mb-4" />
                    {menu.map((mu, key)=>(
                        <button
                            onClick={()=>navigate(mu.route)}
                            className="list-group-item list-group-item-action d-none d-sm-block border-0 px-3 mb-2 fs-3"
                            title={mu.title}
                            type="button"
                            key={`menu-sub-${key}`}
                        >
                            {mu.icon}
                        </button>
                    ))}
                    <button
                        onClick={()=>navigate(routes.logout)}
                        className="list-group-item list-group-item-action d-none d-sm-block border-0 text-danger px-4 mt-auto mb-4 fs-3"
                        title="Logout"
                        type="button"
                    >
                        ⏻
                    </button>
                </div>
                <div className="w-100 vh-100 overflow-auto">
                    <MenuHeader />
                    {children}
                </div>
            </div>
        </MenuProvider>
    )
}