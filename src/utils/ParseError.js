export class ParseError{
    constructor(){

    }

    message(error){
        try{
            if(error?.response?.data?.error){
                return error.response.data.error.message;
            }
            if(typeof error === 'string' || error instanceof String){
                return error;
            }
            if(error instanceof Error){
                return error.message;
            }
            if(error?.response?.data){
                throw new Error('Response receive with incorrect error format.');
            }
            throw new Error('ErrorResponseHandler receive data and dont know what to do with it.');
        }catch(err){
            return err.message;
        }
    }

    meta(error){
        if(error?.response?.data?.error?.meta){
            return error.response.data.error.meta;
        }
        return null;
    }

    assertResponseHasNoError(response){
        if(response.data?.error){
            throw new Error(response.data.error.message);
        }
        return true;
    }
}