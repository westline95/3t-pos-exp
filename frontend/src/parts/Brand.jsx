import React from "react";
import Button from "../elements/Button/index";
import Logo from "../assets/images/mobile-logo.svg";

export default function Brand() {
    return (
        <Button className="brand-icon" href="" type="link">
            <img src={Logo} alt="Logo" type="svg"></img>
        </Button>
    );
}
