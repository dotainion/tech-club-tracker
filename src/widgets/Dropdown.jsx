import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext();

export const Dropdown = ({defaultTitle, children}) =>{
    const [title, setTitle] = useState(defaultTitle || '');

    const values = {
        setTitle
    }

    useEffect(()=>{
        if(defaultTitle || children.length === 0) return;
        setTitle(children[0]);
    }, []);
    
    return(
        <Context.Provider value={values}>
            <div className="dropdown user-select-none ">
                <button className="form-control shadow-none form-select text-start" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul className="dropdown-menu shadow-sm" hidden={children.length === 0}>
                    {children}
                </ul>
            </div>
        </Context.Provider>
    )
}

export const DropdownItem = ({value, onClick, children}) =>{
    const { setTitle } = useContext(Context);

    const click = () =>{
        setTitle(children);
        onClick?.(value || children);
    }

    return(
        <li onClick={click} className="dropdown-item">{children}</li>
    )
}