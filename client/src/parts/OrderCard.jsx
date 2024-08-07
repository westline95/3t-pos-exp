import React, {useState} from 'react';
import { Card, Form } from "react-bootstrap";
import { CustomSelect } from '../elements/CustomSelect';
import Button from '../elements/Button';
import OrderListItem from '../elements/OrderListItem';
import AddMemberFast from './AddMemberFast';
import DiscountModal from './DiscountModal';
import HoldOrderModal from './HoldOrderModal';
import Tahu from "../assets/images/tahu.png"

export default function OrderCard(props) {
    const [isActive, setCustType] = useState("member");
    const [payMethod, setPayMethod] = useState("cash");
    const [isHover, setIsHover] = useState(null);
    const [show, setShowModal] = useState(false);
    const [isClose, setClose] = useState(true);

    const handleMouseEnter = (e) => {
        switch (e.target.id) {
            case "holdOrderBtn":
                setIsHover("holdOrderBtn");
                break;
        }         
    };

    const handleCustPay = (e) => {
        switch(e.target.getAttribute("aria-label")){
            case "member":
                setCustType("member");
                break;
            case "non-member":
                setCustType("nonMember");
                break; 
            case "cash":
                setPayMethod("cash");
                break;
            case "pay-later":
                setPayMethod("payLater");
                break;
        }
    }

    const showModal = (e) => {
        switch(e.target.id){
            case "addMemberFastModal":
                setShowModal("addMemberFastModal");
                break;
            case "discModal":
                setShowModal("discModal");
                break;
            case "holdOrder":
                setShowModal("holdOrder");
                break;
        }
    }

    const closeOrderCard = () => {

        document.querySelector(".order-card-wrap").style.display ="none";
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    return (
        <>
        <div className="order-card-wrap" >
            <Card>
                <div className="mobile-btn" onClick={closeOrderCard}>
                    {/* <div className="mobile-btn-group"> */}
                        <box-icon name='arrow-back' size="20px" color="#42C0FB"></box-icon>
                        <p>Back</p>
                    {/* </div> */}
                </div>
                <div className="hold-feature">
                    <box-icon 
                    id="holdOrderBtn" 
                    type='solid' 
                    name='hourglass' 
                    size="18px" 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={() => setIsHover(null)}
                    color={isHover === "holdOrderBtn" ? "#f37c3b" : "#f6945f"}>                   
                    </box-icon>
                </div>
                <div className="order-top">
                    <div className="order-num-detail">
                        <p className="order-num-curr">Current order</p>
                        <p className="order-number">#260</p>
                    </div>
                    <div className="order-date-detail">
                        <p className="order-date">Wed, 24 Apr 24</p>
                        <p className="order-time">02:49 PM</p>
                    </div>
                    <div className="order-type">
                        <p className="order-type-label">order type</p>
                        {/* get option from database */}
                        <CustomSelect options={["order type", "walk-in", "delivery order"]} /> 
                    </div>
                    <hr className="order-border" />
                </div>
                <div className="order-feature">
                    <div className="cust-category-wrap">
                        <div className="wrapping-up">
                            <Button 
                            type="button" 
                            className={isActive === "member" ? "active" : "" } 
                            ariaLabel="member" isRounded={true}
                            onClick={handleCustPay}>member</Button>
                            <Button 
                            type="button" 
                            className={isActive === "nonMember" ? "active" : "" } 
                            ariaLabel="non-member" isRounded={true}
                            onClick={handleCustPay}>non-member</Button>
                        </div>
                        <Button type="button" isPrimary={true} isRounded={true} ariaLabel="add-member" id="addMemberFastModal" onClick={e => showModal(e)}>
                            <box-icon name='plus' size="18px" color="#FFFFFF" style={{verticalAlign: "middle"}}></box-icon>
                                add
                        </Button>
                    </div>
                    <div className="search-cust">
                        <div className={`input-label d-flex flex-row justify-content-between horizontal-form-control ${isActive === "member" ? "active" : "" }`}
                        aria-labelledby="member">
                            <label htmlFor="search-cust-name" className="align-self-center">Customer:</label>
                            <div className="input-group-right">
                                <span className="input-group-icon">
                                    <box-icon name='search' size="14px" color="#BDC4D1" style={{marginTop: "-3px"}}></box-icon>
                                </span>
                                <Form.Control type="text" className="input-w-icon-right" placeholder="Search..." id="searchCustMem"></Form.Control>
                            </div>
                        </div>
                        <div className={`input-label d-flex flex-row justify-content-between horizontal-form-control ${isActive === "nonMember" ? "active" : "" }`}
                        aria-labelledby="non-member">
                            <label htmlFor="search-cust-name" className="align-self-center">Customer:</label>
                            <Form.Control type="text" className="input-w-icon-right" placeholder="Type a customer name..." id="custNonMem"></Form.Control>
                        </div>
                    </div>
                </div>
                <hr className="order-border" />
                <div className="order-list-items">
                    {/* <OrderListItem 
                    prodName={"Tahu"} 
                    prodImg={`${Tahu}`} 
                    prodVar={"8 x 8"}
                    orderQty={7}
                    prodPrice={"50,000,-"}
                    inputName={"order-qty"}
                    min={1}
                    max={999}
                    currency={"Rp"}
                    /> */}
                </div>
                <div className="order-cost-wrap">
                    <div className="order-cost-detail">
                        <div className="order-cost-items">
                            <p className="cost text">items (4 items)</p>
                            <p className="cost-price">
                                <span className="currency">Rp</span>
                                200,000,-
                            </p>
                        </div>
                        <div className="order-cost-addon">
                            <p className="cost-addon-text">Discount</p>
                            <span className="d-flex justify-content-center">
                                <p className="cost-addon-price align-items-end">
                                    <span className="currency">Rp</span>
                                    0,-
                                </p>
                                <box-icon type='solid' name='cog' size="16px" color="#42C0FB" id="discModal" onClick={e => showModal(e)} style={{padding: ".5px 6px"}}></box-icon>
                            </span>
                        </div>
                    </div>
                    <div className="order-cost-total">
                        <p className="order-cost-total-text">total</p>
                        <p className="order-cost-total-price"><span className="currency">Rp</span> 200,000,-</p>
                    </div>
                    <div className="order-cost-feature">
                        <p className="order-payment-title">payment method</p>
                        <div className="payment-btn-wrap">
                            <Button ariaLabel="cash" type="button" isRounded={true} onClick={handleCustPay} className={payMethod === "cash" ? "active" : ""}> 
                                <box-icon name='money' size="15px" color={payMethod === "cash" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".35rem"}}></box-icon>
                                cash
                            </Button>
                            <Button ariaLabel="pay-later" type="button" isRounded={true} onClick={handleCustPay} className={payMethod === "payLater" ? "active" : ""}> 
                                <box-icon name='timer' size="15px" color={payMethod === "payLater" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".5rem"}}></box-icon>
                                pay later
                            </Button>
                        </div>
                        <div className="submit-order">
                            <Button type="button" isWarning={true} isRounded={true} id="holdOrder" onClick={(e) => showModal(e)}>Hold order</Button>
                            <Button type="button" isPrimary={true} isRounded={true}>Submit order</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        {/* modal */}
        <AddMemberFast show={show === "addMemberFastModal" ? true : false} onHide={handleCloseModal} />
        <DiscountModal show={show === "discModal" ? true : false} onHide={handleCloseModal} />
        <HoldOrderModal show={show === "holdOrder" ? true : false} onHide={handleCloseModal} />
        </>
        
    )
}