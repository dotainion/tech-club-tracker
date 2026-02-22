import { AuthLayout } from "../layout/AuthLayout"
import { AuthSecurity } from "./AuthSecurity"

export const AuthAccessPoint = () =>{
    return(
        <AuthSecurity>
            <AuthLayout/>
        </AuthSecurity>
        
    )
}