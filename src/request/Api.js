import axios from "axios";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { User } from "./User";
import { routes } from "../routes/Routes";
import { Attendance } from "./Attendance";
import { Report } from "./Report";
import { School } from "./School";
import { Group } from "./Group";
import { Settings } from "./Settings";
import { Clock } from "./Clock";

export class Api{    
    constructor(){
        this.baseURL = window.location.hostname === 'localhost'
            ? 'http://localhost'
            : 'https://www.caribbeancodingacademygrenada.com';
        this.axios = axios.create({
            baseURL: `${this.baseURL}/tech-club-tracker-service`,
            headers: {
                Authorization: token.get(),
                Accept: 'application/json',
                AccessPath: window.location.pathname,
                Timzone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        });
        this.user = new User(this);
        this.auth = new Auth(this);
        this.attendance = new Attendance(this);
        this.report = new Report(this);
        this.school = new School(this);
        this.group = new Group(this);
        this.settings = new Settings(this);
        this.clock = new Clock(this);
    }

    reInitializeAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = token.get();
    }

    unsetAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = null;
    }

    parseError(error){
        if(error.status === 401 && !window.location.href.includes(routes.signin)){
            const pathname = `${location.origin}${location.pathname}`;
            location.href = `${pathname}#${routes.error.authentication}`;
        }
        throw error;
    }

    async post(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }

    async get(route, data){
        try{
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }
}

export const api = new Api();
