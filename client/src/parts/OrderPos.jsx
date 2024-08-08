import React from "react";
import { useState, useRef, useEffect } from "react";
import { Form, Modal, Card } from "react-bootstrap";
import ProductData from "../json/prodCategory.json";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Button from "../elements/Button/index";
import Categories from "./Categories";
import ProdListCard from "./ProdListCard";
import OrderCard from "./OrderCard";
import Tahu from "../assets/images/tahu.png";
import Tempe from "../assets/images/tempe.png";
import Tauge from "../assets/images/tauge.png";
import TempeDaun from "../assets/images/tempe daun.png";
import TempeBalok from "../assets/images/tempe balok.png";

export default function OrderPos(props){
    const [isHover, setIsHover] = useState(null);
    const [ isClose, setClose ] = useState(false);
    const [ subCategoryData , subCategory ] = useState([]);

    const handleMouseEnter = (e) => {
        switch (e.target.id) {
            case "leftControl":
                setIsHover("leftControl");
                break;
            case "rightControl":
                setIsHover("rightControl");
                break;
        }         
    };

    const endpoint = `https://threet-pos-exp.onrender.com/sub-category/read`;
    const fetchSubCategory = async () => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        subCategory(data);
        // console.log(data);
    }
    
    useEffect(() => {
        fetchSubCategory();
    },[]);

    return (
        <>
        <Sidebar show={isClose} />
        <main className={`pos-content ${isClose ? "active" : ""}`}>
            <Header onClick={() => isClose ? setClose(false) : setClose(true)} cart={true} />
            <section>
                <div className="search-mobile mb-4">
                    <div className="input-group-right">
                        <span className="input-group-icon">
                            <box-icon name='search' size="18px" color="#BDC4D1"></box-icon>
                        </span>
                        <Form.Control type="text" className="input-w-icon-right" placeholder="Search..." />
                    </div>
                </div>
                <div className="content-wrapper mt-4">
                    <h6 className="section-title">Categories</h6>
                    <div className="categories-list">
                        <Categories data={ProductData.prodCategory} />                      
                        {/* get data from database */}
                    </div>
                    <div className="categories-btn-control">
                         <Button 
                         id="leftControl"
                         type="button" 
                         className="btn btn-single-icon-rounded" 
                         onMouseEnter={handleMouseEnter} 
                         onMouseLeave={() => setIsHover(null)}>
                            <box-icon 
                            name='chevron-left' 
                            size="24px" 
                            color={isHover === "leftControl" ? "#ffffff" : "#252525"}>
                            </box-icon>
                        </Button>
                        <Button 
                         id="rightControl"
                         type="button" 
                         className="btn btn-single-icon-rounded" 
                         onMouseEnter={handleMouseEnter} 
                         onMouseLeave={() => setIsHover(null)}>
                            <box-icon 
                            name='chevron-right' 
                            size="24px" 
                            color={isHover === "rightControl" ? "#FFFFFF" : "#252525"}>
                            </box-icon>
                        </Button>
                    </div>
                </div>

                <ProdListCard data={subCategoryData} />
                <OrderCard />
            </section>
        </main>
       
        </>
    )
}