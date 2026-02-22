import { MdMenu } from "react-icons/md"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { features } from "../contents/Features";
import { BsBack } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";

export const Menu = () =>{
    const [showMenu, setShowMenu] = useState();

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
    ]
    return(
        <div className="position-fixed bg-transparent vw-100 px-4 py-2 user-select-none" style={{zIndex: 1050}}>
            <div className="bg-white opacity-75 w-100 h-100 position-absolute top-0 start-0"></div>
            <div className="d-flex gap-3">
                <button onClick={()=>setShowMenu(!showMenu)} className="position-relative btn border-0 p-0" style={{zIndex: 1051}}>
                    <MdMenu className="fs-3"/>
                </button>
                <button onClick={()=>navigate(-1)} className="position-relative btn btn-sm btn-outline-light border" style={{zIndex: showMenu ? -1 : 1}}>
                    <RiArrowGoBackFill className="text-dark" />
                </button>
            </div>
            {showMenu && (
                <div className="expandable-x position-fixed vh-100 top-0 start-0">
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
                                key={`menu-/${key}`}
                            >
                                <span className={`me-3 fs-5 ${mu.iconClass || ''}`}>{mu.icon}</span>
                                <span>{mu.title}</span>
                            </button>
                        ))}
                    </div>
                    <div onClick={()=>setShowMenu(false)} className="position-fixed top-0 start-0 bg-dark bg-opacity-10 opacity-50 vw-100 vh-100" style={{zIndex: '1'}}></div>
                </div>
            )}
        </div>
    )
}