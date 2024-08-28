import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { ButtonGroup, Form } from "react-bootstrap";
import Button from "../Button";
import cartSlice from "../../store/reducers/cart";

export default function QtyButton(props) {
    const { data, value, placeholder, name, min, max } = props;
    const [ inputValue, setInputValue ] = useState(value ? value : 0);
    const [ delBtn, setDelBtn ] = useState(false);
    const dispatch = useDispatch();

    const minus = () => {
        if(inputValue > min) {
            const newValue = inputValue - 1;
            onChangeInput({ 
                target: {
                    name: name,
                    value: newValue,
                },
            });

            if(data) {
                dispatch(cartSlice.actions.decrement({
                    data: data,
                    stateValue: inputValue
                }));
            }
        } else if (data && inputValue === min){
            handleDeleteOrder(data.id);
        }
    };

    const plus = () => {
        if(inputValue < max) {
            const newValue = inputValue + 1;
            onChangeInput({ 
                target: {
                    name: name,
                    value: newValue,
                }
            })

            if(data) {
                dispatch(cartSlice.actions.increment({
                    data: data,
                    stateValue: inputValue
                }));
            } 
        }    
    };

    const onChangeInput = (e) => {
        let val = e.target.value;
        const patternNumeric = new RegExp("[0-9]*");
        const isNumeric = patternNumeric.test(val);
        let newVal;
        
        if(isNumeric && +val <= max && +val >= min) {
            e.target.name = name;
            e.target.value = +val;
            setInputValue(parseInt(+val));
            newVal = parseInt(+val);
        } else if (isNumeric && +val < min) {
            newVal = min;
            setInputValue(min);
        } else {
            newVal = min;
            setInputValue(min);
        }

        if(data) {
            dispatch(cartSlice.actions.write({
                data: data,
                stateValue: newVal
            }));

            if(newVal === 1) {
                setDelBtn(true);
            } else {
                setDelBtn(false);
            }
        } 
    };

    const handleDeleteOrder = (itemID) => {
        dispatch(cartSlice.actions.deleteItem(itemID));
    }

    useEffect(() => {
        const newValue = value;
        onChangeInput({ 
            target: {
                name: name,
                value: newValue,
            },
        });
    },[value])

    return(
        <div className="order-qty-btn">
            <ButtonGroup>
                <Button type="button" onClick={minus}>
                    {
                        delBtn ? <box-icon name='trash' size="14px" color="#212529"></box-icon> 
                        :<box-icon name='minus' size="14px" color="#212529"></box-icon>

                    }
                </Button>
                <Form.Control 
                  type="text"
                  pattern="[0-9]*" 
                  placeholder={placeholder ? placeholder : "0"}
                  value={inputValue}
                  onChange={onChangeInput}
                  name={name}
                  id={props.id}
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
    id: propTypes.string,
    data: propTypes.object
}