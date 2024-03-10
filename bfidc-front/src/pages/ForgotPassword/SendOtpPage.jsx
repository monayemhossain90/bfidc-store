import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendOTP = React.lazy(() => import('../../components/ForgotPassword/SendOTP'));


const SendOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={LazyLoader}>
                <SendOTP/>
            </Suspense>
        </Fragment>
    );
};

export default SendOtpPage;