import React, {Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const BrandCreate = React.lazy(() => import('../../components/Brand/BrandCreate'));


const BrandCreatePage = () => {
    return (
        <>
           <MasterLayout>
               <Suspense fallback={LazyLoader}>
                   <BrandCreate/>
               </Suspense>
           </MasterLayout>
        </>
    );
};

export default BrandCreatePage;