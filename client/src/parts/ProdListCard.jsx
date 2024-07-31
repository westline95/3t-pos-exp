import React, { useState } from 'react';
import { Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import QtyButton from '../elements/QtyButton';
import Button from '../elements/Button';

export default function ProdListCard({ data }){
    const [isShow, setShow] = useState(false);
    const [isShowDetail, setShowDetail] = useState(false);
    const [modalData, showData] = useState("");
    const [modalAddProd, showClickVariant] = useState("");
    const backToVarModal = () => {
        setShowDetail(false);
        setShow(true);
    }

    return(
        <>
        <div className="content-wrapper products-content">
        <h6 className="section-title">products</h6>
          <div className="row gy-4">
          {data.map((el, idx) => {
                
                
                const imgStyle = {
                    background: `url('${el.imgURL}') center center / contain no-repeat`,
                    height: "100%",
                };    

                const handleModal = () =>{
                    if(el.variant !== "N/a"){
                        setShow(true);
                        showData({img: el.imgURL, name: el.name, val: el.variant.value});
                    } else {
                        setShow(false);
                        showData("");
                        showClickVariant({img: el.imgURL, name: el.name, val: {item: "", stock: el.stock, price: el.price}});
                        setShowDetail(true);
                    }
                };

                return (
                    <div 
                    key={`products-${idx}`} 
                    className="col-lg-2 col-sm-6 col-6" 
                    onClick={handleModal}
                    >
                        <Card>
                            <div className="card-img-container">
                                <div className="card-img-wrap" style={imgStyle}></div>
                            </div>
                            <Card.Body>
                                <Card.Title>{el.name}</Card.Title>
                                <Card.Text>
                                    <span className="currency">Rp </span>
                                    {el.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
          </div>
          <Modal 
                size="md" 
                id="productVarModal" 
                show={isShow} 
                onHide={() => setShow(false)} 
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Variant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="lists">
                        {modalData === ""  ? "" :
                            (
                                modalData.val.map((e, idx) => {
                                    const handleVariantModal = () => {
                                        setShowDetail(true);
                                        setShow(false);
                                        showClickVariant({img: modalData.img, name: modalData.name, val: e});
                                    }
                                    return (
                                        <div key={`variant-${idx}`} className="list-item" onClick={handleVariantModal}>
                                            <p className="item-name">{e.item}</p>
                                            <p className="item-price"><span className='currency'>Rp</span>{e.price}</p>
                                        </div>
                                    );
                                    
                                })
                            )
                        }
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <Button type="button" isSecondary={true} isRounded={true} isLight={true} onClick={() => setShow(false)}>cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal 
                size="lg" 
                id="productDetailModal" 
                show={isShowDetail} 
                onHide={() => setShowDetail(false)} 
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>Add product</Modal.Title>
                </Modal.Header>
                {
                    modalAddProd === "" ? "" :
                    (
                        <ModalBody>
                            <div className="modal-product-img">
                                <div className="product-img" style={{background: `url('${modalAddProd.img}') center center / contain no-repeat`, height: "100%"}}></div>
                            </div>
                            <div className="modal-product-data">
                                <h5 className="modal-title">{modalAddProd.name}</h5>
                                <div className="product-data-addon">
                                    <p className="product-addon mb-1">{modalAddProd.val.item  === "" ? "" : `Variant: ${modalAddProd.val.item}`}</p>
                                    <p className="product-stock">{`Stock: ${modalAddProd.val.stock}`}</p>
                                </div>
                                <div className="product-qty-wrap">
                                    <label htmlFor="qty-product" className="mb-1">Qty</label>
                                    <QtyButton value={0} min={0} max={999} name={"addProdQty"} />
                                </div>
                            </div>
                        </ModalBody>
                    )
                }
                <ModalFooter>
                    <Button type="button" isSecondary={true} isRounded={true} isLight={true} onClick={backToVarModal}>cancel</Button>
                    <Button type="button" isPrimary={true} isRounded={true} onClick={() => setShowDetail(false)}>add to cart</Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    );
}