import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ProductList = React.lazy(() => import('../../components/Product/ProductList'));


const ProductListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ProductList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};
export default ProductListPage;