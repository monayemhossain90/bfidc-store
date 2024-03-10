import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {SetBrandList, SetBrandListTotal, SetBrandName} from "../redux/state-slice/brandSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
const AxiosHeader={headers:{"token":getToken()}}


//BrandList
export async function BrandListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/BrandList/"+pageNo+"/"+perPage+"/"+searchKeyword;

        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())

       if (res.status === 200 && res.data['status'] === "success") {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetBrandList(res.data['data'][0]['Rows']))
                store.dispatch(SetBrandListTotal(res.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetBrandList([]))
                store.dispatch(SetBrandListTotal(0))
            }
        } else {
            ErrorToast("Something Went Wrong")
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


//CreateBrand
export async function CreateBrandRequest(brandName,ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateBrand"
        let PostBody = {BrandName:brandName};
        const result = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Brand Create";
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Brand Create Success");
            return  true;
        }
        else if(result.status === 200 && result.data['status'] === "fail") {
            if(result.data['data']['keyPattern']['BrandName']===1){
                ErrorToast("Brand Name Already Exist")
                return false;
            }
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Brand Create";
        ErrorToast("Something Went Wrong")
        return  false
    }
}



export async function FillBrandFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/BrandDetailsByID/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let BrandData=res.data['data'];
            store.dispatch(SetBrandName(BrandData['BrandName']));
            return  true;
        } else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}



export async function UpdateBrandRequest(brandName,ObjectID,ProcessingBtnRef) {
    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateBrand/"+ObjectID;
        let PostBody = {BrandName:brandName};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['BrandName'] === 1){
                    ErrorToast("This Brand Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Brand Name Update Success");
                return true;
            }

        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        ErrorToast("Something Went Wrong")
        return false;
    }
}




export async function DeleteBrandRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteBrand/"+ObjectID;
        const res = await axios.delete(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200){
            SuccessToast("Brand Delete Success");
            return true;
        }
    }
    catch (error) {
        store.dispatch(HideLoader())
        if(error?.response?.status === 403) {
            ErrorToast("Failled! This Brand is associated with Product")
        }
        else if(error?.response?.status === 401){
            ErrorToast("Token Authorized");
            localStorage.clear();
            setTimeout(()=>{
                window.location.href="/Login"
            },500)
        }
        else{
            ErrorToast("Something Went Wrong!");
        }
        return false
    }
}





