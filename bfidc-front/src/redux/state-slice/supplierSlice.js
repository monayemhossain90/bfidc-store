import {createSlice} from "@reduxjs/toolkit";
export const supplierSlice=createSlice({
    name:'supplier',
    initialState:{
        List:[],
        ListTotal:0,
        SupplierData:{}
    },
    reducers:{
        SetSupplierList:(state,action)=>{
            state.List=action.payload
        },
        SetSupplierListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetSupplierData:(state,action)=>{
            state.SupplierData=action.payload
        },

    }
})

export  const {SetSupplierList,SetSupplierListTotal,SetSupplierData}=supplierSlice.actions;
export const selectSupplierList = (state) => state.supplier.List;
export const selectSupplierListTotal = (state) => state.supplier.ListTotal;
export const supplierSliceReducer = supplierSlice.reducer;