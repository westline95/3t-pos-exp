import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import InputWLabel from './InputWLabel';
import Button from '../elements/Button';

export default function HoldOrderModal({ show, onHide }) {

    return(
        <Modal 
        size="md" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Hold Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 style={{textAlign: "center", padding: "1rem 0"}}>
                    <span className='currency'>
                        Rp 
                    </span>
                     260,000 
                </h3>
                <InputWLabel 
                    labelFor="hold-order" 
                    labelValue="order reference" 
                    type="text" 
                    inputID="hodlOrderRef" 
                    placeholder="name this order" 
                /> 
            </Modal.Body>
            <Modal.Footer>
                <Button isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button isWarning={true}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}