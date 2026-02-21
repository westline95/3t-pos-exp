import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// inital state
let initialState = {
    cartData: [],
}

if(localStorage.getItem("cart")){
    initialState.cartData = JSON.parse(localStorage.getItem("cart"));
} else {
    initialState.cartData = [];
}

// cart actions
const LoadFromLocalStorage = () => {
    try{
        const serialisedState = localStorage.getItem("cart");
        if(serialisedState === null) return undefined;
        const data = JSON.parse(serialisedState);
        return data;
    } catch(err) {
        return err;
    }
}

const AddToLocalStorage = product => {
    const cart = localStorage.getItem("cart") 
        ? JSON.parse(localStorage.getItem("cart")) 
        : [];
    const duplicates = cart.filter(cartItem => cartItem.product_id === product.product_id);
    if(duplicates.length === 0){
        const addProduct = {
            ...product
        };
        
        cart.push(addProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
    } else {
        const updateProduct = [
            ...cart
        ];
        updateProduct.map(item => {
            if(item.product_id == product.product_id){
                item.qty += product.qty; 
                item.totalPrice = item.qty*item.sell_price;
            }
            return item;
        })
        localStorage.setItem("cart", JSON.stringify(updateProduct));
        return updateProduct;
    }
}

const Increment = plusData => {
    const cart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [];

    const updateProduct = [
        ...cart
    ];
    updateProduct.map(item => {
        if(item.product_id == plusData.data.product_id){
            item.qty = plusData.stateValue + 1;
            item.totalPrice = item.sell_price * (plusData.stateValue + 1);
        }
        return item;
    })
    localStorage.setItem("cart", JSON.stringify(updateProduct));
    return updateProduct;

}

const Decrement = minusData => {
    const cart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [];
    const updateProduct = [
        ...cart
    ];
    updateProduct.map(item => {
        if(item.product_id == minusData.data.product_id){
            item.qty = minusData.stateValue - 1;
            item.totalPrice = item.sell_price * (minusData.stateValue - 1);
        }
        return item;
    })
    localStorage.setItem("cart", JSON.stringify(updateProduct));
    return updateProduct;
}

const WriteInput = writeData => {
    const cart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [];

    const updateProduct = [
        ...cart
    ];

    updateProduct.map(item => {
        if(item.product_id == writeData.data.product_id){
            item.qty = writeData.stateValue;
            item.totalPrice = item.sell_price * writeData.stateValue;
        }
        return item;
    })
    localStorage.setItem("cart", JSON.stringify(updateProduct));
    return updateProduct;
}

const DeleteCartItem = itemID => {
    const cart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [];

    const updateProduct = [
        ...cart
    ];

    const filteredData = updateProduct.filter(e => e.product_id != itemID);
    localStorage.setItem("cart", JSON.stringify(filteredData));

    return filteredData;

}

const ApplyVoucher = value => {
    const activeDiscVal = {...value};
    localStorage.setItem("activeDiscount", JSON.stringify(activeDiscVal));
    const data = localStorage.getItem("activeDiscount");

    return activeDiscVal;
}

// cart Slice
const cartSlice = createSlice({
   name: "cartData",
   initialState: initialState,
   reducers: {
        loadData: state => {
           state.cartData = LoadFromLocalStorage();
        },
        addData: (state, action) => {
           state.cartData = AddToLocalStorage(action.payload);
        },
        increment: (state, action) => {
           state.cartData = Increment(action.payload);
        },
        decrement: (state, action) => {
            state.cartData = Decrement(action.payload);   
        },
        write: (state, action) => {
            state.cartData = WriteInput(action.payload);   
        },
        deleteItem: (state, action) => {
            state.cartData = DeleteCartItem(action.payload);
        },
        applyVoucher: (state, action) => {
            state.discount = ApplyVoucher(action.payload);
        },
   }
})


export default cartSlice;