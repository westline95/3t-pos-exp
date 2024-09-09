import React, {useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import propTypes  from "prop-types";

export default function InputWLabel(props){
    const {
        label, 
        as, 
        type, 
        pattern, 
        name,
        placeholder, 
        onChange, 
        value, 
        validation, 
        register,
        errors,
        disabled,
        require
    } = props;

    let styleInput;
    if(props.textStyle && props.textStyle === "capitalize"){
        styleInput = {
            textTransform: "capitalize"
        }
    }

    return (
        <div className="input-label d-flex flex-column flex-wrap">
            <Form.Label className="mb-1">{label}</Form.Label>
            <Form.Control 
                as={as} 
                type={type} 
                pattern={pattern} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={value} 
                disabled={disabled} 
                style={styleInput} 
                {...register(label, { required: require })}
            />
             {errors[label]?.type === "required" && <span className="field-msg-invalid">This field is required</span>}
        </div>
    )
}

InputWLabel.propTypes = {
    require: propTypes.bool,
    as: propTypes.string,
    type: propTypes.string,
    name: propTypes.string,
    placeholder: propTypes.string,
    label: propTypes.string,
    textStyle: propTypes.oneOf(["capitalize","lowercase"]),
    onChange: propTypes.func,
    value: propTypes.string,
    pattern: propTypes.string,
    validation: propTypes.bool,
    require: propTypes.bool,
    disabled: propTypes.bool,
    inputRef: propTypes.element
}