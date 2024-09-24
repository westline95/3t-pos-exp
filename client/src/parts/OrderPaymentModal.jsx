import React, { useState, useEffect } from 'react';
import { Modal, Tab, Tabs, Form, Container, Toast, ToastContainer } from "react-bootstrap";
import Toaster from '../elements/Toast';
import InputWLabel from './InputWLabel';
import Button from '../elements/Button';
import InputWSelect from './InputWSelect';
import NumberFormat from '../elements/NumberFormat';
import InputGroup from '../elements/InputGroup';
import OrderListItem from '../elements/OrderListItem';
import BackspaceIcon from "../assets/images/backspace_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

export default function OrderPaymentModal({show, onHide, data }) {
    const [ tmp, setTmp ] = useState(null);
    const [ payMethod, setPayMethod ] = useState(null);
    const [ isHover, setIsHover ] = useState(null);
    const [ keypadValue, setKeypadVal ] = useState({formated: "0", origin: 0});
    const [showToast, setToastStatus] = useState(false);
    const [toastDetail, setToastDetail] = useState({});
    const handleSelect = (label, data) => {
        setTmp(data);
    }
    let locale = "id-ID";
    const formatedNumber = new Intl.NumberFormat(locale);

    const handleKeypad = (e) => {
        const val = e.target.innerText;
        const pattern = new RegExp("[0-9]");
        const patternTest = pattern.test(+val);
        if(patternTest){
            const newVal= (keypadValue.formated.replace(/[.,]/g,"")) + val;
            setKeypadVal({formated: formatedNumber.format(newVal), origin: Number(newVal)});
        } else{
            console.error("Not numeric value pattern!");
        }
    }

    const handleRemoveAll = () => {
        const newVal = "0";
        setKeypadVal({formated: formatedNumber.format(newVal), origin: Number(newVal)});
    }
    
    const handleRemove = () => {
        const clearVal = keypadValue.formated.replace(/[.,]/g,"");
        if(clearVal === "0" || clearVal === 0 || clearVal === ""){
            const newVal = "0";
            setKeypadVal({formated: formatedNumber.format(newVal), origin: Number(newVal)});
        } else {
            const newVal = clearVal.slice(0,-1);
            setKeypadVal({formated: formatedNumber.format(newVal), origin: Number(newVal)});
        }
    }

    const handleMouseEnter = (e) => {
        setIsHover(true);
    };

    const confirmPayment = () => {
        if(keypadValue.origin < data.grandTotal){
            setToastStatus(true);
            setToastDetail({
                message: "Not enough credit!",
                theme: "toast-danger"
            });
        }
    }

    useEffect(() => {
        setPayMethod(tmp);
    }, [handleSelect])


    return(
        <Modal 
        fullscreen={true} show={show} onHide={onHide} id="splitedModal">
            <Modal.Header>
                <Modal.Title>Order Payment</Modal.Title>
            </Modal.Header>
            { 
                data ?     
                (
                <Modal.Body>  
                    <div className="split-panel">
                        <div className="information-panel">
                            <div className="order-num-detail">
                                <p className="order-num-curr">order ID #260</p>
                                <p className="order-cust">{data.cust.name} • {data.custType}</p>
                                <p className="order-cust" style={{position: "absolute", right: "32px", bottom: "0px"}}>{data.orderType}</p>
                            </div>
                            <hr className="order-border" />
                            <div className="order-list-pre-wrap">
                                {data.cart.map((item, idx) => {
                                    return(
                                        <div key={`order-list-${item.id}`} className="order-list-pre">
                                            <div className="product-wrap">
                                                <p className="order-qty" style={{marginRight: "1rem"}}>{item.qty}</p>
                                                <div className="order-prod-detail">
                                                    <p className="order-product">{item.product}</p>
                                                    {item.variant != "" ?
                                                        (
                                                            <p className="order-desc">Variant: {item.variant}</p>
                                                        ) : ""                                                         
                                                    }
                                                </div>
                                            </div>
                                            <NumberFormat intlConfig={{
                                                value: item.totalPrice, 
                                                locale: "id-ID",
                                                style: "currency", 
                                                currency: "IDR",
                                                }} 
                                            />
                                        </div>
                                    )
                                })} 
                            </div>
                            <div className="order-cost-detail-pre">
                                <div className="mt-3 d-flex align-content-center justify-content-between" style={{padding: ".3rem 1rem"}}>
                                    <p className="order-price-label" style={{color: "#909BA5", fontWeight: "600"}}>Subtotal</p>
                                    <NumberFormat intlConfig={{
                                        value: data.total, 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }} 
                                    />
                                </div>                            
                                <div className="d-flex align-content-center justify-content-between" style={{padding: ".3rem 1rem"}}>
                                    <p className="order-price-label" style={{color: "#909BA5", fontWeight: "600"}}>Diskon</p>
                                    <NumberFormat intlConfig={{
                                        value: data.disc, 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }} 
                                    />
                                </div>
                                <div className="d-flex align-content-center justify-content-between" style={{padding: ".3rem 1rem", fontSize:"18px", fontWeight: "600"}}>
                                    <p className="order-price-label" style={{color: "#344045"}}>Total Keseluruhan</p>
                                    <NumberFormat intlConfig={{
                                        value: data.grandTotal, 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }} 
                                    />
                                </div>
                                <hr className="order-border" />
                                <div className="mt-2 d-flex align-content-center justify-content-between" style={{padding: ".3rem 1rem", fontWeight: "600", fontSize: "18px"}}>
                                    <p className="order-price-label" style={{color: "#344045"}}>Bayar</p>
                                    <NumberFormat intlConfig={{
                                        value: keypadValue.origin, 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }} 
                                    />
                                </div>
                                <div className="d-flex align-content-center justify-content-between" style={{padding: ".3rem 1rem", fontWeight: "600", fontSize: "18px"}}>
                                    <p className="order-price-label" style={{color: "#344045"}}>Kembali</p>
                                    <NumberFormat intlConfig={{
                                        value: keypadValue.origin === 0 ? 0 : (keypadValue.origin - data.grandTotal), 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }} 
                                    />
                                </div>
                            </div>
                           
                        </div>
                        <div className="active-panel">
                            <Tabs defaultActiveKey="cash">
                                <Tab eventKey="cash" title="Cash" style={{padding: "2rem"}}>
                                    <div className='input-prefix'>
                                        <span className='prefix'>Rp</span>
                                        <Form.Control type='text' dir='rtl' inputMode="none" style={{height: "75px", fontSize: "32px"}} value={keypadValue.formated || "0"} />
                                    </div>
                                    <Container className='keypad'>
                                        <div className='key-items' style={{display: "flex", flexWrap: "wrap"}}>
                                            <div className='p-4' onClick={handleKeypad}>1</div>
                                            <div className='p-4' onClick={handleKeypad}>2</div>
                                            <div className='p-4' onClick={handleKeypad}>3</div>
                                            <div className='p-4' onClick={handleKeypad}>4</div>
                                            <div className='p-4' onClick={handleKeypad}>5</div>
                                            <div className='p-4' onClick={handleKeypad}>6</div>
                                            <div className='p-4' onClick={handleKeypad}>7</div>
                                            <div className='p-4' onClick={handleKeypad}>8</div>
                                            <div className='p-4' onClick={handleKeypad}>9</div>
                                            <div className='p-4' onClick={handleKeypad}>0</div>
                                            <div className='p-4' onClick={handleKeypad}>00</div>
                                            <div className='p-4' onClick={handleRemove}>
                                                <img src={BackspaceIcon} alt="backspace Logo" type="svg"></img>
                                            </div>
                                            <div className='p-4' onClick={handleKeypad}>.</div>
                                            <div className='p-4 flex-fill' onClick={handleRemoveAll}>Cancel</div>
                                        </div>
                                    </Container>
                                        <Button 
                                        type="button" 
                                        className="fw-semibold" 
                                        isPrimary={true} 
                                        style={{width: "100%", padding: ".7rem", marginTop: "1.75rem"}}
                                        onClick={confirmPayment}
                                        >
                                            confirm Payment
                                        </Button>
                                </Tab>
                                <Tab eventKey="otherPayment" title="Other Methods" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                                    <div className="payment-list-wrap" style={{width: "100%"}}>
                                        <div className="items">
                                            <div className="item-list" 
                                                onMouseEnter={handleMouseEnter} 
                                                onMouseLeave={() => setIsHover(null)}>
                                                <box-icon 
                                                name='timer' 
                                                color={isHover ? "#ffffff" : "#344050"} 
                                                size="auto">
                                                </box-icon>
                                                <p className="iten-name">Hutang</p>
                                            </div>
                                            <div className="item-list">
                                                <p className="item-name">Coming soon</p>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div> 
                    </div> 
                </Modal.Body>
                ) : ""
            }
          
            <Modal.Footer>
                <Button isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
            </Modal.Footer>
            <ToastContainer style={{top: "4rem", right: "2rem"}}>
                <Toast 
                className={`align-items-center border-0 ${showToast ? toastDetail.theme: ""}`}
                aria-live='assertive' 
                aria-atomic="true" 
                animation={true}
                show={showToast} 
                onClose={() => setToastStatus(false)}
                delay={2000} 
                autohide>
                    <Toast.Body style={{fontWeight: "700"}}>{showToast ? toastDetail.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Modal>
    )
}