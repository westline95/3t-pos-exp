import React from 'react';
import QtyButton from '../elements/QtyButton';
import Button from '../elements/Button';
import { Modal } from 'react-bootstrap';

export default function AddToCart({show, onHide, data}) {

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
                    <p className="add-cart-price"><span className='currency'>Rp</span>{data.price}</p>
                    <div className="modal-product-data">
                        <h5 className="modal-title">{data.name}</h5>
                        <div className="product-data-addon">
                            <p className="product-addon mb-1">{data.variant  === "" ? "" : `Variant: ${data.variant}`}</p>
                            <span className='d-flex '>
                                <p className="product-stock">{`Stock: `}</p>
                                <box-icon name='infinite'size="22px" color="#344050"></box-icon> 
                            </span>
                        </div>
                        <div className="product-qty-wrap">
                            <label htmlFor="qty-product" className="mb-1">Qty</label>
                            <QtyButton value={0} min={0} max={999} name={"addProdQty"} />
                        </div>
                    </div>
                </Modal.Body>
            )
        }
        <Modal.Footer>
            <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
            <Button type="button" isPrimary={true} >add to cart</Button>
        </Modal.Footer>
    </Modal>
    )
}