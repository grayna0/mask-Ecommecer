import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../services/Api";
import { Product } from "../../page/admin/Admin";
import useLocalStorage from "../../hook/useLocalStorage";

export const checkout = createAsyncThunk(
    "checkout/Checkout",
    async (data: objCheckOut) => {
        const { removeLocalItem } = useLocalStorage()

        if (data) {
          await Promise.all(
                data.listChose.map(async item => {
                    const updateProduct = data.arrPro.find(i => i.id === item.id)
                    await api.put(`/products/${item?.id}`, { ...updateProduct, quantity: item.quantityIntital - item.quantity })

                })
            )
            removeLocalItem("cart")
        }

    }
)
export const checkoutUser = createAsyncThunk(
    "checkoutUser",
    async (data: any, thunkAPI) => {
        const updateOders: any = thunkAPI.getState()
        const lengthListOders = updateOders.addToCart.itemsList
        await api.put(`/infoUsers/${data.id}`, { ...data, totalItemOders: data.totalItemOders + lengthListOders.length })

    }
)

const initialState: initialStates = {
    itemsList: [],
    totalQuantity: 0,
    totalPrice: 0,
    checkoutSuccees: false


}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.checkoutSuccees = false
            const arg = action.payload;
            const existingItem = state.itemsList.find((item: Item) => item.id === arg.id)
            if (existingItem !== undefined) {
                existingItem.quantity++
                existingItem.totalPrice += arg.price
                state.totalPrice += arg.price
            } else {
                state.itemsList.push({
                    id: arg.id,
                    price: arg.price,
                    quantity: 1,
                    totalPrice: arg.price,
                    name: arg.title,
                    img: arg.img,
                    quantityIntital: arg.quantity,
                })
                state.totalPrice += arg.price
                state.totalQuantity++;
            }

        }, removeCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.itemsList.find((item: Item) => item.id === id.id)
            if (typeof id === "number") {
                state.itemsList = state.itemsList.filter((item: Item) => item.id !== id)
            }
            else if (existingItem?.quantity === 1) {
                state.itemsList = state.itemsList.filter((item) => item.id !== id.id);
                state.totalQuantity--;
            } else if (existingItem) {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkout.pending, (state, action) => {
                state.checkoutSuccees = true
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.itemsList = []
                state.totalPrice = 0
                state.totalQuantity = 0
                state.checkoutSuccees = false

            })

            .addCase(checkout.rejected, (state, action) => {
                alert(" checkout false");
            })
            .addCase(checkoutUser.pending, (state, action) => {
                state.checkoutSuccees = true
            })
            .addCase(checkoutUser.fulfilled, (state, action) => {
                state.itemsList = []
                state.totalPrice = 0
                state.totalQuantity = 0
                state.checkoutSuccees = false

            })

            .addCase(checkoutUser.rejected, (state, action) => {
                alert(" checkoutUser false");
            })

    }
})
export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer



interface initialStates {
    totalQuantity: number;
    totalPrice: number;
    itemsList: Item[];
    checkoutSuccees: boolean
}
export interface Item {
    id: number,
    price: number,
    quantity: number,
    quantityIntital: number,
    totalPrice: number,
    name: string,
    img: string
}
type objCheckOut = {
    listChose: Item[],
    arrPro: Product[],
}
