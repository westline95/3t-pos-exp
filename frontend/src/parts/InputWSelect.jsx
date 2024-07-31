import React from 'react';
import { Form } from 'react-bootstrap';
import { CustomSelect } from '../elements/CustomSelect';

export default function InputWSelect({labelFor, labelValue, options }) {
    return(
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1" htmlFor={labelFor}>{labelValue}</Form.Label>
            <CustomSelect options={options} /> 
        </div>
    )
}