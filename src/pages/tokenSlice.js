import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../app/slices/userSlice";

export const tokenSlice= createSlice({

    name : 'token',
    initialState : {
        credentials: {},
        token: {}
    }, 
    reducers : {
        tokenLogin : (state, action)=>{
            return{
                ...state, 
                ...action.payload
            }
        },

        tokenLogout : (state, action)=>{
            return{
                ...state, 
                ...action.payload
            }
        }
    }
})

export const {tokenLogin, tokenLogout} = userSlice.actions
export const tokenData= (state) => state.token
export default tokenSlice.reducer