/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/Api";

import useLocalStorage from "../../hook/useLocalStorage";


export const actionLogin = createAsyncThunk(
    "action/actionLogin",
    async (data: any, thunkAPI) => {
        const { getLocalItem, setLocalItem } = useLocalStorage()
        const dataUserLogin = getLocalItem("user")
        if (dataUserLogin) {
            thunkAPI.dispatch(loginAcount(dataUserLogin))

        } else {
            const res = await api.get(`/infoUsers/?q=${data}`)
            thunkAPI.dispatch(loginAcount(res.data[0]))
            setLocalItem("user", res.data[0])
        }
    }
)
export const actionRegister = createAsyncThunk(
    "action/actionRegister",
    async (data: any, thunkAPI) => {
        const name: any = thunkAPI.getState()
     
        if (data.nickname !== name?.auth.name) {
            await api.post(`/infoUsers`, data)
            return true
        }else{
            return false
        }
    }
)
export const actionLogOut = createAsyncThunk(
    "action/actionLogOut",
    async (_payload: any, thunkAPI) => {
        const { removeLocalItem } = useLocalStorage()
        removeLocalItem("user")
        // @ts-ignore
        thunkAPI.dispatch(logOutAcount())
    }
)
export const changeUserDetails = createAsyncThunk(
    "action/changeUserDetails",
    async (data: any, thunkAPI) => {
        const idUser: any = thunkAPI.getState()
        try {
            await api.put(`/infoUsers/${idUser?.auth.id}`, data)
        } catch (error) {
            console.log(error);
            
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        detail: {
            id: null,
            totalItemOders: 0,
            img: "",
            name: null,
            pws: null,
        },
        loginSuccess: false,
        checkRegister: true,
        registerSuccess: false,
        loading:false
    },
    reducers: {
        loginAcount(state, action) {
            state.detail.name = action.payload.nickname
            state.detail.pws = action.payload.password
            state.detail.id = action.payload.id
            state.loginSuccess = true
            state.detail.img = action.payload.img


        },
   
        logOutAcount(state, _action) {
            state.detail.name = null
            state.detail.pws = null
            state.loginSuccess = false

        },
        registerDone(state, action) {
            if (action.payload === "hiden-error") {
                state.checkRegister = true
            } else if (action.payload === "show-login") {
                state.registerSuccess = false
            }


        }

    }, extraReducers: (builder) => {
        builder
            .addCase(actionRegister.fulfilled, (state, action) => {
                console.log(action);
                if (state.detail.name === action.meta.arg.nickname) {
                    state.checkRegister = false
                } else if (state.detail.name !== action.meta.arg.nickname) {
                    state.registerSuccess = true
                }
            })
            .addCase(actionRegister.rejected, (state, action) => {
                if (action.meta.arg.nickname === "") {
                    state.checkRegister = false
                }

            })
            .addCase(changeUserDetails.fulfilled, (state, action) => {
                state.detail.img = action.meta.arg.img

            })
            .addCase(actionLogOut.pending , (state,_action) => {
                state.loading=true
                state.loginSuccess=true
                state.registerSuccess=false
            })
            .addCase(actionLogOut.fulfilled , (state,_action) => {
                state.loading=false
                state.loginSuccess=false
                state.detail={ id: null,
                    totalItemOders: 0,
                    img: "",
                    name: null,
                    pws: null,}
            })
            .addCase(actionLogOut.rejected , () => {
             console.log("Logout false");
             
            })
            .addCase(actionLogin.fulfilled , (state,_action) => {
                state.loading=true
                state.registerSuccess=false
            })
            .addCase(actionLogin.rejected , () => {
             console.log("LogIn false");
             
            })




    }


})
export const { loginAcount, logOutAcount, registerDone } = authSlice.actions
export default authSlice.reducer