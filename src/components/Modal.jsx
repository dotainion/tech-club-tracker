import { createContext, useContext } from "react"

const Context = createContext();

export const Modal = ({show, onClose, useBackdropDismist, middle, children}) =>{
    const values = {
        onClose
    }

    if(!show) return null;

    return(
        <Context.Provider value={values}>
            <div
                className={`expandable-x position-fixed top-0 start-0 w-100 vh-100 d-flex ${middle ? 'align-items-center' : ''} justify-content-center py-3`}
                style={{ zIndex: 1051 }}
            >
                <div className="card border-0 d-flex flex-column text-overflow overflow-hidden" style={{ minWidth: '300px', maxWidth: '800px', width: '90%', zIndex: 1053 }}>
                    {children}
                </div>
                <div
                    onClick={()=> useBackdropDismist && onClose?.()}
                    className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-10"
                    style={{ zIndex: 1052 }}
                ></div>
            </div>
        </Context.Provider>
    )
}

export const ModalBody = ({ className, children }) =>{
    return(
        <div className={`card-body overflow-auto rounded-3 d-flex flex-column ${className || ''}`}>
            {children}
        </div>
    )
}

export const ModalHeader = ({className, style, children}) =>{
    const { onClose } = useContext(Context);
    return(
        <div className={`d-flex justify-content-between p-3 pb-0 ${className || ''}`} style={style}>
            <div>{children}</div>
            <div className="">
                <button onClick={onClose} className="btn btn-sm fs-4 p-0 border-0">✕</button>
            </div>
        </div>
    )
}

export const ModalFooter = ({children}) =>{
    return(
        <div className="d-flex justify-content-end gap-2 mt-3 border-top pt-3">
            {children}
        </div>
    )
}
