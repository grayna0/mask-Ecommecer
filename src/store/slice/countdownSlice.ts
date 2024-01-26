import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/Api";
export const postTimeCountDown = createAsyncThunk(
    "countdown/postTimeCountDown",
    async (data: any) => {
        try {
            api.put(`/countdown/1`, data)
        }
        catch (e) { 
            console.log(e);
            
        }
    }
)
export const getTimeCountDown = createAsyncThunk(
    "countdown/postTimeCountDown",
    async ( thunkAPI: any) => {

        const res = await api.get(`/countdown`)
        const resData = res.data[0]

        thunkAPI.dispatch(setCountDown(resData))

    }
)
export type countDownType = {
    date: number,
    month: number,
    year: number,
    active: boolean
}
const initialState: countDownType = {
    date: 0,
    month: 0,
    year: 0,
    active: false
}

const countDownSlice = createSlice({
    name: "countdown",
    initialState,
    reducers: {
        setCountDown(state, action) {
            state.date = Number(action.payload.days);
            state.month = Number(action.payload.month);
            state.year = Number(action.payload.year);
            state.active = true;
        },
        removeCountDown(state) {

            state.date = 0;
            state.month = 0;
            state.year = 0;
            state.active = false;
        }
    },

})
export const { setCountDown, removeCountDown } = countDownSlice.actions
export default countDownSlice.reducer