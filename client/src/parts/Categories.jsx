import React, {useState, useEffect} from "react";
import CategoriesCard from "../elements/CaegoriesCard";

export default function Categories({data}) {
    const [ isClicked, setClick ] = useState(false);
    const [ prodData, products] = useState([]);
    const [ nameValue, setNameParam] = useState("");

    const endpoint = `https://threet-pos-exp.onrender.com/category/read`;
    // let endpoint = `http://localhost:5050/products/group` ;
    const fetchProdCat = async () => {
        const resp = await fetch(endpoint);
        const data = await resp.json();
        products(data); 
    }
    useEffect(() => {
        fetchProdCat();
    },[]);

    let mergeDataArr = [];
    let countAll = 0;

    data.map(el => {     
        prodData.map(el2 => {
            countAll += parseInt(el2.count);
            if(el.name.toLowerCase() === el2.category.toLowerCase()){
                let mergeData = {
                    category: el.name,
                    count: el2.count,
                    img: el.img
                }
                mergeDataArr.push(mergeData);
            }
        })
        if(el.name.toLowerCase() === "all"){
            let mergeData = {
                category: el.name,
                count: countAll,
                img: ""
            }
            mergeDataArr.push(mergeData);
        }
    })
    
    
    return mergeDataArr.map((el, idx) => {
        // setNameParam(el.name);
        // prodData.map(prodCategory => {
        //     console.log(prodCategory)
        // })
        return (
            <CategoriesCard 
            key={`category-${idx}`} 
            isActive={idx === 0 ? true : false} 
            title={el.category} 
            desc={el.count + ' items'}
            img={el.img === "" ? "" : el.img}
            >
                {idx === 0 ? <box-icon type='solid' size="24px" name='grid-alt' color="#42C0FB" style={{verticalAlign: "sub"}}></box-icon> : ""}
            </CategoriesCard>         
        );
        // })

    });

}