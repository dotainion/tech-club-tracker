export class Report{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/report', data);
    }

    async list(data){
        return await this.api.post('/list/report', data);
    }
}
