const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {

       UserEmail:{
           type:String
       },
       CategoryName:{
           type:String,
           unique:true
       },
    },
    { timestamps: true, versionKey:false}
);
const CategoriesModel=mongoose.model('categories',DataSchema);
module.exports=CategoriesModel