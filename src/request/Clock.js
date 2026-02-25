export class Clock{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.post('/set/log', data);
    }

    async list(data){
        return await this.api.post('/list/log', data);
    }
}
