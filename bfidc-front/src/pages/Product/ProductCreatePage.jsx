import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ProductCreate = React.lazy(() => import('../../components/Product/ProductCreate'));

const ProductCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ProductCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProductCreatePage;