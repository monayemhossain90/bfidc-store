import React, {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty} from "../../helper/ValidationHelper";
import {setEmail} from "../../helper/SessionHelper";
import {ForgotPasswordVerifyEmailRequest} from "../../ApiServices/UsersAPIRequest";



const SendOtp = (props) => {

    let emailRef,ProcessingBtnRef = useRef();

    const navigate = useNavigate();

    const VerifyEmail= async () => {

        let email = emailRef.value;

        if(IsEmpty(email)){
            ErrorToast("Email Address Required!");
        }
        else if(IsEmail(email)){
            ErrorToast("Valid Email Address Required!");
        }
        else{

           let Result = await ForgotPasswordVerifyEmailRequest(email,ProcessingBtnRef);
                if(Result===true){
                    setEmail(email);
                    navigate('/VerifyOTP');
                }
            }
    }



    return (
        <Fragment>
            <title>{props.title}</title>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4>EMAIL ADDRESS</h4>
                                <br/>
                                <label>Your email address</label>
                                <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail} ref={(button)=>ProcessingBtnRef=button} className="btn btn-success w-100 animated fadeInUp float-end">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default SendOtp;