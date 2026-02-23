export const Page = ({className, children}) =>{
    return(
        <div className={`${className || ''} pt-0 mb-5`}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}