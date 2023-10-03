import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import countdownSlice from "./slice/countdownSlice";
import authSlice from "./slice/authSlice";

const store =configureStore({
    reducer :{
        addToCart:cartSlice,
        countDown:countdownSlice,
        auth:authSlice
      
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



