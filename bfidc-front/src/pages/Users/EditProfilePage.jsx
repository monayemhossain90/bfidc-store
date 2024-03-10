import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
const EditProfile = React.lazy(() => import('../../components/Users/EditProfile/EditProfile'));


const EditProfilePage = () => {
    return (
        <Fragment>
            <SidebarMenu>
                <Suspense fallback={LazyLoader}>
                    <EditProfile/>
                </Suspense>
            </SidebarMenu>
        </Fragment>
    );
};

export default EditProfilePage;