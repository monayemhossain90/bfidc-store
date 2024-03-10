const BrandsModel = require("../../models/Brands/BrandsModel");
const mongoose = require("mongoose");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const DeleteService = require("../../services/common/DeleteService");
const ProductsModel = require("../../models/Products/ProductsModel");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");

exports.CreateBrand=async (req, res) => {
    let Result= await CreateService(req,BrandsModel)
    res.status(200).json(Result)
}


exports.UpdateBrand=async (req, res) => {
    let Result=await UpdateService(req,BrandsModel)
    res.status(200).json(Result)
}



exports.BrandList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{BrandName: SearchRgx}]
    let Result= await ListService(req,BrandsModel,SearchArray)
    res.status(200).json(Result)
}


exports.BrandDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,BrandsModel)
    res.status(200).json(Result)
}


exports.BrandDropDown=async (req, res) => {
    let Result= await DropDownService(req,BrandsModel,{_id:1,BrandName:1})
    res.status(200).json(Result)
}



exports.DeleteBrand=async (req, res) => {
    let deleteId=req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate = await CheckAssociateService(req, res,{BrandID:ObjectId(deleteId)},ProductsModel);
    if(CheckAssociate){
        res.status(403).json({message:"associate", data: "associated with Product"})
    }else{
        await DeleteService(req, res, BrandsModel);
    }
}







