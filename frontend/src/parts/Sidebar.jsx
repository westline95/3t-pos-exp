import React from "react";
import { useLocation } from "react-router-dom";
import Brand from "./Brand";
import Button from "../elements/Button";
import "boxicons";


export default function Sidebar(props) {
    const location = useLocation();
    const getNavLinkClass = (path) => {
        return location.pathname === path ? " active" : "";
    };

    const activeIcon = (path) => {
        return location.pathname === path ? "#42C0FB" : "#ABABAB";
    }

    return (
        <>
        <nav className="pos-sidebar offcanvas-start">
            <div className="logo-wrapper">
                <Brand />
            </div>
            <div className="menu-container mt-5">
                <div className="menus">
                    <ul className="menus-wrapper">
                        <li className={`menu ${getNavLinkClass("/")}`}>
                            <Button className="item-menu" type="link" href="/">
                            {/* <i class="bx bxl-facebook-square"></i> */}

                                <box-icon type='solid' name='cart-alt' size="36px" color={activeIcon("/")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Order</span>
                            </Button>
                        </li>
                        <li className={`menu ${getNavLinkClass("/order-list")}`}>
                            <Button className="item-menu" type="link" href="/order-list">
                                <box-icon name='receipt' type='solid' size="36px" color={activeIcon("/order-list")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Order List</span>
                            </Button>
                        </li>
                        <li className={`menu ${getNavLinkClass("/table")}`}>
                            <Button className="item-menu" type="link" href="/table">
                                <box-icon name='bowl-hot' type='solid' size="36px" color={activeIcon("/table")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Table</span>
                            </Button>
                        </li> 
                        <li className={`menu ${getNavLinkClass("/kitchen")}`}>
                            <Button className="item-menu" type="link" href="/kitchen">
                                <box-icon name='dish' type='solid' size="36px" color={activeIcon("/kitchen")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Kitchen</span>
                            </Button>
                        </li>
                        <li className={`menu ${getNavLinkClass("/inventory")}`}>
                            <Button className="item-menu" type="link" href="/inventory">
                                <box-icon name='cube-alt' type='solid' size="36px" color={activeIcon("/inventory")} style={{ padding: "0 18px 7px 18px" }}></box-icon>
                                <span className="menu-label">Inventory</span>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
        
    )
}