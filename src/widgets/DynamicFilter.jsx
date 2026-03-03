import { useLocation } from "react-router-dom";
import { DatePicker } from "./DatePicker"
import { useEffect, useState } from "react"

export const DynamicFilter = ({onDateChange, dateValue, items}) =>{
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const location = useLocation();

    useEffect(()=>{
        if(!items.length) return;
        let zi = items.length;

        const identifier = (i) => {
            const id = (i * new Date().getTime());
            return `${location.pathname}${i}${id}`;
        };

        const modifiedItems = items.map((item, i)=>{
            ['position', 'icon'].forEach((attr)=>{
                if(!Object.keys(item).includes(attr)){
                    console.error(`DynamicFilter must contain attribute (${attr}).`);
                }
            });

            let itemList = [];
            if(item.items && item.items.length){
                itemList = item.items.map((option, ii)=>{
                    ['title'].forEach((key)=>{
                        if(!Object.keys(option).includes(key)){
                            console.error(`DynamicFilter must contain attribute (${key}) when using items attribute.`);
                        }
                    });
                    return {...option, id: identifier(zi + ii + i)};
                });
                
            }

            if(item.noItem && !item.noItem.title){
                console.error('DynamicFilter noItems must contain attribute (title).');
            }

            const zIndex = item.position === 'LEFT' ? i : zi;
            item = {...item, items: itemList, z: zIndex, id: identifier(zi + i)};
            zi = zi -1;
            return item;
        });
        
        setLeft(modifiedItems.filter((item)=>item.position === 'LEFT'));
        setRight(modifiedItems.filter((item)=>item.position === 'RIGHT'));
    }, [items]);

    return(
        <div className="d-flex rounded-2 bg-white rounded-pill">
            {left.map((item)=>(
                <span className="bg-white position-relative rounded-start-pill" style={{zIndex: item.z}} key={item.id}>
                    <div className="dropdown">
                        <button onClick={item.onClick} className="btn btn-sm btn-outline-dark border rounded-start-pill shadow-sm ps-3 pe-4" data-bs-toggle="dropdown" style={{width: '65px', marginRight: '-20px'}}>
                            <item.icon />
                        </button>
                        <div className="dropdown-menu" hidden={item.items.length === 0 && !item.noItem}>
                            {item.items.map((option)=>(
                                <button onClick={option.onClick} className="dropdown-item" key={option.id}>{option.title}</button>
                            ))}
                            {item.items.length === 0 && item.noItem && (
                                <div className="user-select-none px-3">
                                    <div className="text-semibold text-nowrap mb-0">{item.noItem.title}</div>
                                    <p className="text-muted small mb-0">{item.noItem.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </span>
            ))}
            <span className="bg-white position-relative rounded-pill" style={{zIndex: 3}}>
                <DatePicker onChange={onDateChange} className="shadow-sm" value={dateValue} month />
            </span>
            {right.map((item)=>(
                <span className="bg-white position-relative rounded-end-pill" style={{zIndex: item.z}} key={item.id}>
                    <div className="dropdown" style={{marginLeft: '-20px'}}>
                        <button onClick={item.onClick} className="btn btn-sm btn-outline-dark border rounded-end-pill shadow-sm pe-3" data-bs-toggle="dropdown" style={{paddingLeft: '30px'}}>
                            <item.icon />
                        </button>
                        <div className="dropdown-menu" hidden={item.items.length === 0 && !item.noItem}>
                            {item.items.map((option)=>(
                                <button onClick={option.onClick} className="dropdown-item" key={option.id}>{option.title}</button>
                            ))}
                            {item.items.length === 0 && item.noItem && (
                                <div className="user-select-none px-3">
                                    <div className="text-semibold text-nowrap mb-0">{item.noItem.title}</div>
                                    <p className="text-muted small mb-0">{item.noItem.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </span>
            ))}
        </div>
    )
}
