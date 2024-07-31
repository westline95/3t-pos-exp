import React from "react";
import Button from "../elements/Button/index";
import FriesMenu from "../assets/images/fries-menu.svg";

export default function Brand() {
    return (
        <Button className="fries-menu" href="" type="link">
            <img src={FriesMenu} alt="mobile-menu" type="svg" style={{ width: "24px" }}></img>
        </Button>
    );
}
