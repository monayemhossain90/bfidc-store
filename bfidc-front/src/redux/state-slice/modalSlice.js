import {createSlice} from "@reduxjs/toolkit";

export const modalSlice=createSlice({
    name:'modal',
    initialState:{
        AddModalShow: false,
        MinusModalShow: false,
        AddModalShow2: false,
        MinusModalShow2: false,
        ProductID:"",
        ExistUnit: 0
    },
    reducers:{
        SetAddModalShow:(state,action)=>{
            state.AddModalShow=action.payload
        },
        SetMinusModalShow:(state,action)=>{
            state.MinusModalShow=action.payload
        },
        SetAddModalShow2:(state,action)=>{
            state.AddModalShow2=action.payload
        },
        SetMinusModalShow2:(state,action)=>{
            state.MinusModalShow2=action.payload
        },
        SetProductID:(state,action)=>{
            state.ProductID=action.payload
        },
        SetExistUnit:(state,action)=>{
            state.ExistUnit=action.payload
        }
    }
})
export  const { SetAddModalShow, SetMinusModalShow, SetAddModalShow2, SetMinusModalShow2, SetProductID, SetExistUnit}=modalSlice.actions;
export const selectAddModalShow = (state) => state.modal.AddModalShow;
export const selectMinusModalShow = (state) => state.modal.MinusModalShow;
export const selectAddModalShow2 = (state) => state.modal.AddModalShow2;
export const selectMinusModalShow2 = (state) => state.modal.MinusModalShow2;
export const selectProductID = (state) => state.modal.ProductID;
export const selectExistUnit = (state) => state.modal.ExistUnit;
export const modalSliceReducer = modalSlice.reducer;
