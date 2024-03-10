import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const VerifyOTP = React.lazy(() => import('../../components/ForgotPassword/VerifyOTP'));


const VerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={LazyLoader}>
                <VerifyOTP/>
            </Suspense>
        </Fragment>
    );
};

export default VerifyOtpPage;