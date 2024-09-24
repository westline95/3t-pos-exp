import React from 'react';
import { Toast, ToastContainer } from "react-bootstrap";

const Toaster = (toastDetail, showToast) => {

    return(
        <ToastContainer style={{top: "4rem", right: "2rem"}}>
            <Toast 
            className={`align-items-center border-0 ${showToast ? toastDetail.theme: ""}`}
            aria-live='assertive' 
            aria-atomic="true" 
            animation={true}
            show={showToast} 
            // onClose={}
            delay={2000} 
            autohide
            >
                <Toast.Body style={{fontWeight: "700"}}>{showToast ? toastDetail.message : ""}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Toaster;