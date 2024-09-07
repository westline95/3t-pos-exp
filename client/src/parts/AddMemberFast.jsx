import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { Modal, Form, ModalFooter } from "react-bootstrap";
import InputWLabel from "./InputWLabel";
import InputWSelect from "./InputWSelect";
import Button from "../elements/Button";

export default function AddMemberFast({show, onHide}) {
    const [inValid, setValidation] = useState({field: "" , message:true});
    const [err, setErr] = useState(false);
    const [newCust, setNewCust] = useState({
        name: "",
        phone: "",
        type: "",
        address: "",
    });

    const optionValue = (val) => {
        setNewCust((prevFormData) => ({
            ...prevFormData,
            type: val,
        }));
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(value)
        if(name === "phone"){
            const patternNumeric = /^[0-9\b]+$/;
            const isNumeric = patternNumeric.test(value);
            if(isNumeric) {
                setNewCust((prevFormData) => ({
                    ...prevFormData,
                    [name]:value
                }));
            }
        } else {
            setNewCust((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    }

        // const formValidation = () => {
        //     if(newCust.name !== "" && newCust.phone !== "" && newCust.type !== ""){
        //         setValidation({
        //             message: true
        //         });

        //     } else {
        //         // console.log(newCust)
        //         // setValidation({
        //         //     ...newCust,
        //         //     message: false
        //         // });
        //         if(newCust.name === ""){
        //             setValidation({
        //                 message: false,
        //                 field: "name"
        //             });
        //         } else if(newCust.phone === ""){
        //             setValidation({
        //                 message: false,
        //                 field: "phone"
        //             });
        //         } else if(newCust.type === ""){
        //             setValidation({
        //                 message: false,
        //                 field: "type"
        //             });
        //         } 
        //         // newCust.name === "" ? setValidation(false) : setValidation(true);
        //         // newCust.phone === "" ? setValidation(false) : setValidation(true);
        //         // newCust.type === "" ? setValidation(false) : setValidation(true);
        //         // if(newCust.name === ""){
        //         //     setValidation(false);
        //         // } else if(newCust.phone === ""){
        //         //     setValidation(false);
        //         // } else if(newCust.type === ""){
        //         //     setValidation(false);
        //         // }
        //         // console.log(newCust)
        //     }
        //     // console.log(inValid)
        //     // console.log(newCust.name)

        // }
    
    useEffect(() => {
        console.log(inValid)
        // console.log(isValid == true);
        
    },[inValid])


    return(
        <Modal 
        size="md" id="addNewMember" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputWLabel 
                    labelFor="new-cust-name" 
                    labelValue="customer name" 
                    type="text" 
                    name="name" 
                    placeholder="Customer name..." 
                    value={newCust.name}
                    onChange={handleInputChange}
                    validation={inValid.ty}
                    require={true}
                    // {...inputFieldOpt({field: "name", required: true})}

                /> 
                <InputWSelect
                    labelValue="customer type" 
                    options={["customer type", "delivery order", "walk-in"]}
                    value={optionValue}
                    // onChange={handleInputChange}
                    validation={inValid}
                    require={true}
                />
                <InputWLabel 
                    labelFor="new-cust-phone" 
                    labelValue="phonenumber" 
                    type="phonenumber" 
                    name="phone" 
                    placeholder="08XXXXXXXXXX" 
                    value={newCust.phone ?? ""}
                    onChange={handleInputChange}
                    validation={inValid}
                    require={true}

                /> 
                <InputWLabel 
                    labelFor="new-cust-address" 
                    labelValue="address (optional)" 
                    as="textarea"
                    name="address" 
                    placeholder="08XXXXXXXXXX" 
                    value={newCust.address ?? ""}
                    onChange={handleInputChange}
                    validation={inValid}
                    require={false}
                /> 
            </Modal.Body>
            <ModalFooter>
                <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true}>save</Button>
            </ModalFooter>

        </Modal>
    )
}