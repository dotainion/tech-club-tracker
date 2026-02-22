export const Page = ({className, children}) =>{
    return(
        <div className={`${className || ''} w-100 vh-100`}>
            <div className="container py-5">
                {children}
            </div>
        </div>
    )
}