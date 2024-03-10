const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
        UserEmail:{
            type:String
        },
        BrandName:{
            type:String,
            unique:true
        },

    },
    { timestamps: true, versionKey:false}
);
const BrandsModel=mongoose.model('brands',DataSchema);
module.exports=BrandsModel