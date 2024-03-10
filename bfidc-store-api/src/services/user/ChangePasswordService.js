
const ChangePasswordService = async (Request, UsersModel) => {

    try{

        let CurrentPassword = Request.params.currentPassword;
        let NewPassword = Request.params.newPassword;
        let Email = Request.headers['email'];

        //Database First Process
        let data =await UsersModel.aggregate([{$match:{email:Email,password:CurrentPassword}}]);

        if(data.length>0){

            //Database Second Process
            let PasswordUpdate = await UsersModel.updateOne({email: Email, password:CurrentPassword}, {email: Email, password:NewPassword});
            return {status: "success", data: PasswordUpdate}
        }
        else{
            return  {status: "fail", data: "WrongCurrentPassword"}
        }

    }
    catch(error){

        return {status: "fail", data: error}
    }




}


module.exports=ChangePasswordService