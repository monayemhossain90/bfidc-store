
require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = () => {

    let uri = process.env.MONGO_URI;
    //let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};

    mongoose.connect(uri).then((res)=>{
        console.log("Connection Success");
    }).catch((error)=>{
        console.log("Connection Failed");
        console.log(error);
    })

}


module.exports=dbConnect;