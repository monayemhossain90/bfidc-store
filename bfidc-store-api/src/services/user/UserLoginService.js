const CreateToken = require("../../utility/CreateToken");

const UserLoginService= async (req, res,DataModel) => {
    try {
        let data =await DataModel.aggregate([{$match:req.body}, {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}])
        if(data.length>0){
            let token = await CreateToken(data[0]['email'])
            res.status(200).json({message:"success",token:token,data:data[0]});
        }
        else {
            res.status(404).json({message:"fail", data:"NoUserFound"});
        }
    }
    catch (error) {
        res.status(500).json({message:"error", data:error.toString()});
    }
}
module.exports=UserLoginService