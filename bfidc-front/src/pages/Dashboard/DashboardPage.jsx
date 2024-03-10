import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const Dashboard = React.lazy(() => import('../../components/Dashboard/Dashboard'));

const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;