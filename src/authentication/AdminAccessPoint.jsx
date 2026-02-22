import { AdminLayout } from "../layout/AdminLayout"
import { AdminSecurity } from "./AdminSecurity"
import { AuthSecurity } from "./AuthSecurity"

export const AdminAccessPoint = () =>{
    return(
        <AuthSecurity>
            <AdminSecurity>
                <AdminLayout/>
            </AdminSecurity>
        </AuthSecurity>
        
    )
}