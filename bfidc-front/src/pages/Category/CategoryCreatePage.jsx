import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CategoryCreate = React.lazy(() => import('../../components/Category/CategoryCreate'));

const CategoryCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CategoryCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryCreatePage;