import {createSlice} from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:'product',
    initialState:{
        List:[],
        ListTotal:0,
        ProductBrandDropDown:[],
        ProductCategoryDropDown:[],
        ProductData:{},
        ProductReportDataList:[],
        Products:[]
    },
    reducers:{
        SetProductList:(state,action)=>{
            state.List=action.payload
        },
        SetProductListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetProductBrandDropDown:(state,action)=>{
            state.ProductBrandDropDown=action.payload
        },
        SetProductCategoryDropDown:(state,action)=>{
            state.ProductCategoryDropDown=action.payload
        },
        SetProductData:(state,action)=>{
            state.ProductData=action.payload
        },
        SetProductReportDataList:(state,action)=>{
            state.ProductReportDataList=action.payload
        },
        SetProducts:(state,action)=>{
            state.Products=action.payload
        },
    }
})

export const {SetProductList,SetProductListTotal,SetProductBrandDropDown,SetProductCategoryDropDown, SetProductData, SetProductReportDataList, SetProducts}=productSlice.actions;
export const selectProductList = (state) => state.product.List;
export const selectProductListTotal = (state) => state.product.ListTotal;
export const selectProductCategoryDropDown = (state) => state.product.ProductCategoryDropDown;
export const selectProductBrandDropDown = (state) => state.product.ProductBrandDropDown;
export const selectProductReportDataList = (state) => state.product.ProductReportDataList;
export const selectProducts = (state) => state.product.Products;

export const selectStoreValue = (state) =>{
    const products =state.product.Products;
    if(products.length>0){
        const totalValue = products.reduce((pv, cv)=>{
            return Number(pv) + Number(cv.Unit * cv.Price)
        },0)

        return totalValue;
    }
}

export const productSliceReducer = productSlice.reducer;