import axios from "axios";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {SetProfile} from "../redux/state-slice/profileSlice";


const AxiosHeader={headers:{"token":getToken()}}




export async function LoginRequest(email,password,SignInBtnRef){

   try {
       store.dispatch(ShowLoader())
       SignInBtnRef.classList.add('btnCapitalize');
       SignInBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
          "  Processing...";
       let URL=BaseURL+"/Login";
       let PostBody={"email":email,"password":password}
       let res =await axios.post(URL,PostBody);
       store.dispatch(HideLoader())
       SignInBtnRef.classList.remove('btnCapitalize');
       SignInBtnRef.innerHTML="Sign In";
       if(res.status===200){
               let MyToken = res.data['token'];
               let userDetails = res.data['data'];
               setToken(MyToken);
               setUserDetails(userDetails);
               SuccessToast("Sign in Success");
               return true;
       }
   }
   catch (e) {
       store.dispatch(HideLoader());
       SignInBtnRef.classList.remove('btnCapitalize');
       SignInBtnRef.innerHTML="Sign Up";
       if(e['message'] === "Request failed with status code 404"){
           ErrorToast("No User Found");
       }else{
           ErrorToast("Something Went Wrong");
       }
   }
}





//SignUpEmailVerify--SendOTP--Step-01
export async function SignUpEmailVerifyRequest(email,SignUpBtnRef){

        try {
            store.dispatch(ShowLoader());
            SignUpBtnRef.classList.add('btnCapitalize');
            SignUpBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
                "  Processing...";
            let URL = BaseURL + "/SignUpEmailVerify/" + email;
            let res = await axios.get(URL);
            store.dispatch(HideLoader());
            SignUpBtnRef.classList.remove('btnCapitalize');
            SignUpBtnRef.innerHTML="Sign Up";

          if(res.status === 200){
              SuccessToast("A 6 Digit verification code has been sent to your email address. ");
              return true;
            }
        }
        catch(e) {
            store.dispatch(HideLoader());
            SignUpBtnRef.classList.remove('btnCapitalize');
            SignUpBtnRef.innerHTML="Sign Up";
            if(e['message'] === "Request failed with status code 409"){
                ErrorToast("Email Already Exist");
            }else{
                ErrorToast("Something Went Wrong");
            }
        }

}

//SignUpVerifyOTP--Step-02-DataInsert
export async function SignUpVerifyOTPRequest(Email,FirstName,LastName,Mobile,Password,Photo,OTP,ProcessingBtnRef){

     try{
         store.dispatch(ShowLoader())
         ProcessingBtnRef.classList.add('btnCapitalize');
         ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
             "  Processing...";
         let URL = BaseURL+"/SignUpVerifyOTP/"+Email+"/"+OTP;
         let PostBody={
             email:Email,
             firstName:FirstName,
             lastName:LastName,
             mobile:Mobile,
             password:Password,
             photo:Photo
         }
         let res =await axios.post(URL,PostBody)
         store.dispatch(HideLoader())
         ProcessingBtnRef.classList.remove('btnCapitalize');
         ProcessingBtnRef.innerHTML="Verify";
         if(res.status === 201) {
             SuccessToast("Sign Up Success ");
             return true;
         }
     }
     catch(e){
         store.dispatch(HideLoader());
         ProcessingBtnRef.classList.remove('btnCapitalize');
         ProcessingBtnRef.innerHTML="Sign Up";
         if(e['message'] === "Request failed with status code 400"){
             ErrorToast("Invalid OTP Code");
         }else{
             ErrorToast("Something Went Wrong");
         }
     }
}



