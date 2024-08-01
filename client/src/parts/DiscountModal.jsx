import React, {useState} from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "../elements/Button";

export default function DiscountModal({show, onHide}) {
    // const [ isOpen, setOpen ] = useState(show);
    const [ isShow, setShow ] = useState("discPercent");

    const openTab = (e) => {
        switch(e.currentTarget.id){
            case "discPercent":
                setShow("discPercent");
                break;
            case "discNominal":
                setShow("discNominal");
                break;
            case "discVoucher":
                setShow("discVoucher");
                break;
        }
    }

    return ( 
        <Modal size="md" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>add discount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="basic-tabs mt-3">
                    <div className="tabs-sm">
                        <div 
                        className={`tab-indicator ${isShow === "discPercent" ? "active" : ""}`} 
                        aria-label="defaultTab"
                        id="discPercent" 
                        onClick={(e) => openTab(e)}
                        >
                            <span className="tab-title" 
                            style={isShow === "discPercent" ? {color: "#344050"} : {color: "#FFFFFF"}}>
                            % percent
                            </span>
                        </div>
                        <div 
                        className={`tab-indicator ${isShow === "discNominal" ? "active" : ""}`}
                        id="discNominal"
                        onClick={(e) => openTab(e)} 
                        >
                            <span className="tab-title">
                                <box-icon name='dollar' 
                                size="16px" 
                                color={isShow === "discNominal" ? "#344050" : "#FFFFFF"}
                                style={{marginTop: "-3px"}}
                                >
                                </box-icon> 
                                nominal
                            </span>
                        </div>                        
                        <div 
                        className={`tab-indicator ${isShow === "discVoucher" ? "active" : ""}`} 
                        id="discVoucher"
                        onClick={(e) => openTab(e)}
                        >
                            <span className="tab-title">
                                <box-icon name='discount' 
                                type='solid' 
                                size="16px" 
                                color={isShow === "discVoucher" ? "#344050" : "#FFFFFF"} 
                                style={{marginTop: "-3px"}}>
                                </box-icon> 
                                voucher
                            </span>
                        </div>
                    </div>
                    <div className="tabs-content" 
                    style={isShow === "discPercent" ? {display: "block"} : {display: "none"}}>
                        <Form.Control type="text" placeholder="0%" style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}} />
                    </div>
                    <div className="tabs-content" 
                    style={isShow === "discNominal" ? {display: "block"} : {display: "none"}}>
                        <div className="input-group-left">
                            <span className="input-group-w-text fw-semibold currency">Rp </span>
                            <Form.Control type="text" className="input-w-text-left" placeholder="0" style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}} />
                        </div>
                    </div>
                    <div className="tabs-content" 
                    style={isShow === "discVoucher" ? {display: "block"} : {display: "none"}}>
                        <Form.Control type="text" placeholder="DISCOUNTTIME" onInput={(e) => {let p=e.selectionStart;e.value=e.value.toUpperCase();e.selectionRange(p,p);}} style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" isSecondary={true} isLight={true} onHide={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true}>apply</Button>
            </Modal.Footer>
        </Modal>
    )
}

