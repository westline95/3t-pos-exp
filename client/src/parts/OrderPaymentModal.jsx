import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import InputWLabel from './InputWLabel';
import Button from '../elements/Button';
import InputWSelect from './InputWSelect';
import NumberFormat from '../elements/NumberFormat';

export default function OrderPaymentModal({ data, show, onHide }) {

    return(
        <Modal 
        size="md" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Order Payment</Modal.Title>
            </Modal.Header>
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
                    labelFor="submit-order-cust" 
                    labelValue="customer name" 
                    type="text" 
                    inputID="orderCustName" 
                    placeholder="customerName" 
                    inputValue={data.custName}
                />  
                <InputWSelect
                    labelFor="submit-order-pay" 
                    labelValue="payment method" 
                    options={["select payment method", "cash", "hutang"]}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button isPrimary={true}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}