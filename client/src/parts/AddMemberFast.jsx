import React, {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { useController, useForm,  } from "react-hook-form";
import { Modal, Form, ModalFooter, Toast, ToastContainer } from "react-bootstrap";
import InputWLabel from "./InputWLabel";
import InputWSelect from "./InputWSelect";
import Button from "../elements/Button";

export default function AddMemberFast({show, onHide, updatedData}) {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();

    const customerEndpoint = `https://threet-pos-exp.onrender.com/customer/write`;
    const fetchCustomerFast = async(orderData) => {
        await fetch(customerEndpoint, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Handle data
            updatedData(true);
        })
        .catch((err) => {
            console.log(err.message);
            updatedData(false);
        });
    }
    
    const handleSelect = (label, selectedVal) => {
    } 
    
    const onSubmit = (data) => {
        fetchCustomerFast(data);
        onHide();
    }
    
    const onError = (err) => {
        updatedData(false);

    }
    // console.log(watch("example")) // watch input value by passing the name of it
    
    
    return(
        <Modal 
        size="md" id="addNewMember" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <InputWLabel 
                    label="customer name" 
                    type="text" 
                    name="name" 
                    placeholder="Customer name..."
                    register={register}
                    require={true}
                    errors={errors}
                /> 
                <InputWLabel 
                    label="phone" 
                    type="text" 
                    name="phonenumber" 
                    placeholder="08..." 
                    register={register}
                    require={true}
                    errors={errors}
                /> 
                 <InputWSelect
                    label="customer type" 
                    name="custType"
                    options={["Select customer type", "Delivery order", "Walk-in"]}
                    value={handleSelect}
                    register={register}
                    require={true}
                    errors={errors}
                    defaultValue={0}
                    controller={useController({ name: 'custType', control })}
                />

                <InputWLabel 
                    label="address (optional)" 
                    as="textarea" 
                    name="address" 
                    placeholder="address" 
                    register={register}
                    require={false}
                    errors={errors}
                /> 
                </form>
            </Modal.Body>
            <ModalFooter>
                <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true} onClick={handleSubmit(onSubmit, onError)}>save</Button>
            </ModalFooter>

        </Modal>
    )
}