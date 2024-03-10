import {createSlice} from "@reduxjs/toolkit";
export const profileSlice=createSlice({
    name:'profile',
    initialState:{
        ProfileData:{},
    },
    reducers:{
        SetProfile:(state,action)=>{
            state.ProfileData=action.payload
        }
    }
})
export  const {SetProfile}=profileSlice.actions;
export const profileSliceReducer = profileSlice.reducer;
