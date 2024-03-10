import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import {useParams} from "react-router-dom";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const BrandUpdate = React.lazy(() => import('../../components/Brand/BrandUpdate'));

const BrandUpdatePage = () => {

    const params = useParams();

    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <BrandUpdate id={params['id']}/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default BrandUpdatePage;