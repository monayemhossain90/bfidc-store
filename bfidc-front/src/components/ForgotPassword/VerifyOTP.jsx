import React, {Fragment, useRef, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {ErrorToast} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";
import {getEmail, setOTP} from "../../helper/SessionHelper";
import {ForgotPasswordVerifyOTPRequest} from "../../ApiServices/UsersAPIRequest";

const VerifyOtp = (props) => {

    let ProcessingBtnRef = useRef();

     const navigate = useNavigate();
     let [OTP,SetOTP] = useState("");


    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }


    const SubmitOTP = async () => {

        if(OTP.length===6){
           let Result = await ForgotPasswordVerifyOTPRequest(getEmail(),OTP,ProcessingBtnRef);
                if(Result===true){
                    setOTP(OTP);
                    navigate('/CreatePassword');
                }
        }
        else{
            ErrorToast("Enter 6 Digit Code");
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
                                <h4>OTP VERIFICATION </h4>
                                <p>A 6 Digit verification code has been sent to your email address <span className="text-bold">{getEmail()}</span> </p>
                                <ReactCodeInput onChange={(value)=>SetOTP(value)} inputStyle={defaultInputStyle} fields={6}/>
                                <br/><br/>
                                <button onClick={SubmitOTP} ref={(button)=>ProcessingBtnRef=button} className="btn btn-success w-100 animated fadeInUp float-end">Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default VerifyOtp;