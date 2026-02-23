import { MdMenu } from "react-icons/md"
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { features } from "../contents/Features";
import { Notification } from "../components/Notification";

const Context = createContext();

export const MenuProvider = ({children}) =>{
    const [showMenu, setShowMenu] = useState();

    const values = {
        showMenu,
        setShowMenu
    }
    return(
        <Context.Provider value={values}>
            {children}
            <Menu />
        </Context.Provider>
    )
}

const Menu = () =>{
    const { showMenu, setShowMenu } = useContext(Context);

    const navigate = useNavigate();

    const menu = [
        {
            title: "Home",
            description: "Mark and view attendance for groups",
            icon: "🏡",
            route: routes.auth().concat().home()
        },
        ...features,
        {
            title: "Logout",
            description: "Mark and view attendance for groups",
            icon: "⏻",
            iconClass: 'text-danger mx-1',
            route: routes.logout
        },
    ];

    if(!showMenu) return null;
    return(
        <div className="expandable-x position-fixed vh-100 top-0 start-0" style={{zIndex: 1060}}>
            <div className="list-group position-relative bg-white h-100 overflow-auto" style={{maxWidth: '250px', paddingTop: '60px', zIndex: '2'}}>
                {menu.map((mu, key)=>(
                    <button
                        onClick={()=>{
                            setShowMenu(false);
                            navigate(mu.route);
                        }}
                        type="button"
                        className={`d-flex align-items-center list-group-item list-group-item-action text-start border-0 ${mu?.disabled ? 'opacity-50' : ''}`}
                        disabled={mu?.disabled}
                        key={`menu-${key}`}
                    >
                        <span className={`me-3 fs-5 ${mu.iconClass || ''}`}>{mu.icon}</span>
                        <span>{mu.title}</span>
                    </button>
                ))}
            </div>
            <Backdrop onClick={()=>setShowMenu(false)} show />
        </div>
    )
}

export const MenuHeader = () =>{
    return(
        <div className="position-sticky top-0 start-0 bg-transparent px-3 py-2 user-select-none" style={{zIndex: 1050}}>
            <div className="d-none bg-white opacity-75 w-100 h-100 position-absolute top-0 start-0"></div>
            <div className="d-flex gap-3">
                <MenuButton className="d-sm-none d-block" />
                <div className="ms-auto">
                    <Notification />
                </div>
            </div>
        </div>
    )
}

export const MenuButton = ({className}) =>{
    const { showMenu, setShowMenu } = useContext(Context);
    return(
        <button
            onClick={()=>setShowMenu(!showMenu)}
            className={`${className || ''} position-relative btn border-0 p-0`}
            style={{zIndex: 1061}}
        >
            <MdMenu className="fs-3"/>
        </button>
    )
}

const Backdrop = ({show, onClick}) =>{
    if(!show) return null;
    return(
        <div
            onClick={onClick}
            className="position-fixed border border-danger top-0 start-0 bg-dark bg-opacity-10 opacity-50 vw-100 vh-100"
            style={{zIndex: '1'}}
        ></div>

    )
}
