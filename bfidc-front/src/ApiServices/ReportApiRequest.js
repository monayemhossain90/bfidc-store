import store from "../redux/store/store";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {ErrorToast} from "../helper/ValidationHelper";
import {SetProductReportDataList} from "../redux/state-slice/productSlice.js";
const AxiosHeader={headers:{"token":getToken()}}




//Product Report
export async function ProductReportByDateRequest(fromDate,toDate) {
    try {
        store.dispatch(ShowLoader())
        let PostBody={"FromDate":fromDate+"T00:00:00.000+00:00","ToDate":toDate+"T23:59:59.999+00:00"}
        let URL = BaseURL+"/ProductsReportByDate";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200) {
            store.dispatch(SetProductReportDataList(result.data['data']))
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        if(e['message'] === "Request failed with status code 401"){
            ErrorToast("Token Authorized");
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/Login"
            },500)
        }else{
            ErrorToast("Something Went Wrong");
        }
    }
}




