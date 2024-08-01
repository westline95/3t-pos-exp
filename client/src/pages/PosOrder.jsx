import React, { Component } from "react";

import Sidebar from "../parts/Sidebar";
import OrderPos from "../parts/OrderPos";

export default class PosOrder extends Component {
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