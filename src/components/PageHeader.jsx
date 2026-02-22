import { FaEllipsisV } from "react-icons/fa";
import { useEffect, useState } from "react";

export const PageHeader = ({title, subTitle, onSearch, children}) =>{
    const [smShow, setSmShow] = useState(false);

    useEffect(()=>{
        const showOnSmScreen = () => setSmShow(false);
        document.addEventListener('click', showOnSmScreen);
        return () => document.removeEventListener('click', showOnSmScreen);
    }, []);

    return(
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
            {children && (
                <div onClick={(e)=>e.stopPropagation()} className="position-relative">
                    <div className="d-flex justify-content-end">
                        <button onClick={()=>setSmShow(!smShow)} className="btn btn-sm border-0 d-block d-md-none">
                            <FaEllipsisV/>
                        </button>
                    </div>
                    <div className={`header-menu ${smShow ? 'show' : ''} d-none d-md-block`}>
                        <div onClick={()=>setSmShow(false)} className="btn-group btn-group-sm">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}