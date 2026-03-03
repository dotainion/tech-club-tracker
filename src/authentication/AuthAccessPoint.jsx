import { AuthLayout } from "../layout/AuthLayout"
import { AuthLoading } from "./AuthLoading.jsx"
import { AuthSecurity } from "./AuthSecurity"

export const AuthAccessPoint = () =>{
    return(
        <AuthLoading>
            <AuthSecurity>
                <AuthLayout/>
            </AuthSecurity>
        </AuthLoading>
    )
}