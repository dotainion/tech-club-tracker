import { Spinner } from "./Spinner"

export const SpinnerConditional = ({loading, children}) =>{
    if(loading) return(
        <Spinner show inline />
    )
    return children;
}