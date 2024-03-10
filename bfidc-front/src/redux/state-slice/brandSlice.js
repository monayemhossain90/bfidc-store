import {createSlice} from "@reduxjs/toolkit";

export const brandSlice=createSlice({
    name:'brand',
    initialState:{
        List:[],
        ListTotal:0,
        BrandName:""
    },
    reducers:{
        SetBrandList:(state,action)=>{
            state.List=action.payload
        },
        SetBrandListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetBrandName:(state,action)=>{
            state.BrandName=action.payload
        }
    }
})
export  const {SetBrandList,SetBrandListTotal,SetBrandName}=brandSlice.actions;
export const selectBrandList = (state) => state.brand.List;
export const selectBrandListTotal = (state) => state.brand.ListTotal;
export const selectBrandName = (state) => state.brand.BrandName;
export const brandSliceReducer = brandSlice.reducer;
