const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema(
    {
       UserEmail:{type:String},
       SupplierName:{type:String},
       Phone:{type:String,unique:true},
       Email:{type:String,unique:true},
       Address:{type:String},
    },
    { timestamps: true, versionKey:false}
);
const SuppliersModel=mongoose.model('suppliers',DataSchema);
module.exports=SuppliersModel