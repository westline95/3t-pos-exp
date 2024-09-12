import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

export const CustomSelect = (props) => {
    const { options, selectedOption, defaultValue } = props;
    const [openSelect, setOpen] = useState(false);
    const [isValue, setValue] = useState("");
    const refToThis = useRef(null);

    
    const handleClickSelect = (ref) => {
        useEffect(() => {
            const handleClickOutside = (evt) => {
                if(refToThis.current && !ref.current.contains(evt.target) ) {
                    setOpen(false);
                } else {
                    setOpen(true);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };
    handleClickSelect(refToThis);


    return(
        <>
        <div className="custom-select-opt">
            <div 
                className="same-as-select" 
                value={isValue === "" ? options[defaultValue] : isValue} 
                ref={refToThis}
                >
                <p>{isValue === "" ? options[defaultValue] : isValue}</p>
                <div className={`select-items ${openSelect ? "" : "select-hide"}`}>
                    {options.map((item, idx) => {
                        const handleClickOpt = () => {
                            setOpen((p) => !p);
                            setValue(item);
                            idx === defaultValue ? 
                            selectedOption("")
                            : selectedOption(item);
                        }
                        return(
                            idx === defaultValue ? 
                            <div key={idx} className="custom-select-opt" value="" onClick={handleClickOpt}>{item}</div>
                            : <div key={idx} className="custom-select-opt" value={item} onClick={handleClickOpt}>{item}</div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
        
    )
}

CustomSelect.propTypes = {
    options: propTypes.array.isRequired,
    selectedOption: propTypes.func,
    require: propTypes.bool,
    label: propTypes.string,
    // register: propTypes.func,
    elementRef: propTypes.func,
    defaultValue: propTypes.number
    
}
