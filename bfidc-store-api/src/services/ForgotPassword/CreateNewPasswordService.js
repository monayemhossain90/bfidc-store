const OTPSModel = require("../../models/Users/OTPSModel");
const UsersModel = require("../../models/Users/UsersModel");

const CreateNewPasswordService= async (Request,UsersModel,OTPSModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['otp'];
    let NewPass =  Request.body['password'];
    let statusUpdate=1;

    try {
        // Database First Process
          let OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}]);

          if(OTPUsedCount.length > 0){
            // Database Second Process
            let PasswordUpdate = await UsersModel.updateOne({email: email},{password: NewPass})
            return {status: "success", data: PasswordUpdate}
          }
          else{
            return {status: "fail", data: "InvalidOtpCode"}
          }
    }


    catch (e) {
        return {status: "fail", data: error}
    }
}
module.exports=CreateNewPasswordService