const ProductsModel = require("../../models/Products/ProductsModel");
const ProductReportService= async (req, res) => {
    try{

        let UserEmail=req.headers['email'];
        let FromDate=  req.body['FromDate']
        let ToDate=  req.body['ToDate']

        let data=await  ProductsModel.aggregate([
            {$match: {createdAt:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}},
            {$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}},
            {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}},
            {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1,Price:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}

        ])

        res.status(200).json({status: "success", data: data});

    }
    catch (error) {
        res.status(500).json({status: "fail", data: error.toString()});
    }
}
module.exports=ProductReportService