import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Card, Form } from "react-bootstrap";
import { CustomSelect } from '../elements/CustomSelect';
import NumberFormat from '../elements/NumberFormat';
import cartSlice from '../store/reducers/cart';
import Button from '../elements/Button';
import OrderListItem from '../elements/OrderListItem';
import AddMemberFast from './AddMemberFast';
import DiscountModal from './DiscountModal';
import HoldOrderModal from './HoldOrderModal';
import OrderPaymentModal from './OrderPaymentModal';
import Tahu from "../assets/images/tahu.png";

export default function OrderCard(props) {
    const dispatch = useDispatch();
    const [isActive, setCustType] = useState("member");
    const [payMethod, setPayMethod] = useState("cash");
    const [isHover, setIsHover] = useState(null);
    const [show, setShowModal] = useState(false);
    const [isClose, setClose] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const [custData, setCustData] = useState("");
    const [filterCust, setFilteredCust] = useState([]);
    const [chooseCust, setCust] = useState(null);
    const refToThis = useRef(null);


    const endpoint = `https://threet-pos-exp.onrender.com/customers`;
    const fetchCustomer = async() => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        setCustData(data);
    }
    const list = useSelector((state) => state.cart.cartData); 
    const checkDisc = useSelector((state) => state.cart.discount); 
    const [cartItem, setCart ] = useState(list ? list : null);
    const [totalCart, setTotalCart] = useState(() => {
        let totalPrice = 0;
        if(list) {
            list.map(e => totalPrice += e.totalPrice);
            return totalPrice;
        } else {
            return 0;
        }
    });

    const [discVal, setDisc ] = useState(() => {
        if(localStorage.getItem("activeDiscount")) {
            const getDisc = JSON.parse(localStorage.getItem("activeDiscount"));

            if(getDisc.type === "percent"){
                const cutValue = totalCart * (getDisc.value / 100);
                return cutValue;
            } else if(getDisc.type === "nominal"){
                
            } else if(getDisc.type === "voucher"){
                
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    });
    const [itemTotal, setItem] = useState(list ? list.length : 0);

    const getDate = () => {
        const dayString = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
        const monthString = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const today = new Date();
        const day = today.getDay();
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const todayDate = dayString[day]+", "+ date + " " + monthString[month] + " " + year;
        return todayDate;
    }

    const getTime = () => {
        const today = new Date();
        const getHours = today.getHours();
        const getMin = today.getMinutes();
        const getSec = today.getSeconds();
        const currTime = getHours+":"+getMin+":"+getSec;
        return currTime;
    }

    const [todayDate, setTodayDate] = useState(getDate());
    const [time, setTime] = useState(getTime());

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
            case "submitOrder":
                setShowModal("submitOrder");
                break;
        }
    }
    
    const closeOrderCard = () => {
        document.querySelector(".order-card-wrap").style.display ="none";
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDisc = (data, totalPrice) => {
        if(data.type === "percent") {
            const cutValue = totalPrice ? totalPrice * (data.value / 100) : totalCart * (data.value / 100);
            setDisc(cutValue);
        } else if(data.type === "nominal"){
            
        } else if(data.type === "voucher"){
            
        }
    }

    const submitOrder = () => {
        if(payMethod === "cash"){

        }
    }

    const handleAutoComplete = (custName) => {
        if(custData !== "" && custName !== ""){
            let filteredCust = custData.filter(item => item.name.includes(custName.toLowerCase()));
            if(filteredCust.length === 0){
                setOpenPopup(false);
            } else {
                setOpenPopup(true);
                setFilteredCust(filteredCust);
            }
        } else {
            setOpenPopup(true);
            setFilteredCust(custData);
        }
        setCust({id: "", name: custName});
    }

    const searchMembCust = (e) => {
        const custName = e.target.value;
        handleAutoComplete(custName)
    }

    const handleClickSelect = (ref) => {
        useEffect(() => {
            const handleClickOutside = (evt) => {
                if(refToThis.current 
                    && !ref.current.contains(evt.target) 
                    && evt.target.className !== "res-item" 
                    && evt.target.className !== "popup-element") {
                    setOpenPopup(false);
                } else {
                    handleAutoComplete(ref.current.value);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [custData, ref]);
    };
    handleClickSelect(refToThis);

    const handleChooseCust = (e) => {
        const custID = e.target.id;
        const custName = e.target.innerText;
        setCust({id: custID, name: custName});
        setOpenPopup(false);
    }

    useEffect(() => {
        setCart(list);
        
        if(list){
            let totalPrice = 0;
            list.map(e => totalPrice += e.totalPrice);
            setTotalCart(totalPrice);
            setItem(list.length);

            const checkDisc = localStorage.getItem("activeDiscount");
            if(checkDisc && list.length > 0){
                const parseData = JSON.parse(localStorage.getItem("activeDiscount"));
                handleDisc(parseData, totalPrice);
            }else if(list.length === 0){
                dispatch(cartSlice.actions.applyVoucher({value:0}));
                setDisc(0);
            }
        }
    },[list])      
    
    useEffect(() => {
        if(checkDisc){
            handleDisc(checkDisc);
        } 
    },[checkDisc]);

    useEffect(() => {
        fetchCustomer();
        const dateTime = setInterval(() => {
            setTodayDate(getDate());
            setTime(getTime());
        }, 1000);
        return function cleanup() {
            clearInterval(dateTime);
        }
    })
    
    
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
                        <p className="order-date">{todayDate ? todayDate : "error date"}</p>
                        <p className="order-time">{time ? time : "error time"}</p>
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
                        <Button type="button" isPrimary={true} isRounded={true} ariaLabel="add-member" id="addMemberFastModal" onClick={showModal}>
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
                                    <box-icon name='search' size="14px" color="#BDC4D1item" style={{marginTop: "-3px"}}></box-icon>
                                </span>
                                <Form.Control 
                                type="text" 
                                autoComplete='off' 
                                className="input-w-icon-right" 
                                placeholder="Search..." 
                                value={chooseCust ? chooseCust.name : ""} 
                                id="searchCustMem" 
                                onChange={searchMembCust} 
                                ref={refToThis}
                                onFocus={(e) => e.currentTarget.value === "" ? setFilteredCust(custData) : ""}  
                                />
                                <div className="popup-element" aria-expanded={openPopup}>
                                {filterCust === "" ? "" :
                                    filterCust.map((e,idx) => {
                                        return (
                                            <div key={`cust-${idx}`} className="res-item" onClick={handleChooseCust}>{e.name}</div>
                                        )
                                    })
                                }
                                </div>   
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
                    {
                    cartItem ? 
                        (
                            cartItem.map((item, idx) => {
                                return(
                                    <OrderListItem 
                                    key={item.id}
                                    data={item}
                                    inputName={"order-qty"}
                                    min={1}
                                    max={999}
                                    currency={"Rp"}
                                    />
                               )
                            })
                        )
                        : ""
                    }
                </div>
                <div className="order-cost-wrap">
                    <div className="order-cost-detail">
                        <div className="order-cost-items">
                            <p className="cost text">item ({itemTotal > 1 ? itemTotal+" items" : itemTotal + " item"})</p>
                            <p className="cost-price">
                                <NumberFormat intlConfig={{
                                    value: totalCart, 
                                    locale: "id-ID",
                                    style: "currency", 
                                    currency: "IDR",
                                }} 
                                />
                            </p>
                        </div>
                        <div className="order-cost-addon">
                            <p className="cost-addon-text">Discount</p>
                            <span className="d-flex justify-content-center">
                                <p className="cost-addon-price align-items-end">
                                <NumberFormat intlConfig={{
                                    value: discVal, 
                                    locale: "id-ID",
                                    style: "currency", 
                                    currency: "IDR",
                                }} 
                                />
                                </p>
                                <box-icon type='solid' name='cog' size="16px" color="#42C0FB" id="discModal" onClick={showModal} style={{padding: ".5px 6px"}}></box-icon>
                            </span>
                        </div>
                    </div>
                    <div className="order-cost-total">
                        <p className="order-cost-total-text">total</p>
                        <p className="order-cost-total-price">
                            <NumberFormat intlConfig={{
                                value: totalCart && discVal ? totalCart - discVal : totalCart, 
                                locale: "id-ID",
                                style: "currency", 
                                currency: "IDR",
                            }} 
                            />
                        </p>
                    </div>
                    <div className="order-cost-feature">
                        {/* <p className="order-payment-title">payment method</p>
                        <div className="payment-btn-wrap">
                            <Button ariaLabel="cash" type="button" isRounded={true} onClick={handleCustPay} className={payMethod === "cash" ? "active" : ""}> 
                                <box-icon name='money' size="15px" color={payMethod === "cash" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".35rem"}}></box-icon>
                                cash
                            </Button>
                            <Button ariaLabel="pay-later" type="button" isRounded={true} onClick={handleCustPay} className={payMethod === "payLater" ? "active" : ""}> 
                                <box-icon name='timer' size="15px" color={payMethod === "payLater" ? "#42C0FB" : "#5b5e60"} style={{verticalAlign: "top", marginRight: ".5rem"}}></box-icon>
                                pay later
                            </Button>
                        </div> */}
                        <div className="submit-order">
                            <Button type="button" isWarning={true} isRounded={true} id="holdOrder" onClick={showModal}>Hold order</Button>
                            <Button type="button" isPrimary={true} isRounded={true} id="submitOrder" onClick={showModal}>Submit order</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        {/* modal */}
        <AddMemberFast show={show === "addMemberFastModal" ? true : false} onHide={handleCloseModal} />
        <DiscountModal show={show === "discModal" ? true : false} onHide={handleCloseModal} />
        <HoldOrderModal show={show === "holdOrder" ? true : false} onHide={handleCloseModal} />
        <OrderPaymentModal show={show === "submitOrder" ? true : false} onHide={handleCloseModal} data={show ? {total: (totalCart - discVal), custName: "", custType: ""} : 0} />
        </>
        
    )
}

