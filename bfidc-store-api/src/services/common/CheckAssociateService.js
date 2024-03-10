const DeleteService = require("./DeleteService");

const CheckAssociateService = async (req, res, QueryObject, AssociateModel) => {
  try{
      let associated = await AssociateModel.aggregate([{$match: QueryObject}])

      if(associated.length > 0){
          return true;
      }
      else{
          return false;
      }
  }
  catch(e){
      res.status(500).json({message:"error", data:e.toString()})
  }
}

module.exports=CheckAssociateService