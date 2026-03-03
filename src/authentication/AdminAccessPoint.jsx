import { AdminLayout } from "../layout/AdminLayout"
import { AdminSecurity } from "./AdminSecurity"
import { AuthLoading } from "./AuthLoading.jsx"
import { AuthSecurity } from "./AuthSecurity"

export const AdminAccessPoint = () =>{
    return(
        <AuthLoading>
            <AuthSecurity>
                <AdminSecurity>
                    <AdminLayout/>
                </AdminSecurity>
            </AuthSecurity>
        </AuthLoading>
    )
}