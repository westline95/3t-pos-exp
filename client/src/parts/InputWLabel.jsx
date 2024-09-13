import React, {useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import propTypes  from "prop-types";

export default function InputWLabel(props){
    const {
        label, 
        className,
        as, 
        type, 
        pattern, 
        name,
        placeholder, 
        onChange, 
        value, 
        register,
        errors,
        disabled,
        require,
        inputMode
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
                className={className}
                onChange={onChange} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                disabled={disabled} 
                style={styleInput} 
                inputMode={inputMode}
                {...register != null ? {...register(name, { required: require })} : ""}
            />
             {errors
             ? errors[name]?.type === "required" && <span className="field-msg-invalid">This field is required</span>
             : ""}
        </div>
    )
}

InputWLabel.propTypes = {
    require: propTypes.bool,
    as: propTypes.string,
    className: propTypes.string,
    type: propTypes.string,
    name: propTypes.string,
    placeholder: propTypes.string,
    label: propTypes.string,
    textStyle: propTypes.oneOf(["capitalize","lowercase"]),
    onChange: propTypes.func,
    value: propTypes.string,
    pattern: propTypes.oneOf(["currency", "number"]),
    validation: propTypes.bool,
    disabled: propTypes.bool,
    inputRef: propTypes.element,
    inputMode: propTypes.string
}