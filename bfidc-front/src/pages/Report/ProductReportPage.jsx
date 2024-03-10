import React, {Fragment, Suspense} from "react";
import MasterLayout from "../../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../../components/MasterLayout/LazyLoader.jsx";
const ProductReport = React.lazy(() => import('../../components//Report/ProductReport'));


const ProductReportPage = () => {
    return (
        <>
            <Fragment>
                <MasterLayout>
                    <Suspense fallback={LazyLoader}>
                        <ProductReport/>
                    </Suspense>
                </MasterLayout>
            </Fragment>
        </>
    );
};

export default ProductReportPage;