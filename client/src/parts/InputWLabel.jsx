import React from "react";
import { Form } from "react-bootstrap";

export default function InputWLabel({ as, type, placeholder, inputID, labelFor, labelValue, inputValue }){
    return (
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1" htmlFor={labelFor}>{labelValue}</Form.Label>
            <Form.Control as={as} type={type} id={inputID} placeholder={placeholder} />
        </div>
    )
}