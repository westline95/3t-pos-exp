import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import propTypes  from "prop-types";

export default function InputWLabel(props){
    const [inputVal, setInputVal] = useState(props.value ? props.value : "");
    const handleChange = (e) => {
        setInputVal(e.target.value);
    }
    let styleInput;
    if(props.textStyle && props.textStyle === "capitalize"){
        styleInput = {
            textTransform: "capitalize"
        }
    }

    return (
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1" htmlFor={props.labelFor}>{props.labelValue}</Form.Label>
            <Form.Control 
            as={props.as} 
            type={props.type} 
            pattern={props.pattern} 
            name={props.name} 
            placeholder={props.placeholder} 
            onChange={handleChange} 
            value={inputVal} 
            disabled={props.disabled} 
            style={styleInput} />
            {
                // props.require ? 
                //     <span className="field-msg-invalid" >{props.labelFor === props.validation.field && props.validation.message ? "" : "This field is required!"}</span>
                // : ""
            }
        </div>
    )
}

InputWLabel.propTypes = {
    require: propTypes.bool,
    as: propTypes.string,
    type: propTypes.string,
    name: propTypes.string,
    placeholder: propTypes.string,
    labelFor: propTypes.string,
    labelValue: propTypes.string,
    textStyle: propTypes.oneOf(["capitalize","lowercase"]),
    onChange: propTypes.func,
    value: propTypes.string,
    pattern: propTypes.string,
    validation: propTypes.object,
    require: propTypes.bool,
    disabled: propTypes.bool
}