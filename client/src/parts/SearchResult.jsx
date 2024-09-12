import React, { useState } from 'react';

export default function SearchResult({show, result, onClick}) {
    // const [openPopup, setOpenPopup] = useState(false);
    
    // const handleChooseCust = (e) => {
    //     const custID = e.target.id;
    //     const custName = e.target.innerText;
    //     // setCust({id: custID, name: custName});
    //     show(false);
    // }

    return(
        <div className="popup-element" aria-expanded={show}>
        {result === "" ? "" :
            result.map((e,idx) => {
                // const data = {
                //     id: e.id,
                //     name: e.name,
                //     type: e.custType
                // }
                return (
                    <div key={`cust-${idx}`} className="res-item" onClick={() => onClick({
                            id: e.id,
                            name: e.name,
                            type: e.custType
                        })}>{e.name}
                        </div>
                )
            })
        }
        </div>
    )
}