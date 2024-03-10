import {createSlice} from "@reduxjs/toolkit";
export const categorySlice=createSlice({
    name:'category',
    initialState:{
        List:[],
        ListTotal:0,
        CategoryName:""
    },
    reducers:{
        SetCategoryList:(state,action)=>{
            state.List=action.payload
        },
        SetCategoryListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetCategoryName:(state,action)=>{
            state.CategoryName=action.payload
        }
    }
})

export  const {SetCategoryList,SetCategoryListTotal,SetCategoryName}=categorySlice.actions;
export const selectCategoryList = (state) => state.category.List;
export const selectCategoryListTotal = (state) => state.category.ListTotal;
export const selectCategoryName = (state) => state.category.CategoryName;
export const categorySliceReducer = categorySlice.reducer;