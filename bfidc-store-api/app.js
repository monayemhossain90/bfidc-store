//Basic Import
require('dotenv').config();

const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');





//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require("morgan");
const cors = require('cors');

//Database Library Import
const mongoose = require('mongoose');


//Security Middleware Implementation
app.use(morgan("dev"));
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())


//RequestBodySizeIncrease//Body Parser Implementation
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));



//Request Rate Limit Implementation

const Limiter = rateLimit({
      windowMs: 15 * 60 * 1000,   //15 Minutes
      max: 300000000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
mongoose.set('strictQuery', false);

let uri = process.env.MONGO_URI;
let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};


mongoose.connect(uri,option, (error)=>{
      if (error) {
            console.error("Connection Error:", error);
      } else {
            console.log("Connection Success");
      }
});




//Managing Back-end Routing// Back-end Routing Implementation
app.use('/api/v1', router);



//Undefined Route
app.use('*',(req,res)=>{

      res.status(404).json({status:"Fail", data:"Not Found"});
});


module.exports=app;