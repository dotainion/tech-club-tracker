import { forwardRef } from "react"

export const Switch = forwardRef(({checked, onChange, className, bg, children}, ref) =>{
    
    return(
        <div className={className}>
            <div className="form-check form-switch">
                <label className="form-check-label w-100 pointer d-flex align-items-center gap-3">
                    <input
                        ref={ref}
                        className={`form-check-input pointer bg-${bg || ''}`}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                    />
                    {children}
                </label>
            </div>
        </div>
    )
});
