import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Student } from './pages/Sudent'
import { Schools } from './pages/Schools'
import { School } from './pages/School'
import { Home } from './pages/Home'
import { routes } from './routes/Routes'
import { Report } from './pages/Report'
import { Reports } from './pages/Reports'
import { AuthAccessPoint } from './authentication/AuthAccessPoint'
import { NotSignIn } from './errors/NotSignin'
import { AdminAccessPoint } from './authentication/AdminAccessPoint'
import { NotAuthorize } from './errors/NotAuthorize'
import { Users } from './admin/Users'
import { User } from './admin/User'
import { Admin } from './admin/Admin'
import { AdminSchools } from './admin/AdminSchools'
import { AdminSchool } from './admin/AdminSchool'
import { Analytics } from './admin/Analytics'
import { AdminSettings } from './admin/AdminSettings'
import { Students } from './pages/Students'
import { AdminStudents } from './admin/AdminStudents'
import { AdminStudent } from './admin/AdminSudent'
import { SignIn } from './account/SignIn'
import { AuthProvider } from './providers/AuthProvider'
import { Recovery } from './account/Recovery'
import { Error404 } from './errors/Error404'
import { Logout } from './pages/Logout'
import { AdminUserSettings } from './admin/AdminUserSettings'
import { AdminAssignSchools } from './admin/AdminAsignSchools'
import { MarkAttendance } from './pages/MarkAttendance'
import { AttendanceSchoolSelection } from './pages/AttendanceSchoolSelection'
import { AttendanceGroupSelection } from './pages/AttendanceGroupSelection'
import { AdminGroups } from './admin/AdminGroups'
import { AdminAssignToSchool } from './admin/AdminAssignToSchool'
import { AdminGroup } from './admin/AdminGroup'
import { EngagementAndProgress } from './pages/EngagementAndProgress'
import { AdminAssignToGroup } from './admin/AdminAssignToGroup'
import { PasswordRecovery } from './admin/PasswordRecovery'
import { UpdateByToken } from './account/UpdateByToken'
import { Attendance } from './pages/Attendance'
import { FacilitatorSignin } from './pages/FacilitatorSignin'
import { FacilitatorLogs } from './pages/FacilitatorLogs'
import { StudentLogs } from './pages/StudentLogs'

export const App = () =>{
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route path={routes.auth().default} element={<AuthAccessPoint/>}>
                        <Route path={routes.auth().attendance()} element={<Attendance/>}/>
                        <Route path={routes.auth().markAttendance()} element={<MarkAttendance/>}/>
                        <Route path={routes.auth().attendanceSchoolSelection()} element={<AttendanceSchoolSelection/>}/>
                        <Route path={routes.auth().attendanceGroupSelection()} element={<AttendanceGroupSelection/>}/>
                        <Route path={routes.auth().home()} element={<Home/>}/>
                        <Route path={routes.auth().reports()} element={<Reports/>}/>
                        <Route path={routes.auth().report()} element={<Report/>}/>
                        <Route path={routes.auth().schools()} element={<Schools/>}/>
                        <Route path={routes.auth().school()} element={<School/>}/>
                        <Route path={routes.auth().students()} element={<Students/>}/>
                        <Route path={routes.auth().student()} element={<Student/>}/>
                        <Route path={routes.auth().engagementAndProgress()} element={<EngagementAndProgress/>}/>
                        <Route path={routes.auth().facilitatorSignin()} element={<FacilitatorSignin/>}/>
                        <Route path={routes.auth().facilitatorLogs()} element={<FacilitatorLogs/>}/>
                        <Route path={routes.auth().studentLogs()} element={<StudentLogs/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Route>
                    <Route path={routes.admin().default} element={<AdminAccessPoint/>}>
                        <Route path={routes.admin().user()} element={<User/>}/>
                        <Route path={routes.admin().users()} element={<Users/>}/>
                        <Route path={routes.admin().admin()} element={<Admin/>}/>
                        <Route path={routes.admin().schools()} element={<AdminSchools/>}/>
                        <Route path={routes.admin().school()} element={<AdminSchool/>}/>
                        <Route path={routes.admin().analytics()} element={<Analytics/>}/>
                        <Route path={routes.admin().settings()} element={<AdminSettings/>}/>
                        <Route path={routes.admin().students()} element={<AdminStudents/>}/>
                        <Route path={routes.admin().student()} element={<AdminStudent/>}/>
                        <Route path={routes.admin().userSettings()} element={<AdminUserSettings/>}/>
                        <Route path={routes.admin().assignSchools()} element={<AdminAssignSchools/>}/>
                        <Route path={routes.admin().groups()} element={<AdminGroups/>}/>
                        <Route path={routes.admin().group()} element={<AdminGroup/>}/>
                        <Route path={routes.admin().assignToSchool()} element={<AdminAssignToSchool/>}/>
                        <Route path={routes.admin().assignToGroup()} element={<AdminAssignToGroup/>}/>
                        <Route path={routes.admin().passwordRecovery()} element={<PasswordRecovery/>}/>
                        <Route path={routes.admin().report()} element={<Report/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Route>
                    <Route path={routes.signin} element={<SignIn/>}/>
                    <Route path={routes.recovery} element={<Recovery/>}/>
                    <Route path={routes.updateCredentials} element={<UpdateByToken/>}/>
                    <Route path={routes.logout} element={<Logout/>}/>
                    <Route path={routes.error.authentication} element={<NotSignIn/>}/>
                    <Route path={routes.error.authorization} element={<NotAuthorize/>}/>
                    <Route path={routes.error.error404} element={<Error404/>}/>
                    <Route path="/" element={<Navigate to={routes.auth().concat().home()}/>}/>
                    <Route path="*" element={<Navigate to={routes.error.error404}/>}/>
                </Routes>
            </HashRouter>
        </AuthProvider>
    )
}
