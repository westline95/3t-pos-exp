import React from 'react';
import propTypes from "prop-types";
import QtyButton from '../QtyButton';

export default function OrderListItem(props){
    const { orderData, min, max , currency} = props;

    const imgStyle = {
        background: `url('${prodImg}') no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        height: "100%"
    }

    return (
        orderData.map((item, idx)=> {
            <div className="order-item" key={`order-list-${idx}`}>
                <div className="remove-btn">
                    <box-icon type='solid' name='trash-alt' size="14px" color="#f05d53"></box-icon>
                    {/* <box-icon name="x" size="16px" color="#f05d53"></box-icon> */}
                </div>
                <div className="product-img-wrap">
                    <div className="product-img" style={imgStyle}></div>
                </div>
                <div className="order-detail">
                    <p className="product-name">{item.prodName}</p>
                    <p className="order-notes">
                        {item.prodVar ? "Variant: " : ""}
                        <span className='order-notes-hightlight'>{item.prodVar ? item.prodVar : ""}</span>
                    </p>
                    <p className="product-price">
                        <span className="currency">{currency}</span>
                        {item.prodPrice}
                    </p>
                </div>
                <QtyButton value={item.orderQty} name={`qty-${item.prodName}`} min={min} max={max} />
            </div>

        })
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

