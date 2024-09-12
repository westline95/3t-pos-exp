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
    const duplicates = cart.filter(cartItem => parseInt(cartItem.id) === parseInt(product.id));
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
            if(parseInt(item.id) === parseInt(product.id)){
                return item.qty += product.qty;
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
        if(parseInt(item.id) === parseInt(plusData.data.id)){
            item.qty = plusData.stateValue + 1;
            item.totalPrice = item.price * (plusData.stateValue + 1);
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
        if(parseInt(item.id) === parseInt(minusData.data.id)){
            item.qty = minusData.stateValue - 1;
            item.totalPrice = item.price * (minusData.stateValue - 1);
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
        if(parseInt(item.id) === parseInt(writeData.data.id)){
            item.qty = writeData.stateValue;
            item.totalPrice = item.price * writeData.stateValue;
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

    const filteredData = updateProduct.filter(e => e.id != itemID);
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