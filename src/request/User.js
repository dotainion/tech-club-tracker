export class User{
    constructor(API){
        this.api = API;
    }

    async editProfile(data){
        return await this.api.get('/edit/user', data);
    }

    async create(data){
        return await this.api.get('/create/user', data);
    }

    async user(id){
        return await this.api.get('/fetch/user', {id});
    }

    async users(){
        return await this.api.get('/list/users', null);
    }

    async search(value){
        return await this.api.get('/search/users', {value});
    }

    async address(id){
        return await this.api.get('/fetch/address', {id});
    }

    async setAddress(data){
        return await this.api.get('/set/address', data);
    }

    async setRole(data){
        return await this.api.get('/set/role', data);
    }

    async fetchRole(userId){
        return await this.api.get('/fetch/role', {userId});
    }
}
