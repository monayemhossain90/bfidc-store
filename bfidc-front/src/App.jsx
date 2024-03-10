import LoginPage from "./pages/Users/LoginPage.jsx";
import BrandCreatePage from "./pages/Brand/BrandCreatePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryCreatePage from "./pages/Category/CategoryCreatePage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import BrandListPage from "./pages/Brand/BrandListPage.jsx";
import BrandUpdatePage from "./pages/Brand/BrandUpdatePage.jsx";
import CategoryUpdatePage from "./pages/Category/CategoryUpdatePage.jsx";
import CategoryListPage from "./pages/Category/CategoryListPage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";
import EditProfilePage from "./pages/Users/EditProfilePage.jsx";
import ChangePasswordPage from "./pages/Users/ChangePasswordPage.jsx";
import ProductCreatePage from "./pages/Product/ProductCreatePage.jsx";
import ProductListPage from "./pages/Product/ProductListPage.jsx";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader.jsx";
import ProductUpdatePage from "./pages/Product/ProductUpdatePage.jsx";
import Page404 from "./pages/NotFound/Page404.jsx";
import SignUpPage from "./pages/Users/SignUpPage.jsx";
import SignUpVerifyOtpPage from "./pages/Users/SignUpVerifyOtpPage.jsx";
import SendOtpPage from "./pages/ForgotPassword/SendOtpPage.jsx";
import VerifyOtpPage from "./pages/ForgotPassword/VerifyOtpPage.jsx";
import CreatePasswordPage from "./pages/ForgotPassword/CreatePasswordPage.jsx";
import ProductReportPage from "./pages/Report/ProductReportPage.jsx";


const App = () => {
    return (
        <>

          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
                  <Route exact path="/Profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
                  <Route exact path="/EditProfile" element={<PrivateRoute><EditProfilePage/></PrivateRoute>} />
                  <Route exact path="/ChangePassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>} />


                  <Route exact path="/CategoryCreatePage" element={<PrivateRoute><CategoryCreatePage/></PrivateRoute>} />
                  <Route exact path="/CategoryUpdatePage/:id" element={<PrivateRoute><CategoryUpdatePage/></PrivateRoute>} />
                  <Route exact path="/CategoryListPage" element={<PrivateRoute><CategoryListPage/></PrivateRoute>} />

                  <Route exact path="/ProductCreatePage" element={<PrivateRoute><ProductCreatePage/></PrivateRoute>} />
                  <Route exact path="/ProductUpdatePage/:id" element={<PrivateRoute><ProductUpdatePage/></PrivateRoute>} />
                  <Route exact path="/ProductListPage" element={<PrivateRoute><ProductListPage/></PrivateRoute>} />


                  <Route path="/BrandCreatePage" element={<PrivateRoute><BrandCreatePage/></PrivateRoute>}/>
                  <Route path="/BrandUpdatePage/:id" element={<PrivateRoute><BrandUpdatePage/></PrivateRoute>}/>
                  <Route exact path="/BrandListPage" element={<PrivateRoute><BrandListPage/></PrivateRoute>} />


                  <Route exact path="/ProductReportPage" element={<PrivateRoute><ProductReportPage/></PrivateRoute>} />


                  <Route path="*" element={<Page404/>}/>

                  <Route exact path="/Login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
                  <Route exact path="/SignUp" element={<PublicRoute><SignUpPage/></PublicRoute>} />
                  <Route exact path="/SignUpVerifyOTP" element={<PublicRoute><SignUpVerifyOtpPage/></PublicRoute>} />
                  <Route exact path="/SendOTP" element={<PublicRoute><SendOtpPage/></PublicRoute>} />
                  <Route exact path="/VerifyOTP" element={<PublicRoute><VerifyOtpPage/></PublicRoute>} />
                  <Route exact path="/CreatePassword" element={<PublicRoute><CreatePasswordPage/></PublicRoute>} />
              </Routes>
          </BrowserRouter>
            <FullscreenLoader/>

        </>
    );
};

export default App;