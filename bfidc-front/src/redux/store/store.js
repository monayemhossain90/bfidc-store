import {configureStore} from "@reduxjs/toolkit";
import {settingsSliceReducer} from "../state-slice/settingsSlice";
import {profileSliceReducer} from "../state-slice/profileSlice";
import {brandSliceReducer} from "../state-slice/brandSlice";
import {categorySliceReducer} from "../state-slice/categoryslice";
import {purchaseSliceReducer} from "../state-slice/purchaseSlice";
import {reportSliceReducer} from "../state-slice/reportSlice";
import {supplierSliceReducer} from "../state-slice/supplierSlice";
import {productSliceReducer} from "../state-slice/productSlice";
import {dashboardSliceReducer} from "../state-slice/dashboardSlice";
import {modalSliceReducer} from "../state-slice/modalSlice.js";


export default configureStore({

    reducer:{
        settings:settingsSliceReducer,
        profile:profileSliceReducer,
        brand:brandSliceReducer,
        category:categorySliceReducer,
        product:productSliceReducer,
        purchase:purchaseSliceReducer,
        report:reportSliceReducer,
        supplier:supplierSliceReducer,
        dashboard:dashboardSliceReducer,
        modal:modalSliceReducer,
    }
})