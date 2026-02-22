export class Group{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/group', data);
    }

    async linkSchool(data){
        //may have same api link in api School.js
        return await this.api.post('/set/school/to/group/link', data);
    }

    async list(data){
        return await this.api.post('/list/group', data);
    }
}
