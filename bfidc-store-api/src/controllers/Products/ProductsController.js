const ProductsModel = require("../../models/Products/ProductsModel");
const CreateService = require("../../services/common/CreateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");
const ProductReportService = require("../../services/report/ProductReportService");
const UpdateProductService = require("../../services/product/UpdateProductService");
const GetAllProductsService = require("../../services/product/GetAllProductsService");
const SearchProductByDateService = require("../../services/product/SearchProductByDateService");


exports.CreateProduct=async (req, res) => {
    let Result= await CreateService(req,ProductsModel);
    res.status(200).json(Result)
}

exports.UpdateProduct=async (req, res) => {
    await UpdateProductService(req,res,ProductsModel);
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}};
    let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}};
   let Projection = {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1,Price:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}

    let SearchArray=[{ProductName: SearchRgx},{Unit: SearchRgx},{Price: SearchRgx},{Details: SearchRgx},{BrandName:SearchRgx},{CategoryName:SearchRgx}]
    let Result=await ListTwoJoinService(req,ProductsModel,SearchArray,JoinStage1,JoinStage2,Projection);
    res.status(200).json(Result)
}


exports.ProductsDetailsByID=async (req, res) => {
    let Result= await DetailsByIDService(req,ProductsModel)
    res.status(200).json(Result)
}


exports.DeleteProduct=async (req, res) => {
  await DeleteService(req,res,ProductsModel);
}




exports.ProductsDropDown=async (req, res) => {
    let Result= await DropDownService(req,ProductsModel,{_id:1,ProductName:1})
    res.status(200).json(Result)
}



exports.ProductsReportByDate=async (req, res) => {
    await ProductReportService(req,res)
}

exports.GetAllProducts=async (req, res) => {
    await GetAllProductsService(req,res, ProductsModel)
}


exports.SearchProductByDate=async (req, res) => {
    await SearchProductByDateService(req,res, ProductsModel)
}

