import React, { Component } from "react";
import OrderPos from "../parts/OrderPos";

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.refProdCategory = React.createRef();
    }

    render() {
        return (
            <>
            <OrderPos />
            </>
        );
    }
}