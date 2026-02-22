import { GrAdd } from "react-icons/gr"

export const AddButton = ({className, onClick, smVisible, minHeight, col, children}) =>{
    return(
        <div
            className={`${className || ''} ${col ? col : 'col-12 col-sm-6 col-md-4 col-lg-3'} ${smVisible ? '' : 'd-none d-sm-block'}`}
            style={{minHeight: minHeight ? minHeight : '123px'}}
        >
            <div onClick={onClick} className="card as-btn border-dashed border-primary w-100 h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                    <div>
                        <GrAdd className="fs-3" />
                        <div className="position-relative">
                            <div className="position-absolute top-0 start-50 translate-middle-x">
                                <div className="small">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}