import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form } from "react-bootstrap";
import Button from "../elements/Button";
import cartSlice from "../store/reducers/cart";

export default function DiscountModal({show, onHide}) {
    const [ inputDiscount, setDiscount ] = useState(0);
    const [ discType, setDiscType ] = useState("percent");
    const [ isShow, setShow ] = useState("discPercent");
    const dispatch = useDispatch();

    const openTab = (e) => {
        setDiscount("");
        switch(e.currentTarget.id){
            case "discPercent":
                setShow("discPercent");
                setDiscType("percent");
                break;
            case "discNominal":
                setShow("discNominal");
                setDiscType("nominal");
                break;
            case "discVoucher":
                setShow("discVoucher");
                setDiscType("voucher");
                break;
        }
    }

    const list = useSelector(state => state.cart.cartData);


    const handleVoucher = (e) => {
        const disc = e.currentTarget.value;
        let pattern, matchPattern;
        switch(isShow){
            case "discPercent":
                pattern = new RegExp("[0-9]*");
                matchPattern = pattern.test(disc);

                if(matchPattern && +disc >= 0){
                    setDiscount(parseFloat(+disc));
                } else if(matchPattern && +disc < 0) {
                    setDiscount(0);
                } else {
                    setDiscount(0);
                }
                break;
            case "discNominal":
                pattern = new RegExp("[0-9]*");
                matchPattern = pattern.test(disc);

                if(matchPattern && +disc >= 0){
                    setDiscount(parseInt(+disc));
                } else if(matchPattern && +disc < 0) {
                    setDiscount(0);
                } else {
                    setDiscount(0);
                }
                break;
            case "discVoucher":
                pattern = new RegExp("^[A-Za-z]+$");
                matchPattern = pattern.test(disc);
                const newVal = disc.toUpperCase();
                matchPattern ? setDiscount(newVal) :  "";
                break;
        }
    }

    const applyVoucher = () => {
        if(list.length > 0) {
            const voucher = {
                value: inputDiscount,
                type: discType
            }
            dispatch(cartSlice.actions.applyVoucher(voucher));
        } else {
            console.log("add product first!");
        }
        onHide();
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
                    <div className="tabs-content"  >
                        {
                            isShow === "discPercent" 
                            ? <Form.Control 
                                type="text" 
                                placeholder="0" 
                                inputMode="numeric"
                                pattern="[0-9]*"                                 
                                value={inputDiscount || 0} 
                                maxLength={2}
                                onChange={handleVoucher} 
                                style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}}  
                              /> 
                            : isShow === "discNominal"
                            ? <> <div className="input-group-left">
                                    <span className="input-group-w-text fw-semibold currency">Rp </span>
                                    <Form.Control 
                                        type="text" 
                                        className="input-w-text-left" 
                                        placeholder="0"   
                                        pattern="[0-9]*"                        
                                        value={inputDiscount || 0}
                                        onChange={handleVoucher} 
                                        style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}} 
                                    />
                                </div>
                              </>
                            : isShow === "discVoucher"
                            ? <Form.Control 
                                type="text" 
                                placeholder="DISCOUNTTIME" 
                                inputMode="text"
                                pattern="[^[A-Za-z]+$]"
                                value={inputDiscount || ""}
                                onChange={handleVoucher} 
                                style={{borderTopLeftRadius: "0", borderTopRightRadius: "0"}} 
                              />
                            : "" 
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" isSecondary={true} isLight={true} onHide={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true} onClick={applyVoucher}>apply</Button>
            </Modal.Footer>
        </Modal>
    )
}

