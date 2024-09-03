import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import propTypes  from "prop-types";

export default function InputWLabel(props){
    const [haveValidation, validity] = useState(true);
    // console.log(props.name)
    // console.log(props.validation)
    // useEffect(() => {
    //     validity(props.validation);
    //     console.log(props.validation)
    // },[props.validation])
    // console.log(haveValidation)
    return (
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1" htmlFor={props.labelFor}>{props.labelValue}</Form.Label>
            <Form.Control as={props.as} type={props.type} pattern={props.pattern} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
            {
                props.require ? 
                    <span className="field-msg-invalid" >{props.labelFor === props.validation.field && props.validation.message ? "" : "This field is required!"}</span>
                : ""
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
    onChange: propTypes.func,
    value: propTypes.string,
    pattern: propTypes.string,
    validation: propTypes.object,
    require: propTypes.bool
}