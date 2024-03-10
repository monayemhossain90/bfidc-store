import axios from "axios";
import store from "../redux/store/store";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {
    SetExpenseChart,
    SetExpenseTotal,
    SetReturnChart,
    SetReturnTotal,
    SetSaleChart, SetSaleTotal
} from "../redux/state-slice/dashboardSlice";
import {ErrorToast} from "../helper/ValidationHelper";
const AxiosHeader={headers:{"token":getToken()}}


export async function ExpensesSummary(){
    try {
        debugger;
        store.dispatch(ShowLoader())
        debugger;
        let URL=BaseURL+"/ExpensesSummary";
        debugger;
        let res=await axios.get(URL,AxiosHeader)
        debugger;
        store.dispatch(HideLoader())
        if(res.status===200 && res.data['status'] === "success"){
            if(res.data['data'][0]['Last30Days'].length > 0){
                store.dispatch(SetExpenseChart(res.data['data'][0]['Last30Days']))
                store.dispatch(SetExpenseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            }else{
                store.dispatch(SetExpenseChart([]))
                store.dispatch(SetExpenseTotal(0))
            }
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
    }
}

export async function ReturnSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/ReturnSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status===200 && res.data['status'] === "success"){
            if(res.data['data'][0]['Last30Days'].length > 0){
                store.dispatch(SetReturnChart(res.data['data'][0]['Last30Days']))
                store.dispatch(SetReturnTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            }else{
                store.dispatch(SetReturnChart([]))
                store.dispatch(SetReturnTotal(0))

            }
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
    }
}

export async function SaleSummary(){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/SalesSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if(res.status===200 && res.data['status'] === "success"){
            if(res.data['data'][0]['Last30Days'].length > 0){
                store.dispatch(SetSaleChart(res.data['data'][0]['Last30Days']))
                store.dispatch(SetSaleTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            }else{
                store.dispatch(SetSaleChart([]))
                store.dispatch(SetSaleTotal(0))
            }
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
    }
}

