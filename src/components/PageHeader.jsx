import { FaEllipsisV } from "react-icons/fa";
import { createContext, useContext, useEffect, useState } from "react";
import { GrAdd, GrView } from "react-icons/gr";
import { BsBack } from "react-icons/bs";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { BiCalendar, BiDownload, BiEdit } from "react-icons/bi";
import { CgAssign } from "react-icons/cg";
import { Spinner } from "./Spinner";
import { LuDelete } from "react-icons/lu";
import { GiCancel, GiSave } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";

const Context = createContext();

export const PageHeader = ({title, subTitle, onSearch, noMenu, children}) =>{
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
            <div className="d-flex justify-content-between gap-3 w-100 mb-4">
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
                {!noMenu && (
                    <div onClick={(e)=>e.stopPropagation()} className="position-relative">
                        <div className="d-flex justify-content-end">
                            <button onClick={()=>setSmShow(!smShow)} className={`btn btn-${values.btnSize} border-0 d-block d-md-none`}>
                                <FaEllipsisV/>
                            </button>
                        </div>
                        <div className={`header-menu ${smShow ? 'show' : ''} d-none d-md-block`}>
                            <div onClick={()=>setSmShow(false)} className={`btn-group btn-group-${values.btnSize}`}>
                                {children}
                                <PageHeaderItem
                                    onClick={toHome}
                                    icon="back"
                                    title="Home"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Context.Provider>
    )
}

export const PageHeaderItem = ({icon: iconKey, title, loading, onClick}) =>{
    const { btnSize } = useContext(Context);

    const icons = {
        add: GrAdd,
        back: BsBack,
        edit: BiEdit,
        assign: CgAssign,
        delete: LuDelete,
        cancel: GiCancel,
        save: GiSave,
        student: PiStudent,
        setting: CiSettings,
        download: BiDownload,
        view: GrView,
        calendar: BiCalendar,
    };

    const PageHeaderIcon = icons[iconKey];
    
    useEffect(()=>{
        if(!Object.keys(icons).includes(iconKey)){
            console.error(`icon attribute in PageHeaderItem can only be ${Object.keys(icons).join(', ')}`);
        }
    }, [iconKey]);

    return(
        <button
            onClick={onClick}
            className={`d-flex align-items-center gap-2 text-nowrap btn btn-${btnSize} btn-text-hover-primary text-decoration-none border-0 position-relative`}
            title={title}
        >
            <PageHeaderIcon />
            <span className="d-block d-md-none">{title}</span>
            <Spinner show={loading} inline sm white withoutMessage />
        </button>
    )
}
