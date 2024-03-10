import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Login = React.lazy(() => import('../../components/Users/Login/Login'));

const LoginPage = () => {
    return (
        <Fragment>
           <Suspense fallback={LazyLoader}>
               <Login/>
           </Suspense>
        </Fragment>
    );
};

export default LoginPage;