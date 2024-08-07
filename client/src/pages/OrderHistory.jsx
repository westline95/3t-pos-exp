import React, { Component } from "react";

// import Sidebar from "../parts/Sidebar";
import OrderHistoryList from "../parts/OrderHistoryList";

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.refProdCategory = React.createRef();
    }

    render() {
        return (
            <>
            <OrderHistoryList />
            </>
        );
    }
}