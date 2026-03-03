export class ParseError{
    error = null;

    constructor(error){
        this.error = error;
    }

    message(){
        try{
            if(this.error?.response?.data?.error){
                return this.error.response.data.error.message;
            }
            if(typeof this.error === 'string' || this.error instanceof String){
                return this.error;
            }
            if(this.error instanceof Error){
                return this.error.message;
            }
            if(this.error?.response?.data){
                throw new Error('Response receive with incorrect error format.');
            }
            throw new Error('ErrorResponseHandler receive data and dont know what to do with it.');
        }catch(err){
            return err.message;
        }
    }

    meta(key){
        if(this.error?.response?.data?.error?.meta){
            if(key){
                if(this.error.response.data.error.meta?.[key]){
                    return this.error.response.data.error.meta[key];
                }
                return null;
            }
            return this.error.response.data.error.meta;
        }
        return null;
    }

    hasErrorTrace(){
        return !!this.meta('ERROR_TRACE');
    }

    printErrorTrace(){
        console.log(this.meta('ERROR_TRACE'));
    }
}