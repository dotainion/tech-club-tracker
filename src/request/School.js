export class School{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/school', data);
    }

    async linkGroup(data){
        //may have same api link in api Group.js
        return await this.api.post('/set/school/to/group/link', data);
    }

    async linkUser(data){
        return await this.api.post('/set/school/link', data);
    }

    async list(data){
        return await this.api.post('/list/school', data);
    }
}
