import {
    ErrorToast,
    IsEmpty,
    IsNonWhiteSpace,
    IsValidLength, NewPasswordShowHide,
} from "../../../helper/ValidationHelper";
import {ChangePasswordRequest} from "../../../ApiServices/UsersAPIRequest";
import {removeSessions} from "../../../helper/SessionHelper";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {Fragment, useRef} from "react";


const ChangePassword = (props) => {

    let CurrentPasswordRef,NewPasswordRef,ConfirmNewPasswordRef,ProcessingBtnRef = useRef();

    const ClickChangePassword = async () => {

        let CurrentPassword = CurrentPasswordRef.value;
        let NewPassword = NewPasswordRef.value;
        let confirmPassword = ConfirmNewPasswordRef.value;

        if(IsEmpty(CurrentPassword)){
            ErrorToast("Current Password Required!");
        }
        else if(IsEmpty(NewPassword)){
            ErrorToast("New Password Required!");
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast("Confirm New Password Required!");
        }
        else if(NewPassword.length<5){
            ErrorToast("Password must be at least 5 characters");
        }
        else if(confirmPassword.length<5){
            ErrorToast("Confirm password must be at least 5 characters");
        }
        else if(NewPassword !== confirmPassword){
            ErrorToast("New Password & Confirm New Password Should be Same");
        }
        else if(IsValidLength(NewPassword)){
            ErrorToast("Password must be 5-16 Characters Long!");
        }
        else if(IsNonWhiteSpace(NewPassword)){
            ErrorToast("Password must not contain Whitespaces!")
        }
        else{
            let Result = await ChangePasswordRequest(CurrentPassword,NewPassword,ProcessingBtnRef);
            if(Result===true){
                setTimeout(()=>{
                   removeSessions()
                },500);
            }

        }

    }



//PasswordShowHide
    const ShowHide = () => {
        let password = NewPasswordRef;
        let confirmPassword = ConfirmNewPasswordRef;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');
        NewPasswordShowHide(password,confirmPassword,showIcon,hideIcon);
    }


    const PasswordBtnShowHide = () => {

        let password = NewPasswordRef.value;
        let passwordType = ConfirmNewPasswordRef.type;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');

        if(password.length !== 0 && passwordType==="password"){
            showIcon.classList.add('ShowBtnActive');
        }
        else if(password.length !== 0 && passwordType==="text"){
            hideIcon.classList.add('ShowBtnActive');
        }
        else if(password.length === 0 && passwordType==="password"){
            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }
        else if(password.length === 0 && passwordType==="text"){
            showIcon.classList.remove('ShowBtnActive');
            hideIcon.classList.remove('ShowBtnActive');
        }
    }







    return (
        <Fragment>
            <title>{props.title}</title>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>Change Password</h4>
                                <br/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="textAlign passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-5 ">
                                            <label>Current Password</label>
                                            <input ref={(input)=>CurrentPasswordRef=input} placeholder="Current Password" className="form-control animated fadeInUp " type="password"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3 ">
                                            <input onChange={PasswordBtnShowHide} ref={(input)=>NewPasswordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                            <GoEye onClick={ShowHide} id="showIcon"/>
                                            <GoEyeClosed onClick={ShowHide} id="hideIcon"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 ">
                                            <input ref={(input)=>ConfirmNewPasswordRef=input} placeholder="Confirm New Password" className="form-control animated fadeInUp" type="password"/>
                                        </div>
                                        <div className="textAlign passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3 mt-3">
                                            <button onClick={ClickChangePassword} ref={(button)=>ProcessingBtnRef=button} className="btn btnBackground btnCapitalize w-100 animated fadeInUp float-end">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ChangePassword;