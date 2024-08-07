import React from 'react';
import FriesMenu from "./MobileNav";
import { Navbar, Form } from 'react-bootstrap';
import propTypes from "prop-types";
import "boxicons";

export default function Header(props) {
    const openOrderCard = () => {
        document.querySelector(".order-card-wrap").style.display ="block";
    }

    return (
        <>
            <Navbar className="navbar mb-3">
                <div className="fries-menu sidebarCollapseDefault" onClick={props.onClick}>
                    <FriesMenu />
                </div>
                <div className="navbar-icon" style={props.cart ? {display: "block"} : {display: "none"}}>
                    <div className="features">
                        <div className="feature" onClick={openOrderCard}>
                            <box-icon name='cart-alt' size="26px" color="#252525" style={{ verticalAlign: "middle" }}></box-icon>
                            <span className="position-absolute translate-middle p-1 badge-danger border border-light rounded-circle">
                                <span className="visually-hidden">New notification</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="searchbox">
                    <div className="input-group-right">
                        <span className="input-group-icon">
                            <box-icon name='search' size="auto" color="#BDC4D1"></box-icon>
                        </span>
                        <Form.Control type="text" className="input-w-icon-right" placeholder="Search..." />
                    </div>
                </div>
            </Navbar>
        </>
    )
}

Header.propTypes = {
    onClick: propTypes.func
}
