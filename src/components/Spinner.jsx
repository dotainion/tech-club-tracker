export const Spinner = ({show, inline, sm, white, withoutMessage, className, children}) =>{
    const size = sm ? 'sm' : 'md';
    const bg = white ? 'white' : 'primary';
    
    if(!show) return null;

    return(
        <div className={`${className || ''} position-${inline ? 'absolute h-100' : 'fixed vh-100'} top-0 start-0 w-100`} style={{zIndex: 1090}}>
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div className="text-center">
                    <div className={`spinner-border spinner-border-${size} text-${bg}`} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    {!withoutMessage && (
                        <>
                            {children ? children : (
                                <div>Please wait</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}