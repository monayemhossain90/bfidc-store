const mongoose = require("mongoose");
const UpdateService= async (Request,DataModel) => {
    try{
        let UserEmail=Request.headers['email'];
        let id=Request.params.id;
        let PostBody=Request.body;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(id), UserEmail:UserEmail};
        let data = await DataModel.updateOne(UpdateQueryObject,PostBody);
        return {status: "success", data: data}
    }
    catch (error) {
        // console.log("")
        return {status: "fail", data: error}
    }
}
module.exports=UpdateService

