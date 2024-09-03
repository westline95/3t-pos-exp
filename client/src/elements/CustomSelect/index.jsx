import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";

export const CustomSelect = ({ options, selectedOption }) => {
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
        <div className="custom-select-opt">
            <div 
                className="same-as-select" 
                value={isValue === "" ? options[0] : isValue} 
                ref={refToThis}>
                <p>{isValue === "" ? options[0] : isValue}</p>
                <div className={`select-items ${openSelect ? "" : "select-hide"}`}>
                    {options.map((item, idx) => {
                        const handleClickOpt = () => {
                            setOpen((p) => !p);
                            setValue(item);
                            selectedOption(item);
                        }
                    
                        return(
                            <div key={idx} value={item} onClick={handleClickOpt}>{item}</div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

CustomSelect.propTypes = {
    options: propTypes.array.isRequired,
    selectedOption: propTypes.func

}
