import React, {useState, useEffect} from 'react';
import QtyButton from '../elements/QtyButton';
import { useSelector, useDispatch } from 'react-redux'; 
import NumberFormat from '../elements/NumberFormat';
import Button from '../elements/Button';
import { Modal } from 'react-bootstrap';
import cartSlice from '../store/reducers/cart';

export default function AddToCart({show, onHide, data}) {
    // const [ qtyBtn, getQtyBtn ] = useState("");
    // const [ itemQty, setQty ] = useState(0);
    // const [ carasdwtDatas, asd ] = useState(null);
    const dispatch = useDispatch();
  
    const handleClick = () => {
        const getQty = parseInt(document.getElementById("qtyItem").value);
        const addProduct = {...data};
        addProduct.qty = getQty;
        addProduct.totalPrice = data.price;
        addProduct.update = false;
        dispatch(cartSlice.actions.addData(addProduct));
        onHide();
    }

    return (
        <Modal 
        size="lg" 
        id="productDetailModal" 
        show={show} 
        onHide={onHide} 
        >
        <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
        </Modal.Header>
        {
            data === "" ? "" :
            (
                <Modal.Body>
                    <div className="modal-product-img">
                        <div className="product-img" style={{background: `url('${data.img}') center center / contain no-repeat`, height: "100%"}}></div>
                    </div>
                    <p className="add-cart-price">
                        <NumberFormat intlConfig={{
                            value: data.price, 
                            locale: "id-ID",
                            style: "currency", 
                            currency: "IDR",
                            }}
                        />
                        {/* <span className='currency'>Rp</span>{} */}
                    </p>
                    <div className="modal-product-data">
                        <h5 className="modal-title">{data.product}</h5>
                        <div className="product-data-addon">
                            <p className="product-addon mb-1">{data.variant  === "" ? "" : `Variant: ${data.variant}`}</p>
                            <span className='d-flex '>
                                <p className="product-stock">{`Stock: `}</p>
                                <box-icon name='infinite'size="22px" color="#344050"></box-icon> 
                            </span>
                        </div>
                        <div className="product-qty-wrap">
                            <label htmlFor="qty-product" className="mb-1">Qty</label>
                            <QtyButton min={0} max={999} name={`qty-${data.product}`} id="qtyItem" />
                        </div>
                    </div>
                </Modal.Body>
            )
        }
        <Modal.Footer>
            <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
            {/* <Button type="button" isPrimary={true} onClick={() => handleCart(data.id, data.name, data.img, data.variant, data.price)}>add to cart</Button> */}
            <Button type="button" isPrimary={true} onClick={handleClick}>add to cart</Button>
        </Modal.Footer>
    </Modal>
    )
}