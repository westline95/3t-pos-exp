import React from 'react';
import { Form } from 'react-bootstrap';
import { CustomSelect } from '../elements/CustomSelect';
import propTypes from "prop-types";

export default function InputWSelect(props) {
    const returnValue = (data) => {
        return props.value(data);
    }
        
    return(
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1">{props.label}</Form.Label>
            <CustomSelect 
            options={props.options}
            label={props.label}
            selectedOption={returnValue} 
            /> 
        </div>
    )
}

InputWSelect.propTypes = {
    label: propTypes.string,
    value: propTypes.string,
    options: propTypes.array,
    onChange: propTypes.func,
}