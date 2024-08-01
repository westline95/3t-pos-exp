import React from "react";
import { useState, useRef } from "react";
import { Form, Modal, Card } from "react-bootstrap";
import ProductData from "../json/prodCategory.json";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Button from "../elements/Button/index";
import { CustomSelect } from "../elements/CustomSelect";
import AddMemberFast from "./AddMemberFast";
import Categories from "./Categories";
import OrderListItem from "../elements/OrderListItem";
import ProdListCard from "./ProdListCard";
import DiscountModal from "./DiscountModal";
import Tahu from "../assets/images/tahu.png";
import Tempe from "../assets/images/tempe.png";
import Tauge from "../assets/images/tauge.png";

export default function OrderPos(props){
    const [isHover, setIsHover] = useState(null);
    const [show, setShowModal] = useState(false);
    const [isActive, setCustType] = useState("member");
    const [payMethod, setPayMethod] = useState("cash");
    const [ isClose, setClose ] = useState(false)
    const handleMouseEnter = (e) => {
        switch (e.target.id) {
            case "leftControl":
                setIsHover("leftControl");
                break;
            case "rightControl":
                setIsHover("rightControl");
                break;
            case "holdOrderBtn":
                setIsHover("holdOrderBtn");
                break;
        }         
    };
    const handleShow = () => setShow(true);

    const closeOrderCard = () => {
        document.querySelector(".order-card-wrap").style.display ="none";
    }

    const handleCustType = (e) => {
        switch(e.target.getAttribute("aria-label")){
            case "member":
                setCustType("member");
                break;
            case "non-member":
                setCustType("nonMember");
                break; 
        }
    }

    const handlePayMethod = (e) => {
        switch(e.target.getAttribute("aria-label")) {
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
        }
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <Sidebar show={isClose} />
        <main className={`pos-content ${isClose ? "active" : ""}`}>
            <Header onClick={() => isClose ? setClose(false) : setClose(true)} />
            <section>
                <div className="search-mobile mb-4">
                    <div className="input-group-right">
                        <span className="input-group-icon">
                            <box-icon name='search' size="24px" color="#8f9399"></box-icon>
                        </span>
                        <Form.Control type="text" className="input-w-icon-right" placeholder="Search..." />
                    </div>
                </div>
                <div className="content-wrapper mt-4">
                    <h6 className="section-title">Categories</h6>
                    <div className="categories-list">
                        <Categories data={ProductData.prodCategory} />                      
                        {/* get data from database */}
                    </div>
                    <div className="categories-btn-control">
                         <Button 
                         id="leftControl"
                         type="button" 
                         className="btn btn-single-icon-rounded" 
                         onMouseEnter={handleMouseEnter} 
                         onMouseLeave={() => setIsHover(null)}>
                            <box-icon 
                            name='chevron-left' 
                            size="24px" 
                            color={isHover === "leftControl" ? "#ffffff" : "#252525"}>
                            </box-icon>
                        </Button>
                        <Button 
                         id="rightControl"
                         type="button" 
                         className="btn btn-single-icon-rounded" 
                         onMouseEnter={handleMouseEnter} 
                         onMouseLeave={() => setIsHover(null)}>
                            <box-icon 
                            name='chevron-right' 
                            size="24px" 
                            color={isHover === "rightControl" ? "#FFFFFF" : "#252525"}>
                            </box-icon>
                        </Button>
                    </div>
                </div>

                <ProdListCard data={ProductData.products} />
                
                <div className="order-card-wrap">
                    <Card>
                        <div className="mobile-btn" onClick={closeOrderCard}>
                            <div className="mobile-btn-group">
                                <box-icon name='arrow-back' size="20px" color="#42C0FB"></box-icon>
                                <p>Back</p>
                            </div>
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
                                    onClick={handleCustType}>member</Button>
                                    <Button 
                                    type="button" 
                                    className={isActive === "nonMember" ? "active" : "" } 
                                    ariaLabel="non-member" isRounded={true}
                                    onClick={handleCustType}>non-member</Button>
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
                            <OrderListItem 
                            prodName={"Tahu"} 
                            prodImg={`${Tahu}`} 
                            prodVar={"8 x 8"}
                            orderQty={7}
                            prodPrice={"50,000,-"}
                            inputName={"order-qty"}
                            min={1}
                            max={999}
                            currency={"Rp"}
                            />
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
                                        <p className="cost-addon-price">
                                            <span className="currency">Rp</span>
                                            0,-
                                        </p>
                                        <box-icon type='solid' name='cog' size="16px" color="#42C0FB" id="discModal" onClick={e => showModal(e)} style={{cursor: "pointer", padding: ".5px 6px"}}></box-icon>
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
                                    <Button ariaLabel="cash" type="button" isRounded={true} onClick={handlePayMethod} className={payMethod === "cash" ? "active" : ""}> 
                                        <box-icon name='money' size="15px" color={payMethod === "cash" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".35rem"}}></box-icon>
                                        cash
                                    </Button>
                                    <Button ariaLabel="pay-later" type="button" isRounded={true} onClick={handlePayMethod} className={payMethod === "payLater" ? "active" : ""}> 
                                        <box-icon name='timer' size="15px" color={payMethod === "payLater" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".5rem"}}></box-icon>
                                        pay later
                                    </Button>
                                </div>
                                <div className="submit-order">
                                    <Button type="button" isWarning={true} isRounded={true}>Hold order</Button>
                                    <Button type="button" isPrimary={true} isRounded={true}>Submit order</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </main>
        <AddMemberFast show={show === "addMemberFastModal" ? true : false} onHide={handleCloseModal} />
        <DiscountModal show={show === "discModal" ? true : false} onHide={handleCloseModal} />
        </>
    )
}