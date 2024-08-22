import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import propTypes from "prop-types";
import QtyButton from '../QtyButton';

export default function OrderListItem(props){
    const {data, min, max, currency } = props;
    const imgStyle = {
        background: `url('${data.img}') no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        height: "100%"
    }

    return (
        <div className="order-item">
            <div className="remove-btn">
                <box-icon type='solid' name='trash-alt' size="14px" color="#f05d53"></box-icon>
                {/* <box-icon name="x" size="16px" color="#f05d53"></box-icon> */}
            </div>
            <div className="product-img-wrap">
                <div className="product-img" style={imgStyle}></div>
            </div>
            <div className="order-detail">
                <p className="product-name">{data.product}</p>
                <p className="order-notes">
                    {data.variant ? "Variant: " : ""}
                    <span className='order-notes-hightlight'>{data.variant ? data.variant : ""}</span>
                </p>
                <p className="product-price">
                    <span className="currency"></span>
                    {data.price}
                </p>
            </div>
            <QtyButton data={data} value={data.qty} name={`order-${data.product}`} min={min} max={max} id={data.product}/>
        </div>
    )
}

OrderListItem.propTypes = {
    onChange: propTypes.func,
    inputName: propTypes.string,
    min: propTypes.number,
    max: propTypes.number,
    currency: propTypes.string,
    data: propTypes.object,
}

