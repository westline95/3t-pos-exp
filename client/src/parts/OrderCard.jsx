import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Card, Form, Toast, ToastContainer } from "react-bootstrap";
import { CustomSelect } from '../elements/CustomSelect';
import NumberFormat from '../elements/NumberFormat';
import cartSlice from '../store/reducers/cart';
import Button from '../elements/Button';
import Toaster from '../elements/Toast';
import OrderListItem from '../elements/OrderListItem';
import AddMemberFast from './AddMemberFast';
import DiscountModal from './DiscountModal';
import HoldOrderModal from './HoldOrderModal';
import OrderPaymentModal from './OrderPaymentModal';
import GetDateTime from '../elements/GetDateTime';
import Tahu from "../assets/images/tahu.png";

export default function OrderCard(props) {
    const dispatch = useDispatch();
    const [isActive, setCustType] = useState("member");
    const [payMethod, setPayMethod] = useState("cash");
    const [isHover, setIsHover] = useState(null);
    const [show, setShowModal] = useState(false);
    const [showToast, setToastStatus] = useState(false);
    const [toastDetail, setToastDetail] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [custData, setCustData] = useState("");
    const [filterCust, setFilteredCust] = useState([]);
    const [chooseCust, setCust] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [orderStatus, setOrderStatus] = useState(false);
    const [orderType, setOrderType] = useState("");
    const [orderTypeTmp, setOrderTypeTmp] = useState("");
    const [updateDB, setUpdateDB] = useState(false);
    const refToThis = useRef(null);


    const endpoint = `https://threet-pos-exp.onrender.com/customers`;
    const fetchCustomer = async() => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        setCustData(data);
    }

    const returnSelectVal = (selected) => {
        setOrderTypeTmp(selected)
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
                const cutValue = getDisc.value;
                return cutValue;
            } else if(getDisc.type === "voucher"){
                
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    });
    const [itemTotal, setItem] = useState(list ? list.length : 0);
    const [todayDate, setTodayDate] = useState(GetDateTime.getDate);
    const [time, setTime] = useState(GetDateTime.getTime);

    const handleMouseEnter = (e) => {
        switch (e.target.id) {
            case "holdOrderBtn":
                setIsHover("holdOrderBtn");
                break;
        }         
    };
        
    const handleCustPay = (e) => {
        setToastDetail({
            message: ""
        });
        switch(e.target.getAttribute("aria-label")){
            case "member":
                setCust({
                    name: ""
                })
                setCustType("member");
                break;
                case "non-member":
                setCust({
                    name: ""
                })
                setCustType("guest");
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
                if(cartItem.length > 0) {
                    setShowModal("discModal");
                } else {
                    setToastDetail({
                        message: "Add product first!",
                        theme: "toast-danger"
                    });
                    setToastStatus(true);
                }
                break;
            case "holdOrder":
                setShowModal("holdOrder");
                break; 
            case "submitOrder":
                submitOrder();
                // console.log(orderData)
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
            const cutValue = data.value;
            setDisc(cutValue);
        } else if(data.type === "voucher"){
            
        }
    }

    const submitOrder = () => {
        // if(!orderStatus){
            if(cartItem.length === 0) {
                setToastStatus(true);
                setToastDetail({
                    message: "Please add product first!",
                    theme: "toast-danger"
                });
            } else if(chooseCust.name === "" || !chooseCust){
                setToastStatus(true);
                setToastDetail({
                    message: "Customer name can't be empty!",
                    theme: "toast-danger"
                });
            } else if(isActive === "member" && !chooseCust.id){
                setToastStatus(true);
                setToastDetail({
                    message: "Member not found",
                    theme: "toast-danger"
                });
            } else if(!orderType || orderType === "") {
                setToastStatus(true);
                setToastDetail({
                    message: "Please set order type!",
                    theme: "toast-danger"
                });

            } else {
                setOrderStatus(true);
                setOrderData({
                    cust: chooseCust,
                    custType: isActive,
                    orderType: orderType,       
                    cart: cartItem,
                    disc: discVal,
                    total: (totalCart - discVal),
                });            
                setShowModal("submitOrder");
            }
    }

    const handleAutoComplete = (custName) => {
        if(custData && custName !== ""){
            let filteredCust = custData.filter(item => item.name.includes(custName.toLowerCase()));
            if(filteredCust.length === 0){
                setOpenPopup(false);
                setFilteredCust(filteredCust);
            } else {
                setOpenPopup(true);
                setFilteredCust(filteredCust);
            }
        } else if(custName || custName === ""){
            setOpenPopup(true);
            setFilteredCust(custData);
        } else {
            setOpenPopup(false);
            setFilteredCust("error db");
            setToastDetail({
                message: "Database failed",
                theme: "toast-danger"
            });
            setToastStatus(true);
        }
    }
    
    const searchMembCust = (e) => {
        const custName = e.target.value;
        if(isActive === "member"){
            setCust({
                name: custName
            });
            handleAutoComplete(custName);
           
        } else if(isActive === "guest"){
            setCust({
                name: custName
            });
            if(custName && custName !== ""){
                // setOrderStatus(true);
            } else  {
                setOrderStatus(false);
                setToastDetail({
                    message: "Something went wrong",
                    theme: "toast-danger"
                });
            }
        }
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
        setCust(e);
        // setOrderStatus(true);
        setOpenPopup(false);
    }

    const returnUpdateStat = (updateStatus) => {
        setUpdateDB(updateStatus);
        if(updateStatus){
            setToastDetail({
                message: "Success adding new member",
                theme: "toast-success"
            });
            setToastStatus(true);
        } else {
            setToastDetail({
                message: "Something went wrong when adding new member",
                theme: "toast-danger"
            });
            setToastStatus(true);
        }

    };

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
    },[list]);      
    
        
    useEffect(() => {
        if(checkDisc){
            handleDisc(checkDisc);
        } 
    },[checkDisc]);

    useEffect(() => {
        const dateTime = setInterval(() => {
            setTodayDate(GetDateTime.getDate);
            setTime(GetDateTime.getTime);
        }, 1000);

        return () => {
            clearInterval(dateTime);
        }
    },[])

    useEffect(() => {
        fetchCustomer();
    },[])

    useEffect(() => {
        fetchCustomer();
    },[updateDB])

    useEffect(() => {
        // console.log(orderTypeTmp)
        // if(orderTypeTmp === ""){
            // setOrderStatus(false);
        // }
        setOrderType(orderTypeTmp);
    },[returnSelectVal])
    
    
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
                        <CustomSelect 
                            options={["Order type", "Walk-in", "Delivery Order"]}
                            defaultValue={0}
                            selectedOption={returnSelectVal} 
                        /> 
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
                            className={isActive === "guest" ? "active" : "" } 
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
                                <Form.Control style={{textTransform: "capitalize"}}
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
                                {filterCust.length > 0 ? 
                                    filterCust.map((e,idx) => {
                                        return (
                                            <div key={`cust-${idx}`} className="res-item" onClick={() => handleChooseCust({id: e.id, name: e.name, category: isActive, type: e.custType})}>{e.name}</div>
                                        )
                                    }) : ""
                                }
                                </div>   
                            </div>
                        </div>
                        <div className={`input-label d-flex flex-row justify-content-between horizontal-form-control ${isActive === "guest" ? "active" : "" }`}
                        aria-labelledby="non-member">
                            <label htmlFor="search-cust-name" className="align-self-center">Customer:</label>
                            <Form.Control style={{textTransform: "capitalize"}}
                            type="text" 
                            className="input-w-icon-right"
                            placeholder="Type a customer name..." 
                            id="custNonMem"       
                            value={chooseCust ? chooseCust.name : ""}                           
                            onChange={searchMembCust} 
                            />
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
                        <div className="submit-order">
                            <Button type="button" isWarning={true} isRounded={true} id="holdOrder" onClick={showModal}>Hold order</Button>
                            <Button type="button" isPrimary={true} isRounded={true} id="submitOrder" onClick={showModal}>Submit order</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        {/* modal */}
        <AddMemberFast show={show === "addMemberFastModal" ? true : false} onHide={handleCloseModal} updatedData={returnUpdateStat} />
        <DiscountModal show={show === "discModal" ? true : false} onHide={handleCloseModal} totalCart={show === "discModal" ? totalCart : 0} />
        <HoldOrderModal show={show === "holdOrder" ? true : false} onHide={handleCloseModal} />
        <OrderPaymentModal show={show === "submitOrder" ? true : false} onHide={handleCloseModal} data={orderStatus ? orderData : null} />
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
        </>

    )
}

