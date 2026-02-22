import { Outlet } from "react-router-dom"
import { Menu } from "./Menu"
import { RouteDetectiveProvider } from "../hooks/RouteDetectiveProvider"
import { AuthSecurity } from "../authentication/AuthSecurity"

export const AuthLayout = () =>{
    return(
        <AuthSecurity>
            <RouteDetectiveProvider>
                <Menu/>
                <Outlet/>
            </RouteDetectiveProvider>
        </AuthSecurity>
    )
}