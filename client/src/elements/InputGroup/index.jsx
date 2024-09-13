import React, {useState} from 'react';
import propTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function InputGroup(props) {
    const { position, label, groupLabel, type, placeholder, inputMode, name, value, onChange, mask } = props;
    const [ val, setVal] = useState("");
    const [ masked, setMask ] = useState("");
    let locale = "id-ID";
    const formatedNumber = new Intl.NumberFormat(locale);
    

    const handleMask = (e) => {
        let val = e.target.value.replace(/[.,]/g,"") || e.target.value;
        
        switch(mask) {
            case "currency":
                let pattern = new RegExp("[0-9]*");
                let matchPattern = pattern.test(+val);
                
                if(matchPattern){
                    if(+val >= 0 ){
                        const formatCurrency = +val;
                        // let maskedVal = formatCurrency.replace(/[.,]/g,"");
                        // setMask(maskedVal);
                        setVal(formatedNumber.format(formatCurrency));
                        // e.target.value = formatedNumber.format(formatCurrency);

                        console.log(formatCurrency);
                    } else {
                        setVal(0);
                    }
                } else {
                    setVal(0);
                }
                break;
        
            default:
                break;
        }
    }

    return(
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1">{label}</Form.Label>
            <div className={`input-group-${position}`}>
                <span className="input-group-w-text fw-semibold">{groupLabel}</span>
                <Form.Control 
                    type={type} 
                    name={name}
                    className={`input-w-text-${position}`}
                    placeholder={placeholder} 
                    inputMode={inputMode}     
                    mask={mask}          
                    value={mask ? val : value}
                    onChange={mask ? handleMask : onChange} 
                    style={{borderTopLeftRadius: "0 !important", borderTopRightRadius: "0 !important"}} 
                />
            </div>
        </div>
    )
}


InputGroup.propTypes = {
    position: propTypes.oneOf(["left", "right"]).isRequired,
    label: propTypes.string,
    groupLabel: propTypes.oneOfType([propTypes.string, propTypes.element]),
    type: propTypes.string,
    name: propTypes.string,
    placeholder: propTypes.string,
    value: propTypes.string,
    inputMode: propTypes.oneOf(["search", "text", "none", "tel", "url", "email", "numeric", "decimal"]),
    mask: propTypes.oneOf(["currency", "number"]),

}