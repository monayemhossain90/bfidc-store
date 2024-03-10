const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
       UserEmail:{type:String},
       CategoryID:{type:mongoose.Schema.Types.ObjectId},
       BrandID:{type:mongoose.Schema.Types.ObjectId},
       ProductName:{type:String},
       Unit:{type:Number},
       Price:{type:Number},
       Details:{type:String},
    },
    { timestamps: true, versionKey:false}
);
const ProductsModel=mongoose.model('products',DataSchema);
module.exports=ProductsModel