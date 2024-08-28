import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import propTypes from "prop-types";
import QtyButton from '../QtyButton';
import NumberFormat from '../NumberFormat';
import cartSlice from '../../store/reducers/cart';

export default function OrderListItem(props){
    const { data, min, max, currency } = props;
    const dispatch = useDispatch();

    const imgStyle = {
        background: `url('${data.img}') no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        height: "100%"
    };

    const handleDelete = () => {
        dispatch(cartSlice.actions.deleteItem(data.id));
    }

    return(
        <Swiper 
        slidesPerView={'auto'} 
        initialSlide={0} 
        slideToClickedSlide={true} 
        grabCursor={true}
        >
            <SwiperSlide style={{width: "100%"}}>
                <div className="order-item">
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
                            <NumberFormat intlConfig={{
                                value: data.totalPrice, 
                                locale: "id-ID",
                                style: "currency", 
                                currency: "IDR",
                            }} 
                            />
                        </p>
                    </div>
                    <QtyButton data={data} value={data.qty} name={`order-${data.product}`} min={min} max={max} id={data.product} />
                </div>
            </SwiperSlide>
            <SwiperSlide className='del-order-item' onClick={handleDelete}>
                <box-icon name='trash' size="auto" color="#FFFFFF"></box-icon>
            </SwiperSlide>
        </Swiper>
        
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

