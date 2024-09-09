import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import { useController, useForm } from "react-hook-form";
import { Modal, Form, ModalFooter } from "react-bootstrap";
import InputWLabel from "./InputWLabel";
import InputWSelect from "./InputWSelect";
import Button from "../elements/Button";

export default function AddMemberFast({show, onHide}) {
    const [inValid, setValidation] = useState(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    // const {
    //     field,
    //     fieldState: { invalid, isTouched, isDirty },
    //     formState: { touchedFields, dirtyFiellds },
    // } = useController({
    //     name,
    //     value
    // });

    const onSubmit = (data) => console.log(errors)
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
                    name="phone" 
                    placeholder="08..." 
                    register={register}
                    require={true}
                    errors={errors}
                /> 
                 <InputWSelect
                    label="customer type" 
                    options={["customer type", "delivery order", "walk-in"]}
                    // value={custType.type}
                    // onChange={handleInputChange}
                    // validation={inValid}
                    register={register}
                    require={true}
                    errors={errors}
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
                    {/* <input defaultValue="" {...register("example")} /> */}
                   
                    
                {/* <InputWLabel 
                    labelFor="new-cust-name" 
                    labelValue="customer name" 
                    type="text" 
                    name="name" 
                    placeholder="Customer name..." 
                    value={custName.name}
                    onChange={handleInputChange}
                    validation={inValid}
                    require={true}

                /> 
                <InputWSelect
                    labelValue="customer type" 
                    options={["customer type", "delivery order", "walk-in"]}
                    value={custType.type}
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
                    value={custPhone.phone}
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
                    value={custAddr.address}
                    onChange={handleInputChange}
                    // validation={inValid}
                    require={false}
                />  */}
            </Modal.Body>
            <ModalFooter>
            {/* <input type="submit" /> */}

            {/* </form> */}
                <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true} onClick={handleSubmit(onSubmit)}>save</Button>
            </ModalFooter>

        </Modal>
    )
}