import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import authSlice from "./slice/authSlice";

const store =configureStore({
    reducer :{
        addToCart:cartSlice,
        auth:authSlice
      
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



