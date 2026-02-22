import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Context = createContext();

export const useRouteDetective = () =>useContext(Context);

export const RouteDetectiveProvider = ({children}) =>{
    const location = useLocation();

    const routeDetectiveRef = useRef([]);

    const mount = (attribute, fx, param) =>{
        const timeId = new Date().getTime();
        routeDetectiveRef.current.push({
            id: timeId, 
            routeParam: param,
            detective: { [attribute]: fx }
        });
        return ()=>({ unmount: unmount(timeId) });
    }

    const unmount = (id) =>{
        const newList = routeDetectiveRef.current.filter((li)=>li.id !== id);
        routeDetectiveRef.current = newList;
    }

    const routeDetectiveOnCreate = (fx, param) =>{
        //param is use if you need to sepecify what route to check against.
        return mount('onCreate', fx, param);
    }

    const routeDetectiveOnExist = (fx, param) =>{
        //param is use if you need to sepecify what route to check against.
        return mount('onExist', fx, param);
    }

    const containsDefaultRouteId = (value=undefined) =>{
        if(value !== undefined){
            return value.includes(':') && value.includes('Id');
        }
        return location.pathname.includes(':') && location.pathname.includes('Id');
    }

    useEffect(()=>{
        if(containsDefaultRouteId()){
            routeDetectiveRef.current.forEach((detect)=>{
                if(detect.routeParam){
                    if(!location.pathname.includes(detect.routeParam)) return;
                }
                detect.detective.onCreate?.();
            });
        }else{
            routeDetectiveRef.current.forEach((detect)=>{
                if(detect.routeParam){
                    if(!location.pathname.includes(detect.routeParam)) return;
                }
                detect.detective.onExist?.();
            });
        }
    }, [location]);

    const values = {
        routeDetectiveOnCreate,
        routeDetectiveOnExist,
        containsDefaultRouteId
    }

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
}