import { Spinner } from "../components/Spinner"

export const SubmitButton = ({loading, disabled, outline, onClick, className, spinnerBgPrimary, md, bg, px, children}) =>{
    return(
        <button
            onClick={onClick}
            className={`position-relative btn btn-${md ? 'md' : 'sm'} btn-${outline ? 'outline-' : ''}${bg ? bg : 'primary'} px-${px ? px : '4'} ${className || ''}`}
            disabled={loading || disabled}
            type="submit"
        >
            <Spinner show={loading} inline sm white={!spinnerBgPrimary} withoutMessage />
            {children}
        </button>
    )
}