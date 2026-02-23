import { useEffect, useState } from "react"
import { BiMessageDetail } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";

export const Notification =  () =>{
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{

    }, []);

    return(
        <div className="dropdown">
            <button className="btn btn-sm border-0" data-bs-toggle="dropdown">
                <IoNotificationsSharp className={`text-${notifications.length > 0 ? 'danger' : 'secondary'}`} />
            </button>
            <div className="dropdown-menu overflow-auto" style={{maxHeight: '85vh'}}>
                {
                    notifications.length?
                    notifications.map((_, key)=>(
                        <button className="dropdown-item" key={`notific-${key}`}>Fish</button>
                    )):
                    <div className="text-center p-3">
                        <BiMessageDetail className="fs-3 mb-2" />
                        <h6>Notification</h6>
                        <p className="small text-muted">No notification available to you.</p>
                    </div>
                }
            </div>
        </div>
    )
}