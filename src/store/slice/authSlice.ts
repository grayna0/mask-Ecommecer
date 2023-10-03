import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/Api";
import { Hidden } from "@mui/material";


export const actionLogin = createAsyncThunk(
    "action/actionLogin",
    async (data:any,thunkAPI) => {
  
         const res=await api.get(`/infoUsers/?q=${data}`)
         thunkAPI.dispatch(loginAcount(res.data[0]))
     
         
        
    }
)
export const actionRegister = createAsyncThunk(
    "action/actionRegister",
    async (data:any,thunkAPI) => {
        const name:any =thunkAPI.getState()
        console.log(name?.auth.name);
        if(data.nickname !== name?.auth.name ){
            await api.post(`/infoUsers`,data)
        

        }
    
    }
)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:null,
        name:null,
        pws:null,
        id:null,
        loginSuccess:false,
        checkRegister:true,
        registerSuccess:false,
    },
    reducers:{
        loginAcount(state,action){ 
                state.name = action.payload.nickname
                state.pws = action.payload.password
                state.id = action.payload.id
                state.loginSuccess = true
        },
        logOutAcount(state,action){
            state.name = null
            state.pws = null
            state.id =null
            state.loginSuccess = false

        },
        registerDone(state,action){
            console.log(action.payload);
            console.log( state.registerSuccess);
            
          if(action.payload === "hiden-error"){
            state.checkRegister=true
          }else  if(action.payload === "show-login"){

              state.registerSuccess=false 
          }
           
            
        }

    },extraReducers: (builder) => {
        builder
            .addCase(actionRegister.fulfilled, (state, action) => {
             console.log(action);
             if(state.name === action.meta.arg.nickname){

                state.checkRegister=false
            }else if(state.name !==  action.meta.arg.nickname){
               
                state.registerSuccess=true 
            }
             
            })
            .addCase(actionRegister.rejected, (state, action) => {
                console.log(action);
               if( action.meta.arg.nickname === ""){
                  
                   state.checkRegister=false
               }
                
               })
        

    }
  
    
})
export const {loginAcount,logOutAcount,registerDone} = authSlice.actions
export default authSlice.reducer