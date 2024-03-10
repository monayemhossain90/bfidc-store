import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
const Profile = React.lazy(() => import('../../components/Users/Profile/Profile'));



const ProfilePage = () => {
    return (
        <Fragment>
            <SidebarMenu>
                <Suspense fallback={LazyLoader}>
                    <Profile/>
                </Suspense>
            </SidebarMenu>
        </Fragment>
    );
};

export default ProfilePage;