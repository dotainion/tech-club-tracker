export class Attendance{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/log/attendance', data);
    }

    async list(data){
        return await this.api.post('/list/attendance', data);
    }

    async setStudent(data){
        return await this.api.post('/set/student', data);
    }

    async students(data){
        return await this.api.post('/list/student', data);
    }

    async assign(data){
        return await this.api.post('/assign/student', data);
    }
}
