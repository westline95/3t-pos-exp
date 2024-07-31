import React from "react";
import { Modal, Form, ModalFooter } from "react-bootstrap";
import InputWLabel from "./InputWLabel";
import InputWSelect from "./InputWSelect";
import Button from "../elements/Button";

export default function AddMemberFast({show, onHide}) {

    return(
        <Modal 
        size="md" id="addNewMember" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputWLabel 
                    labelFor="new-cust-name" 
                    labelValue="customer name" 
                    type="text" 
                    inputID="newCustFast" 
                    placeholder="Customer name..." 
                /> 
                <InputWSelect
                    labelFor="new-cust-type" 
                    labelValue="customer type" 
                    options={["customer type", "delivery order", "walk-in"]}
                />
                <InputWLabel 
                    labelFor="new-cust-phone" 
                    labelValue="phonenumber" 
                    type="text" 
                    inputID="newCustPhone" 
                    placeholder="08XXXXXXXXXX" 
                /> 
                <InputWLabel 
                    labelFor="new-cust-address" 
                    labelValue="address (optional)" 
                    as="textarea"
                    inputID="newCustAddress" 
                    placeholder="08XXXXXXXXXX" 
                /> 
            </Modal.Body>
            <ModalFooter>
                <Button type="button" isSecondary={true} isLight={true}>cancel</Button>
                <Button type="button" isPrimary={true}>save</Button>
            </ModalFooter>

        </Modal>
    )
}