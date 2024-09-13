import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import InputWLabel from './InputWLabel';
import Button from '../elements/Button';
import InputWSelect from './InputWSelect';
import NumberFormat from '../elements/NumberFormat';
import InputGroup from '../elements/InputGroup';

export default function OrderPaymentModal({show, onHide, data }) {
    const [ tmp, setTmp ] = useState(null);
    const [ payMethod, setPayMethod ] = useState(null);

    const handleSelect = (label, data) => {
        setTmp(data);
    }

    useEffect(() => {
        setPayMethod(tmp);
    }, [handleSelect])
    

    return(
        <Modal 
        size="md" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Order Payment</Modal.Title>
            </Modal.Header>
            { 
                data ?     
                (
                <Modal.Body>    
                    <h3 style={{textAlign: "center", padding: ".75rem 0"}}>
                    <NumberFormat intlConfig={{
                        value: data.total, 
                        locale: "id-ID",
                        style: "currency", 
                        currency: "IDR",
                    }} 
                    />
                    </h3>
                    <InputWLabel 
                        label="customer name" 
                        type="text" 
                        placeholder="customerName" 
                        value={data.cust.name}
                        disabled={true}
                        textStyle={"capitalize"}
                    />  
                    <InputWSelect
                        label="payment method" 
                        options={["Select payment method", "Cash", "Hutang"]}
                        defaultValue={0}
                        value={handleSelect}
                    />
                    {
                        payMethod && payMethod.toLowerCase() === "cash" ? 
                        (
                            <InputGroup 
                                position={"left"}
                                label={"Received cash"} 
                                groupLabel={"Rp"}
                                name={"received-cash"}
                                placeholder={"0"}
                                inputMode={"numeric"}
                                mask={"currency"}
                                type={"text"}
                            />
                        ):""
                    }
                </Modal.Body>
                ) : ""
            }
          
            <Modal.Footer>
                <Button isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button isPrimary={true}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}