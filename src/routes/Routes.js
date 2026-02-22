
export const routes = {
    signin: '/authentication/sigin',
    recovery: '/authentication/recovery',
    logout: '/authentication/logout',
    updateCredentials: '/update/credential/by/token/:userId/:token',
    error: {
        authentication: '/error/authentication/not-sign-in',
        authorization: '/error/authorization/not-authorize',
        error404: '/error/404',
    },
    auth: () =>new (class{
        temp = '';
        default = '/tracker/*';
        attendance = (groupId=':groupId') => this.temp + 'attendance/' + groupId;
        attendanceSchoolSelection = (userId=':userId') => this.temp + 'attendance/shool/selection/' + userId;
        attendanceGroupSelection = (schoolId=':schoolId') => this.temp + 'attendance/group/selection/' + schoolId;
        home = () => this.temp + 'home';
        reports = () => this.temp + 'reports';
        report = (reportId=':reportId') => this.temp + 'report/' + reportId;
        schools = () => this.temp + 'schools';
        school = (schoolId=':schoolId') => this.temp + 'school/' + schoolId;
        students = (schoolId=':schoolId') => this.temp + 'students/' + schoolId;
        student = (schoolId=':schoolId', studentId=':studentId') => this.temp + 'student/' + studentId + '/' + schoolId;
        engagementAndProgress = (schoolId=':schoolId') => this.temp + 'engagement/&/progress/' + schoolId
        concat = () =>{
            this.temp = this.default.replace('*', '');
            return this;
        }
    }),
    admin: () =>new (class{
        temp = '';
        default = '/administration/*';
        admin = () => this.temp + 'tracker';
        user = (userId=':userId') => this.temp + 'user/' + userId;
        users = () => this.temp + 'users';
        school = (schoolId=':schoolId') => this.temp + 'school/' + schoolId;
        schools = () => this.temp + 'schools';
        analytics = () => this.temp + 'analytics';
        settings = () => this.temp + 'settings';
        students = (schoolId=':schoolId') => this.temp + 'students/' + schoolId;
        student = (schoolId=':schoolId', studentId=':studentId') => this.temp + 'student/' + studentId + '/' + schoolId;
        userSettings = (userId=':userId') => this.temp + 'user/settings/' + userId;
        assignSchools = (userId=':userId') => this.temp + 'assign/schools/' + userId;
        groups = () => this.temp + 'groups';
        group = (groupId=':groupId') => this.temp + 'group/' + groupId;
        assignToSchool = (groupId=':groupId') => this.temp + 'assign/school/to/group/' + groupId;
        assignToGroup = (schoolId=':schoolId') => this.temp + 'assign/group/to/school/' + schoolId;
        passwordRecovery = (userId=':userId') => this.temp + 'password/recovery/' + userId;
        concat = () =>{
            this.temp = this.default.replace('*', '');
            return this;
        }
    }),
    type: () =>new (class{
        isAdmin = () => window.location.href.includes(routes.admin().concat().temp);
    }),
}
