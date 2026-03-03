import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { dateTime } from "../utils/DateTime";

export const DatePicker = forwardRef(({ className, onChange, value, month, rounded }, ref) => {
    const inputType = month ? 'month' : 'date';

    const [today] = useState(
        month
            ? dateTime.now().format('ym').toString()
            : dateTime.now().format('ymd').toString()
    );
    const [showInput, setShowInput] = useState(false);
    const [selectedValue, setSelectedValue] = useState(today);

    const inputRef = useRef(null);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        onChange?.(e);
        if (e.target.value !== today) return;
        setShowInput(false);
    };

    const handleFinishChange = () => {
        if (!showInput) return;
        if (selectedValue !== today) return;
        setShowInput(false);
    };

    useImperativeHandle(ref, ()=>({
        value: selectedValue,
        openPicker: ()=> setShowInput(true)
    }), [ref, showInput, selectedValue]);

    useEffect(() => {
        if (!value) return;
        setSelectedValue(
            month 
                ? value.substring(0, 7) 
                : value.substring(0, 10)
        );
    }, [value]);

    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.showPicker?.();
        }
    }, [showInput]);

    return (
        <div className="d-inline-block text-nowrap">
            {!showInput && selectedValue === today ? (
                <button onClick={()=>setShowInput(true)} className={`${className || ''} btn btn-sm btn-outline-dark border rounded-${rounded ? rounded : 'pill'} px-3`}>
                    📅 {month ? 'This Month' : 'Today'}
                </button>
            ) : (
                <div className={`${className || ''} btn btn-sm btn-outline-dark rounded-${rounded ? rounded : 'pill'} border-0 p-0`}>
                    <div className={`input-group input-group-sm user-select-none rounded-${rounded ? rounded : 'pill'} bg-transparent`}>
                        <span className={`input-group-text rounded-start-${rounded ? rounded : 'pill'} border bg-transparent text-inherit`}>📅</span>
                        <input
                            ref={inputRef}
                            type={inputType}
                            className={`form-control rounded-end-${rounded ? rounded : 'pill'} shadow-none border bg-transparent text-inherit`}
                            value={selectedValue}
                            onChange={handleChange}
                            onBlur={handleFinishChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
});
