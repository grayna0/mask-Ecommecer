import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/Api";


const actionLogin  = createAsyncThunk(
    "auth/actionLogin",
    async(data,thunkAPI)=>{
        try{
            const res = await api.get("/infoUsers")
            return res


        }catch(err){
            return thunkAPI.rejectWithValue("API failed");
        }

    }
)


const authSlice=createSlice({
    name:"auth",
    initialState:{token:null,name:null},
    reducers:{
        loginAcount(state,payload){

        }
    }
})