import { BiUser } from "react-icons/bi"
import { FaSchool } from "react-icons/fa"
import { GrGroup } from "react-icons/gr"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { PiStudent } from "react-icons/pi"

export const NoResultDisplay = ({icon, title, description, mt, children}) =>{
    return(
        <div className={`d-flex justify-content-center mt-${mt ? mt : '5'}`}>
            <div className="p-2 text-center border-bottom border-3" style={{maxWidth: '400px'}}>
                <div className="d-inline-block p-3 bg-dark text-white rounded-circle">
                    {icon === 'report' && <HiOutlineDocumentReport className="display-5" />}
                    {icon === 'student' && <PiStudent className="display-5" />}
                    {icon === 'school' && <FaSchool className="display-5" />}
                    {icon === 'group' && <GrGroup className="display-5" />}
                    {icon === 'user' && <BiUser className="display-5" />}
                </div>
                <h4 className="mt-3">{title}</h4>
                <p className="text-muted">{description}</p>
                {children}
            </div>
        </div>
    )
}