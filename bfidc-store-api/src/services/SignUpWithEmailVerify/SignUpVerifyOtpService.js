

const SignUpVerifyOtpService = async (req, res,UsersModel, RegOTPModel ) => {
    let Email = req.params.email;
    let OTPCode = req.params.otp;
    let Status =0;
    let StatusUpdate=1;
    let reqBody = req.body;

    try{
        //OTP Verify Query
        let OTPCount = await RegOTPModel.aggregate([ {$match: {email: Email,otp: OTPCode,status: Status}}, {$count: "total"} ]);

        if(OTPCount.length>0){
            let OTPUpdate = await RegOTPModel.updateOne({
                email: Email,
                otp: OTPCode,
                status: Status
            }, {status: StatusUpdate});

            let SignUpData = await UsersModel.create(reqBody);
            res.status(201).json({message: "success", data: SignUpData });
        }
        else{
             res.status(400).json({message: "fail", data: "InvalidOTPCode"});
        }
    }
    catch (error){
           res.status(500).json({message: "error", data: error.toString()});
    }
}

module.exports=SignUpVerifyOtpService





//SignUp//SignUpVerifyOTP--Step-02--DataInsert-
/*
exports.SignUpVerifyOTP = async (req,res)=>{

    let Email = req.params.email;
    let OTPCode = req.params.otp;
    let Status =0;
    let StatusUpdate=1;
    let reqBody = req.body;



    try{

        //OTP Verify Query
        let OTPCount = await RegOTPModel.aggregate([ {$match: {email: Email,otp: OTPCode,status: Status}}, {$count: "total"} ]);

        if(OTPCount.length>0){

            let OTPUpdate = await RegOTPModel.updateOne({
                email: Email,
                otp: OTPCode,
                status: Status
            }, {status: StatusUpdate});


            let SignUpData = await UsersModel.create(reqBody);

            res.status(200).json({status: "success", data: SignUpData })


        }
        else{

            res.status(200).json({status: "fail", data: "InvalidOTPCode"})

        }

    }
    catch (error){

        res.status(200).json({status: "fail", data: error});
    }




}*/






