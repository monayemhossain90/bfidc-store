const UsersModel = require("../../models/Users/UsersModel");
const OTPSModel = require("../../models/Users/OTPSModel");
const RegOTPModel = require("../../models/Users/RegOTPModel");
const UserLoginService = require("../../services/user/UserLoginService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserDetailsService = require("../../services/user/UserDetailsService");
const UserCreateService = require("../../services/user/UserCreateService");
const ChangePasswordService = require("../../services/user/ChangePasswordService");
const ForgotPasswordVerifyEmailService = require("../../services/ForgotPassword/ForgotPasswordVerifyEmailService");
const ForgotPasswordVerifyOtpService = require("../../services/ForgotPassword/ForgotPasswordVerifyOtpService");
const CreateNewPasswordService = require("../../services/ForgotPassword/CreateNewPasswordService");
const SignUpEmailVerifyService = require("../../services/SignUpWithEmailVerify/SignUpEmailVerifyService");
const SignUpVerifyOtpService = require("../../services/SignUpWithEmailVerify/SignUpVerifyOtpService");


exports.Registration=async (req, res) => {
  await UserCreateService(req,res,UsersModel)
}

exports.Login=async(req,res)=>{
    await UserLoginService(req,res,UsersModel)
}

exports.ProfileUpdate=async (req, res) => {
    let Result=await UserUpdateService(req,UsersModel)
    res.status(200).json(Result)
}

exports.ProfileDetails=async (req, res) => {
    let Result=await UserDetailsService(req,UsersModel)
    res.status(200).json(Result)
}


//Step-01
exports.ForgotPasswordVerifyEmail=async (req,res)=>{
    let Result=await ForgotPasswordVerifyEmailService(req,UsersModel)
    res.status(200).json(Result)
}

//Step-02
exports.ForgotPasswordVerifyOTP=async (req,res)=>{
    let Result=await ForgotPasswordVerifyOtpService(req,OTPSModel)
    res.status(200).json(Result)
}

//Step-03
exports.CreateNewPassword=async (req,res)=>{
    let Result=await CreateNewPasswordService(req,UsersModel,OTPSModel)
    res.status(200).json(Result)
}



//SignUpUser Email Verify--Step-01//OTP-Send
exports.SignUpEmailVerify = async (req,res)=> {
    await SignUpEmailVerifyService(req,res,UsersModel,RegOTPModel)
}


//SignUp//SignUpVerifyOTP--Step-02--DataInsert-
exports.SignUpVerifyOTP = async (req,res)=>{
    await SignUpVerifyOtpService(req,res,UsersModel,RegOTPModel)
}




//ChangePassword
exports.ChangePassword = async (req,res)=>{

    let Result = await ChangePasswordService(req,UsersModel);
    res.status(200).json(Result)

}

















