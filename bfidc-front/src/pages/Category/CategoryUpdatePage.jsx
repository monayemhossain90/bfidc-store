import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import {useParams} from "react-router-dom";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CategoryUpdate = React.lazy(() => import('../../components/Category/CategoryUpdate'));
const CategoryUpdatePage = () => {

    const params = useParams();

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CategoryUpdate id={params['id']}/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CategoryUpdatePage;