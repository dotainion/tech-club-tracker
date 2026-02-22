import { useState } from "react"
import { DatePicker } from "./DatePicker";
import { LuSettings2 } from "react-icons/lu";

export const StackFilter = ({defaultValues, onChange}) =>{
    const {
        limit: defaultLimit,
        date: defaultDate,
        published: defaultPublished
    } = defaultValues || {};
    const [dateValue, setDateValue] = useState(defaultDate || null);
    const [published, setPublished] = useState(defaultPublished || null);
    const [limit, setLimit] = useState(defaultLimit || 100);

    const change = (field, value) =>{
        const data = {
            limit,
            published,
            date: dateValue,
            [field]: value
        }
        setLimit(data.limit);
        setDateValue(data.date);
        setPublished(data.published);
        onChange(data);
    }

    return(
        <div className="d-flex">
            <input
                onChange={(e)=>change('limit', parseInt(e.target.value))}
                className="btn btn-sm btn-outline-dark pointer-text border rounded-start-pill shadow-sm ps-3 pe-4"
                title={`Fetchm ${limit} records`}
                type="number"
                value={limit}
                min={1}
                style={{
                    marginRight: '-20px',
                    width: '90px'
                }}
            />
            <span className="bg-white position-relative rounded-pill" style={{zIndex: 1}}>
                <DatePicker className="shadow-sm" onChange={(e)=>change('date', e.target.value)} value={dateValue} month />
            </span>
            <div className="dropdown" style={{marginLeft: '-20px'}}>
                <button className="btn btn-sm btn-outline-dark border rounded-end-pill shadow-sm pe-3" data-bs-toggle="dropdown" style={{paddingLeft: '30px'}}>
                    <LuSettings2 />
                </button>
                <ul className="dropdown-menu">
                    <li className="small text-muted border-bottom px-2">Filter Reports</li>
                    <li onClick={()=>change('published', !published)} className="dropdown-item small">{published ? 'Draft' : 'Publish'}</li>
                    <li onClick={()=>change('published', null)} className="dropdown-item small">All</li>
                </ul>
            </div>
        </div>
    )
}