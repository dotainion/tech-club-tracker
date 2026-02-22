export class Settings{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/settings', data);
    }

    async fetch(data){
        return await this.api.get('/fetch/settings', data);
    }
}
