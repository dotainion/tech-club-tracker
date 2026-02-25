import { FaEllipsisV } from "react-icons/fa";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GrAdd, GrReturn, GrView } from "react-icons/gr";
import { BsBack, BsClock } from "react-icons/bs";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { BiCalendar, BiDownload, BiEdit } from "react-icons/bi";
import { CgAssign } from "react-icons/cg";
import { Spinner } from "./Spinner";
import { LuDelete } from "react-icons/lu";
import { GiCancel, GiSave } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { createPortal } from "react-dom";
import { useMenu } from "../layout/Menu";

const Context = createContext();

export const PageHeader = ({title, subTitle, onSearch, noMenu, children}) =>{
    const { menuPortal } = useMenu();

    const [smShow, setSmShow] = useState(false);
    const [btnSize] = useState('md');

    const navigate = useNavigate();

    const toHome = () =>{
        if(routes.type().isAdmin()){
            return navigate(routes.admin().concat().admin());
        }
        navigate(routes.auth().concat().home());
    }

    const values = {
        btnSize
    }

    useEffect(()=>{
        const showOnSmScreen = () => setSmShow(false);
        document.addEventListener('click', showOnSmScreen);
        return () => document.removeEventListener('click', showOnSmScreen);
    }, []);

    return(
        <Context.Provider value={values}>
            <div className="d-flex justify-content-between gap-3 w-100 mb-3" style={noMenu ? {} : {marginTop: '-40px'}}>
                <div className="d-block d-md-flex flex-fill gap-3">
                    <div>
                        <h5 className="mb-1">{title}</h5>
                        <p className="text-muted mb-0">{subTitle}</p>
                    </div>
                    {onSearch && (
                        <div className="flex-fill">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="form-control shadow-none rounded-pill px-3 w-100"
                                onChange={onSearch}
                                style={{maxWidth: '500px'}}
                            />
                        </div>
                    )}
                </div>
            </div>
            {!noMenu && menuPortal && createPortal(
                <div onClick={(e)=>e.stopPropagation()} className="position-relative">
                    <div className="bg-white opacity-75 w-100 h-100 position-absolute top-0 start-0"></div>
                    <div className="position-relative d-flex justify-content-end" style={{zIndex: 1056}}>
                        <button onClick={()=>setSmShow(!smShow)} className={`btn btn-${values.btnSize} border-0 d-block d-md-none`}>
                            <FaEllipsisV/>
                        </button>
                    </div>
                    <div className={`header-menu ${smShow ? 'show' : ''} d-none d-md-block`}>
                        <div onClick={()=>setSmShow(false)} className={`btn-group btn-group-${values.btnSize}`}>
                            {children}
                            <PageHeaderItem
                                onClick={toHome}
                                icon="home"
                                title="Home"
                            />
                        </div>
                    </div>
                </div>,
                menuPortal
            )}
        </Context.Provider>
    )
}

export const PageHeaderItem = ({icon: iconKey, title, loading, onClick, requireConfirmation}) =>{
    const { btnSize } = useContext(Context);

    const icons = {
        add: GrAdd,
        home: BsBack,
        edit: BiEdit,
        assign: CgAssign,
        delete: LuDelete,
        save: GiSave,
        student: PiStudent,
        setting: CiSettings,
        download: BiDownload,
        view: GrView,
        calendar: BiCalendar,
        cancel: GiCancel,
        log: BsClock,
        back: GrReturn
    };

    const styles = {
        delete: 'text-danger'
    }

    const className = styles?.[iconKey] || '';
    const PageHeaderIcon = icons[iconKey];
    
    useEffect(()=>{
        if(!Object.keys(icons).includes(iconKey)){
            console.error(`icon attribute in PageHeaderItem can only be ${Object.keys(icons).join(', ')}`);
        }
    }, [iconKey]);

    if(requireConfirmation) return(
        <div className="dropdown p-0">
            <button
                className={`item text-nowrap btn btn-${btnSize} btn-text-hover-primary text-decoration-none border-0 px-1`}
                data-bs-toggle="dropdown"
            >
                <PageHeaderIcon className={className} />
                <label className="d-block text-inherit">{title}</label>
            </button>
            <div className="dropdown-menu">
                <button
                    onClick={onClick}
                    className="d-flex align-items-center gap-2 dropdown-item text-danger position-relative"
                >Confirm</button>
            </div>
        </div>
    )

    return(
        <button
            onClick={onClick}
            className={`item text-nowrap btn btn-${btnSize} btn-text-hover-primary text-decoration-none border-0 px-1 position-relative`}
            title={title}
        >
            <PageHeaderIcon className={className} />
            <label className="d-block text-inherit">{title}</label>
            <Spinner show={loading} inline sm white withoutMessage />
        </button>
    )
}

