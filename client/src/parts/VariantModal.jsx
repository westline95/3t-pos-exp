import React, {useState} from 'react';
import Button from '../elements/Button';
import { Modal } from 'react-bootstrap';
import AddToCart from './AddToCartModal';
import NumberFormat from '../elements/NumberFormat';

export default function VariantModal({show, onHide, data}) {
    const [clickedData, showClickVariant] = useState("");
    const [isShow, showAddCartModal] = useState(false);

    const handleCloseModal = () => {
        showAddCartModal(false);
    }

    return(
        <>
         <Modal 
        size="md" 
        id="productVarModal" 
        show={show} 
        onHide={onHide}
        scrollable={true} 
        >
        <Modal.Header closeButton>
            <Modal.Title>Choose Variant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="lists">
                {data === ""  ? "" :
                   (
                    data.map((e, idx) => {

                        const handleVariantModal = () => {                            
                            showClickVariant({id: e.id, img: e.img, product: e.product, variant: e.variant, price: e.price});
                            showAddCartModal(true);
                        }
                        return (
                            <div key={`variant-${idx}`} className="list-item" onClick={handleVariantModal}>
                                <p className="item-name">{e.variant}</p>
                                <p className="item-price">
                                    {/* <span className='currency'>Rp</span>
                                    {e.price} */}
                                    <NumberFormat intlConfig={{
                                        value: e.price, 
                                        locale: "id-ID",
                                        style: "currency", 
                                        currency: "IDR",
                                    }}
                                    /> 
                                </p>
                            </div>
                        );
                        
                    })
                    )
                 }
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
        </Modal.Footer>
        </Modal>

        <AddToCart show={isShow} onHide={handleCloseModal} data={clickedData} />
        </>
   
    )
}
