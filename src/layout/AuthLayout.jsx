import { Outlet } from "react-router-dom"
import { RouteDetectiveProvider } from "../hooks/RouteDetectiveProvider"
import { AuthSecurity } from "../authentication/AuthSecurity"
import { MenuLayout } from "./MenuLayout"

export const AuthLayout = () =>{
    return(
        <AuthSecurity>
            <RouteDetectiveProvider>
                <MenuLayout>
                    <Outlet/>
                </MenuLayout>
            </RouteDetectiveProvider>
        </AuthSecurity>
    )
}