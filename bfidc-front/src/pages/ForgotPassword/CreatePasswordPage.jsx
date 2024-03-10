import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const CreatePassword = React.lazy(() => import('../../components/ForgotPassword/CreatePassword'));

const CreatePasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={LazyLoader}>
                <CreatePassword/>
            </Suspense>
        </Fragment>
    );
};

export default CreatePasswordPage;