import { MdMenu } from "react-icons/md"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { features } from "../contents/Features";
import { Notification } from "../components/Notification";
import { GiDonkey } from "react-icons/gi";

const Context = createContext();

export const useMenu = () => useContext(Context);

export const MenuProvider = ({children}) =>{
    const [showMenu, setShowMenu] = useState(false);
    const [menuPortal, setMenuPortal] = useState(null);

    const values = {
        showMenu,
        setShowMenu,
        menuPortal,
        setMenuPortal,
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
        <div className="expandable-x position-fixed vh-100 top-0 start-0 user-select-none" style={{zIndex: 1060}}>
            <div className="list-group position-relative bg-white h-100 overflow-auto pt-2" style={{maxWidth: '250px', zIndex: '2'}}>
                <span className="d-flex align-items-center gap-3 text-start border-0 mb-3">
                    <MenuButton className="ms-4" />
                    <strong className="text-truncate">TECH CLUB</strong>
                </span>
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
    const { setMenuPortal } = useContext(Context);

    const portalRef = useRef();

    useEffect(()=>{
        setMenuPortal(portalRef.current);
    }, []);

    return(
        <div className="position-sticky top-0 start-0" style={{zIndex: 1050, marginBottom: '40px'}}>
            <div className="position-relative bg-transparent px-3 py-2 user-select-none">
                <div className="bg-white opacity-75 w-100 h-100 position-absolute top-0 start-0"></div>
                <div className="container position-relative d-flex gap-3" style={{zIndex: 1}}>
                    <MenuButton className="d-sm-none d-block" />
                    <GiDonkey className="fs-3" />
                    <div className="ms-auto">
                        <Notification />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="position-relative">
                    <div className="position-absolute end-0">
                        <div ref={portalRef}></div>
                    </div>
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
            style={{zIndex: 1071}}
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
            className="position-fixed border top-0 start-0 bg-dark bg-opacity-10 opacity-50 vw-100 vh-100"
            style={{zIndex: '1'}}
        ></div>

    )
}
