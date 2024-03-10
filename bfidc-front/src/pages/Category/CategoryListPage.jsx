import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CategoryList = React.lazy(() => import('../../components/Category/CategoryList'));


const CategoryListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CategoryList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryListPage;