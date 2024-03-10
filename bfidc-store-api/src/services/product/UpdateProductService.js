const mongoose = require("mongoose");
const UpdateProductService = async (req, res, ProductModel) => {
  try{
    let UserEmail=req.headers['email'];
    let id=req.params.id;
    let PostBody=req.body;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(id), UserEmail:UserEmail};
    let data = await ProductModel.updateOne(UpdateQueryObject,PostBody);
    res.status(200).json({message: "success", data: data});
  }
  catch (e){
      res.status(500).json({message:"error", data:e})
  }
}

module.exports=UpdateProductService