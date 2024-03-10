import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SignUpVerifyOTP = React.lazy(() => import('../../components/Users/SignUpVerifyOTP/SignUpVerifyOTP'));

const SignUpVerifyOtpPage = () => {
    return (
        <Fragment>
            <Suspense fallback={LazyLoader}>
                <SignUpVerifyOTP/>
            </Suspense>
        </Fragment>
    );
};

export default SignUpVerifyOtpPage;