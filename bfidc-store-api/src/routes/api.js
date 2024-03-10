const express =require('express');
const AuthVerifyMiddleware=require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");
const BrandsController = require("../controllers/Brands/BrandsController");
const CategoriesController = require("../controllers/Categories/CategoriesController");
const ProductsController = require("../controllers/Products/ProductsController");


const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});

//Users
router.post("/Registration",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.post("/ProfileUpdate",AuthVerifyMiddleware,UsersController.ProfileUpdate);
router.get("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails);

router.get("/SignUpEmailVerify/:email",UsersController.SignUpEmailVerify);
router.post('/SignUpVerifyOTP/:email/:otp',UsersController.SignUpVerifyOTP);

//ChangePassword
router.get("/ChangePassword/:currentPassword/:newPassword",AuthVerifyMiddleware, UsersController.ChangePassword);


//RecoverPassword
router.get("/ForgotPasswordVerifyEmail/:email",UsersController.ForgotPasswordVerifyEmail);
router.get("/ForgotPasswordVerifyOTP/:email/:otp",UsersController.ForgotPasswordVerifyOTP);
router.post("/CreateNewPassword",UsersController.CreateNewPassword);



//Brands
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
router.post("/UpdateBrand/:id", AuthVerifyMiddleware, BrandsController.UpdateBrand);
router.get("/BrandList/:pageNo/:perPage/:searchKeyword", AuthVerifyMiddleware,BrandsController.BrandList);
router.get("/BrandDropDown", AuthVerifyMiddleware, BrandsController.BrandDropDown);
router.delete("/DeleteBrand/:id",BrandsController.DeleteBrand);
router.get("/BrandDetailsByID/:id",BrandsController.BrandDetailsByID);



// Categories
router.post("/CreateCategory",AuthVerifyMiddleware,CategoriesController.CreateCategory);
router.post("/UpdateCategory/:id",AuthVerifyMiddleware,CategoriesController.UpdateCategory);
router.get("/CategoriesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,CategoriesController.CategoriesList);
router.get("/CategoriesDropDown",AuthVerifyMiddleware,CategoriesController.CategoriesDropDown);
router.delete("/DeleteCategory/:id",AuthVerifyMiddleware,CategoriesController.DeleteCategory);
router.get("/CategoryDetailsByID/:id",AuthVerifyMiddleware,CategoriesController.CategoryDetailsByID);





// Products
router.post("/CreateProduct",AuthVerifyMiddleware,ProductsController.CreateProduct);
router.post("/UpdateProduct/:id",AuthVerifyMiddleware,ProductsController.UpdateProduct);
router.get("/ProductsList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ProductsController.ProductsList);
router.delete("/DeleteProduct/:id",AuthVerifyMiddleware,ProductsController.DeleteProduct);
router.get("/ProductsDetailsByID/:id",AuthVerifyMiddleware,ProductsController.ProductsDetailsByID);
router.get("/ProductsDropDown",AuthVerifyMiddleware,ProductsController.ProductsDropDown);

router.post("/ProductsReportByDate",AuthVerifyMiddleware,ProductsController.ProductsReportByDate);
router.get("/GetAllProducts/:searchKeyword",AuthVerifyMiddleware,ProductsController.GetAllProducts);

router.get("/SearchProductByDate/:date",AuthVerifyMiddleware,ProductsController.SearchProductByDate);

















module.exports=router;

