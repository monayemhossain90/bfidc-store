const GetAllProductsService = async (req, res, ProductsModel) => {
    try{
        let searchValue = req.params.searchKeyword;
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
        let SearchArray=[{ProductName: SearchRgx},{Unit: SearchRgx},{Price: SearchRgx},{Details: SearchRgx},{BrandName:SearchRgx},{CategoryName:SearchRgx}]
        let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}};
        let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}};
        let Projection = {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1,Price:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}


        let data;
        if (searchValue!=="0") {
            data = await ProductsModel.aggregate([
                JoinStage1,
                JoinStage2,
                Projection,
                {$match: {$or: SearchArray}},
            ])

        }
        else{
            data = await ProductsModel.aggregate([
                JoinStage1,
                JoinStage2,
                Projection
            ])
        }
        res.status(200).json({message:"success", data:data})
    }
    catch(error) {
        res.status(500).json({message:"error", data:error.toString()})
    }
}

module.exports=GetAllProductsService