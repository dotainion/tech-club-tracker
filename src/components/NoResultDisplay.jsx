import { BiUser } from "react-icons/bi"
import { BsClock } from "react-icons/bs"
import { FaSchool } from "react-icons/fa"
import { GrGroup } from "react-icons/gr"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { PiStudent } from "react-icons/pi"

export const NoResultDisplay = ({icon, title, description, mt, children}) =>{
    return(
        <div className={`d-flex justify-content-center mt-${mt ? mt : '5'}`}>
            <div className="p-2 text-center border-bottom border-3" style={{maxWidth: '400px'}}>
                <div className="d-inline-block p-3 bg-dark text-white rounded-circle">
                    {icon === 'report' && <HiOutlineDocumentReport className="fs-1" />}
                    {icon === 'student' && <PiStudent className="fs-1" />}
                    {icon === 'school' && <FaSchool className="fs-1" />}
                    {icon === 'group' && <GrGroup className="fs-1" />}
                    {icon === 'user' && <BiUser className="fs-1" />}
                    {icon === 'log' && <BsClock className="fs-1" />}
                </div>
                <h5 className="mt-3">{title}</h5>
                <p className="text-muted small">{description}</p>
                {children}
            </div>
        </div>
    )
}