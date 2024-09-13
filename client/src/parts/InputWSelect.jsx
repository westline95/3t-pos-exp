import React, {useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import { CustomSelect } from '../elements/CustomSelect';
import propTypes from "prop-types";

export default function InputWSelect(props) {
    const { field } = props.controller ? props.controller : "";
    const [selected, selectedVal] = useState(field ? field.value || "" : "");
    const [selected2, selectedVal2] = useState("");
    const returnValue = (data) => {
        selectedVal2(data);

        if(props.value){
            return props.value(props.label, data);
        }
    }

    useEffect(() => {
        selectedVal(selected2);
        if(field){
            field.onChange(selected2);
        }
    },[returnValue]);
    
    return(
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1">{props.label}</Form.Label>
            <CustomSelect 
                options={props.options}
                label={props.label}
                selectedOption={returnValue} 
                defaultValue={props.defaultValue}
            /> 
            <Form.Select 
            id={props.label} 
            name={props.name} 
            value={selected}
            {...props.register ? {...props.register(props.name, { required: props.require })} : ""}
            style={{display: "none"}}
            >
                {props.options.map((item, idx) => {
                    return(
                        idx === props.defaultValue ? 
                        <option key={idx} value="">{item}</option>
                        : <option key={idx} value={item}>{item}</option>
                    )
                })}
            </Form.Select>
            {props.errors ?
              props.errors[props.name]?.type === "required" && <span className="field-msg-invalid">This field is required</span>
             : "" }

        </div>
    )
}

InputWSelect.propTypes = {
    label: propTypes.string,
    name: propTypes.string,
    value: propTypes.func,
    options: propTypes.array,
    onChange: propTypes.func,
    require: propTypes.bool,
    defaultValue: propTypes.number
    // register:propTypes.func
}