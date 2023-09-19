import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../services/Api";


const Checkout =createAsyncThunk(
    "Checkout/Checkout",
    async (data,thunkAPI)   => {
        console.log(data);
        
        
    }
)



interface initialState {
    totalQuantity: number;
    itemsList: Item[];
}
interface Item {
    id: number,
    price: number,
    quantity: number,
    totalPrice: number,
    name: string,
    img: string
}
const initialState: initialState = {
    itemsList: [],
    totalQuantity: 0,

}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;


            const existingItem = state.itemsList.find((item: Item) => item.id === newItem.id)
            if (existingItem) {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price




            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                    img: newItem.img,

                })
                state.totalQuantity++;
            }

        }, removeCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.itemsList.find((item: Item) => item.id === id.id)


            if (existingItem?.quantity === 1) {
                state.itemsList = state.itemsList.filter((item) => item.id !== id.id);
                state.totalQuantity--;

            } else if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price

            }

        },
       
    },
    extraReducers: Checkout
})
export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer

