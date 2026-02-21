import React, { useState, useEffect } from 'react';
import { Card, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import NumberFormat from '../elements/NumberFormat';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import QtyButton from '../elements/QtyButton';
// import Button from '../elements/Button';
import VariantModal from './VariantModal';
// import QtyButton from '../elements/QtyButton';
import AddToCart from './AddToCartModal';

export default function ProdListCard({ data, addToCart }){
    const axiosPrivate = useAxiosPrivate();
    const [allProduct, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModal, showModal] = useState("");
    const [showDataNonVar, setDataNonVar] = useState([]);
    const [showDataVar, setDataVar] = useState([]);
    const [prodCatalogData, prodCatalog] = useState("");
    
    const handleCloseModal = () => {
        showModal(false);
    }

    const productsEndpoint = `https://threet-pos-exp.onrender.com/products`;
    const byCategoryEndpoint = `https://threet-pos-exp.onrender.com/products?category=`;
    // const endpoint = `http://localhost:5050/products`;
    const fetchProdCatalog = async() => {
        const resp = await fetch(productsEndpoint);
        const data = await resp.json();
        prodCatalog(data);
    }

     // get all product api
    const getAllProduct = async() => {
        // await axiosPrivate.get("http://localhost:5056/products")s
        await axiosPrivate.get("http://localhost:5056/products/grouped-pos")
        .then(resp => {
            setProducts(resp.data);
            console.log(resp)
        })
        .catch(err =>{
            console.error("failed to get all product");
        })
    } 

    useEffect(() => {
        getAllProduct();
    },[]);

    useEffect(() => {
        if(allProduct) {
            setIsLoading(false);
        }
    },[allProduct]);

    useEffect(() => {
        fetchProdCatalog();
    }, [])
    
    if(isLoading){
        return;
    }


    
    return(
        <>
        <div className="content-wrapper products-content">
        <h6 className="section-title">products</h6>
        <div className="row gy-4">
          {data.map((el, idx) => {
                
                const imgStyle = {
                    background: `url('${el.category_img}') center center / contain no-repeat`,
                    height: "100%",
                };    
                const handleModal = () =>{
                    // if(el.variant !== ""){
                        if(el.products.length > 1){
                            setDataVar(el.products);
                            showModal("variantModal");
                        } else {
                            setDataNonVar(el.products[0]);
                            console.log(el.products[0])
                        showModal("addToCartModal");
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
                                <Card.Title>{el.category_name}</Card.Title>
                                {/* <Card.Text>
                                    {
                                        <NumberFormat intlConfig={{
                                            value: el.sell_price, 
                                            locale: "id-ID",
                                            style: "currency", 
                                            currency: "IDR",
                                            }} 
                                        />
                                    
                                    }
                                </Card.Text> */}
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
          </div>
          

            <VariantModal show={isModal === "variantModal" ? true : false} onHide={handleCloseModal} data={showDataVar} />
            <AddToCart show={isModal === "addToCartModal" ? true : false} onHide={handleCloseModal} data={showDataNonVar} multiple={false} />

        </div>
        </>
    );
}