const UserCreateService= async (req, res,DataModel) => {
    try{
        let reqBody=req.body;
        let existingUser = await DataModel.aggregate([{$match:{email: reqBody['email']}}]);

        if(existingUser.length === 0){
            let data = await DataModel.create(reqBody)
            res.status(201).json({message: "success", result:data});
        }else{
            res.status(409).json({message: "fail", result:"Email Already Exist"});
        }
    }
    catch (error) {
        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports=UserCreateService