import React from 'react';
import propTypes from "prop-types";
import QtyButton from '../QtyButton';

export default function OrderListItem(props){
    const { prodName, prodImg, prodVar, prodPrice, orderQty, inputName, min, max , currency} = props;

    const imgStyle = {
        background: `url('${prodImg}') no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        height: "100%"
    }

    return (
        <div className="order-item">
            <div className="product-img-wrap">
                <div className="product-img" style={imgStyle}></div>
            </div>
            <div className="order-detail">
                <p className="product-name">{prodName}</p>
                <p className="order-notes">
                    {prodVar ? "Variant: " : ""}
                    <span className='order-notes-hightlight'>{prodVar ? prodVar : ""}</span>
                </p>
                <p className="product-price">
                    <span className="currency">{currency}</span>
                    {prodPrice}
                </p>
            </div>
            <QtyButton value={orderQty} name={inputName} min={min} max={max} />
        </div>
    );
}

OrderListItem.propTypes = {
    prodName: propTypes.string,
    prodImg: propTypes.string,
    prodVar: propTypes.string,
    prodPrice: propTypes.string,
    orderQty: propTypes.number,
    inputName: propTypes.string,
    min: propTypes.number,
    max: propTypes.number,
    currency: propTypes.string 
}

