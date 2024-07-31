import React, {useState, useEffect} from "react";
import CategoriesCard from "../elements/CaegoriesCard";

export default function Categories({data}) {
    const [ isClicked, setClick ] = useState(false);
    const [categories, prodCategory] = useState([]);


    // const endpoint = "http://192.168.18.11:4000/category/read";
    // const endpoint = `3t-pos-9761.8nk.gcp-asia-southeast1.cockroachlabs.cloud/category/read`;
    const endpoint = `https://threet-pos-exp.onrender.com/api/category`;
    const fetchProdCat = async () => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        prodCategory(data);
    }
    
    useEffect(() => {
    fetchProdCat();
    },[]);

  
    return categories.map((el, idx) => {
        return (
            <CategoriesCard 
            key={`category-${idx}`} 
            isActive={idx === 0 ? true : false} 
            title={el.name} 
            desc={""} 
            img={el.img === "" ? "" : el.img}
            >
                {idx === 0 ? <box-icon type='solid' size="24px" name='grid-alt' color="#42C0FB"></box-icon> : ""}
            </CategoriesCard>         
        );
    });
}