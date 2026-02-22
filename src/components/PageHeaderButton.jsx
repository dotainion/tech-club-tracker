import { Fragment } from "react";
import { DatePicker } from "../wedgits/DatePicker";

export const PageHeaderButton = ({className, onClick, onChange, type, dateValue, children}) =>{
    return(
        <Fragment>
            {['month', 'date'].includes(type) ? (
                <span className={`${className || ''} btn btn-sm btn-outline-dark border p-0`}>
                    <DatePicker onChange={onChange} {...{month: type === 'month', value: dateValue}}/>
                </span>
            ):(
                <button onClick={onClick} className={`${className || ''} btn btn-sm btn-outline-dark border text-nowrap`}>
                    {children}
                </button>
            )}
        </Fragment>
    )
}