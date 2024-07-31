import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { ButtonGroup, Form } from "react-bootstrap";
import Button from "../Button";

export default function QtyButton(props) {
    const { value, placeholder, name, min, max } = props;
    const [ inputValue, setInputValue ] = useState(value);

    const onChangeInput = (e) => {
        let val = e.target.value;
        const patternNumeric = new RegExp("[0-9]*");
        const isNumeric = patternNumeric.test(val);

        if(isNumeric && +val <= max && +val >= min) {
            e.target.name = name;
            e.target.value = +val;
            setInputValue(val);
        } else if(isNumeric && +val<min){
            setInputValue(min);
        }
    };

    const minus = () => {
        if(inputValue > min) {
            onChangeInput({ 
                target: {
                    name: name,
                    value:  setInputValue(count =>  count - 1 ),
                },
            });
        }
    };

    const plus = () => {
        inputValue < max &&
        onChangeInput({ 
            target: {
                name: name,
                value: setInputValue(count =>  count + 1 ),
            },
        });
    };

    return(
        <div className="order-qty-btn">
            <ButtonGroup>
                <Button type="button" onClick={minus}>
                    <box-icon name='minus' size="14px" color="#212529"></box-icon>
                </Button>
                <Form.Control 
                  type="text"
                  pattern="[0-9]*" 
                  placeholder={placeholder ? placeholder : "0"}
                  value={inputValue}
                  onChange={onChangeInput}
                  name={name}
                />
                <Button type="button" onClick={plus}>
                    <box-icon name='plus' size="14px" color="#212529"></box-icon>
                </Button>
            </ButtonGroup>
        </div>
    )
}


QtyButton.propTypes = {
    value: propTypes.number,
    placeholder: propTypes.string,
    onChange: propTypes.func,
    name: propTypes.string,
    min: propTypes.number,
    max: propTypes.number,
}