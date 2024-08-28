import React, { useState, useEffect } from 'react';
import { Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
// import QtyButton from '../elements/QtyButton';
// import Button from '../elements/Button';
import VariantModal from './VariantModal';
// import QtyButton from '../elements/QtyButton';
import AddToCart from './AddToCartModal';

export default function ProdListCard({ data, addToCart }){
    const [isModal, showModal] = useState("");
    const [showDataNonVar, setDataNonVar] = useState([]);
    const [showDataVar, setDataVar] = useState([]);
    const [prodCatalogData, prodCatalog] = useState("");
    
    const handleCloseModal = () => {
        showModal(false);
    }

    const endpoint = `https://threet-pos-exp.onrender.com/products`;
    // const endpoint = `http://localhost:5050/products`;
    const fetchProdCatalog = async() => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        prodCatalog(data);
    }

    useEffect(() => {
        fetchProdCatalog();
    }, [])


    
    return(
        <>
        <div className="content-wrapper products-content">
        <h6 className="section-title">products</h6>
          <div className="row gy-4">
          {data.map((el, idx) => {

                const imgStyle = {
                    background: `url('${el.img}') center center / contain no-repeat`,
                    height: "100%",
                };    
                
                const handleModal = () =>{
                    const dataArr = [];

                    prodCatalogData.map((prod, idx) => {
                        if(el.name.toLowerCase() === prod.name.toLowerCase()){
                            if(prod.variant === ""){
                                setDataNonVar({id: prod.id, img: el.img, product: el.name, variant: "", price: Number(el.displayPrice)})
                                showModal("addToCartModal");

                            } else {
                                const data = {
                                    id: prod.id,
                                    img: el.img,
                                    product: el.name,
                                    category: prod.category,
                                    variant: prod.variant,
                                    price: Number(prod.sellPrice),
                                    status: prod.status
                                } 
                                dataArr.push(data);
                                setDataVar(dataArr);
                                showModal("variantModal");
                            }
                        }  
                    })
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
                                    <span className="currency">Rp</span>
                                    {el.displayPrice}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
          </div>

            <VariantModal show={isModal === "variantModal" ? true : false} onHide={handleCloseModal} data={showDataVar} />
            <AddToCart show={isModal === "addToCartModal" ? true : false} onHide={handleCloseModal} data={showDataNonVar}  />

        </div>
        </>
    );
}