// Recover Password Step 01 Send OTP
export async function ForgotPasswordVerifyEmailRequest(email,ProcessingBtnRef){

    try {
        store.dispatch(ShowLoader());
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL=BaseURL+"/ForgotPasswordVerifyEmail/"+email;
        let res = await axios.get(URL);
        store.dispatch(HideLoader());
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Next";
            if(res.status===200){
                if(res.data['status'] === "fail"){
                    if(res.data['data'] === "NoUserFound"){
                        ErrorToast("Couldn't find your Email Address!");
                        return false;
                    }
                    else{
                        ErrorToast("Something Went Wrong");
                        return false;
                    }
                }
                else{
                    setEmail(email);
                    SuccessToast("A 6 Digit verification code has been sent to your email address.");
                    return true;
                }
            }
            else{
                ErrorToast("Something Went Wrong");
                return false;
            }
    }
    catch(error){
        store.dispatch(HideLoader());
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Next";
        ErrorToast("Something Went Wrong");
        return false;
    }

}




// Recover Password Step 02 Verify OTP
export async function ForgotPasswordVerifyOTPRequest(email,OTP,ProcessingBtnRef){


    try{
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL=BaseURL+"/ForgotPasswordVerifyOTP/"+email+"/"+OTP;
        let res = await axios.get(URL);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Verify";
           if(res.status===200){
                if(res.data['status']==="fail"){
                    if(res.data['data']==="InvalidOtpCode"){
                        ErrorToast("Invalid Verification Code!");
                        return false;
                    }
                    else{
                        ErrorToast("Something Went Wrong");
                        return false;
                    }
                }
                else{
                        SuccessToast("OTP Verification Successful");
                        return true;
                }
           }
           else{
                   ErrorToast("Something Went Wrong");
                   return false;
           }
    }
    catch(error){
        store.dispatch(HideLoader());
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Verify";
        ErrorToast("Something Went Wrong");
        return false;
    }

}





// Forgot Password Step 03 Create New Password
export async function CreateNewPasswordRequest(email,OTP,password,ProcessingBtnRef){

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL=BaseURL+"/CreateNewPassword";
        let PostBody={email:email,otp:OTP,password:password};
        let res=await axios.post(URL,PostBody);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Set Password";
        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['status']==="InvalidOtpCode"){
                    ErrorToast("Invalid Verification Code");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch(error){
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Set Password";
        ErrorToast("Something Went Wrong")
        return false;
    }
}




export async function SelectProfileDetailsRequest(){
    try {
        store.dispatch(ShowLoader())
        let URL=BaseURL+"/ProfileDetails";
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status'] === "success"){
                store.dispatch(SetProfile(res.data['data']))
            }
            else{
                ErrorToast("Something Went Wrong")
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



export async function ProfileUpdateRequest(Email,FirstName,LastName,Mobile,Photo,ProcessingBtnRef){
    try {
        store.dispatch(ShowLoader())
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL=BaseURL+"/ProfileUpdate";
        let PostBody={email:Email,firstName:FirstName,lastName:LastName,mobile:Mobile,photo:Photo};
        let UserDetails={email:Email,firstName:FirstName,lastName:LastName,mobile:Mobile,photo:Photo};
        let res=await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Update";
        if(res.status===200){
            if(res.data['status'] === "success"){
                SuccessToast("Profile Update Success")
                setUserDetails(UserDetails);
                return true;
            }
            else{
                ErrorToast("Something Went Wrong")
                return  false;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }
    catch (e){
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Update";
        ErrorToast("Something Went Wrong")
        return false;
    }

}



export async function ChangePasswordRequest(CurrentPassword, NewPassword,ProcessingBtnRef) {

    try{
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL=BaseURL+"/ChangePassword/"+CurrentPassword+"/"+NewPassword;
        let res=await axios.get(URL,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Change Password";
        if(res.status===200){
            if(res.data['data']==="WrongCurrentPassword"){
                ErrorToast("Wrong Current Password!");
                return false;
            }
            else{
                SuccessToast("Password Change Success");
                return true;
            }

        }else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }
    catch(error){
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Change Password";
        ErrorToast("Something Went Wrong");
        return false;
    }
}



