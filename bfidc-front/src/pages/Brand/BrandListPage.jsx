import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const BrandList = React.lazy(() => import('../../components/Brand/BrandList'));


const BrandListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <BrandList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default BrandListPage;