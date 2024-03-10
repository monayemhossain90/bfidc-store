import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {SetCategoryList, SetCategoryListTotal, SetCategoryName} from "../redux/state-slice/categoryslice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
const AxiosHeader={headers:{"token":getToken()}}

export async function CategoryListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CategoriesList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetCategoryList(result.data['data'][0]['Rows']))
                store.dispatch(SetCategoryListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetCategoryList([]))
                store.dispatch(SetCategoryListTotal(0))
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
export async function CreateCategoryRequest(categoryName,ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateCategory"
        let PostBody = {CategoryName:categoryName};
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Create Category";
        if (res.status === 200) {
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['CategoryName']=== 1){
                    ErrorToast("This Category Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Category Create Success");
                return true;
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
        ProcessingBtnRef.innerHTML="Create Category";
        ErrorToast("Something Went Wrong")
        return  false
    }
}


//SelectCategoryById
export async function FillCategoryFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CategoryDetailsByID/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            let CategoryData=res.data['data'];
            store.dispatch(SetCategoryName(CategoryData['CategoryName']));
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



//UpdateCategory
export async function UpdateCategoryRequest(categoryName,ObjectID,ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateCategory/"+ObjectID;
        let PostBody = {CategoryName:categoryName};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['CategoryName'] === 1){
                    ErrorToast("This Category Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Category Name Update Success");
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



export async function DeleteCategoryRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteCategory/"+ObjectID;
        let res = await axios.delete(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200){
            SuccessToast("Category Delete Success");
            return true;
        }
    }
    catch(error){
        store.dispatch(HideLoader())
        if(error?.response?.status === 403) {
            ErrorToast("Failled! This Category is associated with Product")
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
