import React from "react";
import { useLocation } from "react-router-dom";
import Brand from "./Brand";
import Button from "../elements/Button";
import "boxicons";


export default function Sidebar({show}) {
    const location = useLocation();
    const getNavLinkClass = (path) => {
        return location.pathname === path ? " active" : "";
    };

    const activeIcon = (path) => {
        return location.pathname === path ? "#42C0FB" : "#ABABAB";
    }

    return (
        <>
        <nav className={`pos-sidebar offcanvas-start ${show ? "active show" : ""}`}>
            <div className="logo-wrapper">
                <Brand />
            </div>
            <div className="menu-container mt-5">
                <div className="menus">
                    <ul className="menus-wrapper">
                        <li className={`menu ${getNavLinkClass("/")}`}>
                            <Button className="item-menu" type="link" href="/">
                            {/* <i class="bx bxl-facebook-square"></i> */}

                                <box-icon type='solid' name='cart-alt' size="auto" color={activeIcon("/")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Order</span>
                            </Button>
                        </li>
                        <li className={`menu ${getNavLinkClass("/order-history")}`}>
                            <Button className="item-menu" type="link" href="/order-history">
                                <box-icon name='receipt' type='solid' size="auto" color={activeIcon("/order-history")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">History</span>
                            </Button>
                        </li>
                        <li className={`menu ${getNavLinkClass("/table")}`}>
                            <Button className="item-menu" type="link" href="/table">
                                <box-icon name='bowl-hot' type='solid' size="auto" color={activeIcon("/table")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Table</span>
                            </Button>
                        </li> 
                        <li className={`menu ${getNavLinkClass("/kitchen")}`}>
                            <Button className="item-menu" type="link" href="/kitchen">
                                <box-icon name='dish' type='solid' size="auto" color={activeIcon("/kitchen")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Kitchen</span>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
        
    )
}

