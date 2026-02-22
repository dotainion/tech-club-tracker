class Token{
    TOKEN_KEY = 'refresh-token';
    
    set(data){
        window.localStorage.setItem(this.TOKEN_KEY, data);
    }

    unset(){
        window.localStorage.setItem(this.TOKEN_KEY, null);
    }

    get(){
        return window.localStorage.getItem(this.TOKEN_KEY);
    }
}

export const token = new Token();