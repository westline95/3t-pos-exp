import React from 'react';
import { Modal } from "react-bootstrap";
import InputWLabel from './InputWLabel';
import Button from '../elements/Button';
import InputWSelect from './InputWSelect';
import NumberFormat from '../elements/NumberFormat';

export default function OrderPaymentModal({show, onHide, data }) {
    // console.log(data)

    const handleSelect = (label, value) => {

    }

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
                    <h3 style={{textAlign: "center", padding: "1rem 0"}}>
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