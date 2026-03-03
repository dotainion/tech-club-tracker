import { useState } from "react"
import { LuSettings2 } from "react-icons/lu";
import { DynamicFilter } from "../widgets/DynamicFilter";

export const ReportApiFilter = ({defaultValues, onChange}) =>{
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
        <DynamicFilter
            dateValue={dateValue}
            onDateChange={(e)=>setDateValue(e.target.value)}
            items={[
                {
                    icon: LuSettings2,
                    position: 'RIGHT',
                    items: [
                        {
                            title: published ? 'Draft' : 'Publish',
                            onClick: ()=>change('published', !published)
                        },{
                            title: 'All',
                            onClick: ()=>change('published', null)
                        },
                    ]
                }
            ]}
        />
    )
}