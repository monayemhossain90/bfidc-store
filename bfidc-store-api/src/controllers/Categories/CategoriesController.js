const CategoriesModel = require("../../models/Categories/CategoriesModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");

exports.CreateCategory=async (req, res) => {
    let Result= await CreateService(req,CategoriesModel)
    res.status(200).json(Result)
}

exports.UpdateCategory=async (req, res) => {
    let Result=await UpdateService(req,CategoriesModel)
    res.status(200).json(Result)
}


exports.CategoriesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{CategoryName: SearchRgx}]
    let Result= await ListService(req,CategoriesModel,SearchArray)
    res.status(200).json(Result)
}


exports.CategoriesDropDown=async (req, res) => {
    let Result= await DropDownService(req,CategoriesModel,{_id:1,CategoryName:1})
    res.status(200).json(Result)
}


exports.CategoryDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,CategoriesModel)
    res.status(200).json(Result)
}


exports.DeleteCategory=async (req, res) => {
    let DeleteID=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate= await CheckAssociateService(req, res,{CategoryID:ObjectId(DeleteID)},ProductsModel);

    if(CheckAssociate){
        res.status(403).json({message:"associate", data: "associated with Product"})
    }else{
        await DeleteService(req, res, CategoriesModel);
    }
}



