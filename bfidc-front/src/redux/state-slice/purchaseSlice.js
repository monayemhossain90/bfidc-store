import {createSlice} from "@reduxjs/toolkit";
export const purchaseSlice=createSlice({
    name:'purchase',
    initialState:{
        List:[],
        ListTotal:0,
        SupplierDropDown:[],
        ProductDropDown:[],
        PurchaseItemList:[],
    },
    reducers:{
        SetPurchaseList:(state,action)=>{
            state.List=action.payload
        },
        SetPurchaseListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetSupplierDropDown:(state,action)=>{
            state.SupplierDropDown=action.payload
        },
        SetProductDropDown:(state,action)=>{
            state.ProductDropDown=action.payload
        },
        SetPurchaseItemList:(state,action)=>{
            state.PurchaseItemList.push(action.payload)
        },
        RemovePurchaseItem:(state,action)=>{
            state.PurchaseItemList.splice(action.payload,1)
        },
        ClearPurchaseItemList:(state,action)=>{
            state.PurchaseItemList=action.payload
        }

    }
})

export  const {SetPurchaseList,SetPurchaseListTotal,SetProductDropDown,SetSupplierDropDown,SetPurchaseItemList,RemovePurchaseItem,ClearPurchaseItemList}=purchaseSlice.actions;
export const selectPurchaseList = (state) => state.purchase.List;
export const selectPurchaseListTotal = (state) => state.purchase.ListTotal;
export const selectProductDropDown = (state) => state.purchase.ProductDropDown;
export const selectSupplierDropDown = (state) => state.purchase.SupplierDropDown;
export const selectPurchaseItemList = (state) => state.purchase.PurchaseItemList;
export const purchaseSliceReducer = purchaseSlice.reducer;