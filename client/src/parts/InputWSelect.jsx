import React from 'react';
import { Form } from 'react-bootstrap';
import { CustomSelect } from '../elements/CustomSelect';
import propTypes from "prop-types";

export default function InputWSelect(props) {
    const returnValue = (data) => {
        props.value(data);
    }
        
    return(
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1">{props.labelValue}</Form.Label>
            <CustomSelect options={props.options} selectedOption={returnValue} /> 
        </div>
    )
}

InputWSelect.propTypes = {
    labelValue: propTypes.string,
    value: propTypes.func,
    options: propTypes.array,
    onChange: propTypes.func
}