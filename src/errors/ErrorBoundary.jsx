export const ErrorBoundary = ({children}) =>{
    try{
        return children;
    }catch(error){
        console.log('there is a error')
        return null
    }
}