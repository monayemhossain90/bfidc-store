const SearchProductByDateService = async (req, res, ProductsModel) => {
   try{

       const date = req.params.date;
       const from = `${date}T00:00:00.000+00:00`;
       const to = `${date}T23:59:59.999+00:00`;


       let data=await  ProductsModel.aggregate([
           {$match: {createdAt:{$gte:new Date(from),$lte:new Date(to)}}},
           {$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "Brands"}},
           {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "Categories"}},
           {$project:{_id:1, UserEmail:1, ProductName:1, Unit:1,Price:1, CategoryID:1, BrandID:1, Details:1, createdAt:1, updatedAt:1, BrandName:{$first:"$Brands.BrandName"}, CategoryName:{$first:"$Categories.CategoryName"}}}

       ])

       res.status(200).json({status: "success", data: data});

   }
   catch(error){
       res.status(500).json({status: "fail", data: error.toString()});
   }
}

module.exports = SearchProductByDateService