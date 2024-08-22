import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart.js";


const store = configureStore({
    reducer: {
        cart: cartReducer.reducer
    },
});



export default store;