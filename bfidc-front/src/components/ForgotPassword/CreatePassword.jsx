import React, {Fragment, useRef} from 'react';
import {
    ErrorToast,
    IsEmpty,
    IsNonWhiteSpace,
    IsValidLength,
    NewPasswordShowHide
} from "../../helper/ValidationHelper";
import {getEmail, getOTP} from "../../helper/SessionHelper";
import {useNavigate} from "react-router-dom";
import {GoEye, GoEyeClosed} from "react-icons/go";
import {CreateNewPasswordRequest} from "../../ApiServices/UsersAPIRequest";

const CreatePassword = (props) => {

   let passwordRef,ConfirmPasswordRef,ProcessingBtnRef = useRef();

    const navigate = useNavigate();



   const ResetPassword = async () => {

       let password = passwordRef.value;
       let confirmPassword = ConfirmPasswordRef.value;

        if(IsEmpty(password)){
            ErrorToast("Password Required!");
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast("Confirm Password Required!");
        }
        else if(password.length<5){
            ErrorToast("Password must be at least 5 characters");
        }
        else if(confirmPassword.lenght<5){
            ErrorToast("Confirm password must be at least 5 characters");
        }
        else if(password !== confirmPassword){
            ErrorToast("Password & Confirm Password Should be Same");
        }
        else if(IsValidLength(password)){
            ErrorToast("Password must be 5-16 Characters Long!");
        }
        else if(IsNonWhiteSpace(password)){
            ErrorToast("Password must not contain Whitespaces!")
        }
        else{
           let Result = await CreateNewPasswordRequest(getEmail(),getOTP(),password,ProcessingBtnRef);
                 if(Result===true){
                     localStorage.clear();
                     navigate('/Login');
                 }
        }

   }




//PasswordShowHide
    const ShowHide = () => {

        let password = passwordRef;
        let confirmPassword = ConfirmPasswordRef;
        let showIcon = document.getElementById('showIcon');
        let hideIcon = document.getElementById('hideIcon');
        NewPasswordShowHide(password,confirmPassword,showIcon,hideIcon);
    }


    const PasswordBtnShowHide = () => {

        let password = passwordRef.value;
        let passwordType = passwordRef.type;
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
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input defaultValue={getEmail()} readOnly={true} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input onChange={PasswordBtnShowHide} ref={(input)=>passwordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                            <GoEye onClick={ShowHide} id="showIcon"/>
                                            <GoEyeClosed onClick={ShowHide} id="hideIcon"/>
                                        </div>
                                        <div className="passwordField p-2 col-md-12 col-lg-12 col-sm-12 mb-3">
                                            <input ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <button onClick={ResetPassword} ref={(button)=>ProcessingBtnRef=button} className="btn btn-success w-100 animated fadeInUp float-end">Set Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;