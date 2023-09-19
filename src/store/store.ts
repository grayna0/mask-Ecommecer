import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
const store =configureStore({
    reducer :{
        addToCart:cartSlice
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch