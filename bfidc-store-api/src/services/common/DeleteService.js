const mongoose = require("mongoose");
const DeleteService= async (req,res, Model) => {
    try{
        let deleteId=req.params.id;
        let userEmail=req.headers['email'];
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: ObjectId(deleteId)};
        let Delete = await Model.deleteOne(DeleteQueryObject);
        res.status(200).json({message:"success", Delete:Delete})
    }
    catch(e){
        res.status(500).json({message:"error", data: e.toString()})
    }
}
module.exports=DeleteService