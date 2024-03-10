import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
const ChangePassword = React.lazy(() => import('../../components/Users/ChangePassword/ChangePassword'));


const ChangePasswordPage = () => {
    return (
        <Fragment>
          <SidebarMenu>
              <Suspense fallback={LazyLoader}>
                  <ChangePassword/>
              </Suspense>
          </SidebarMenu>
        </Fragment>
    );
};

export default ChangePasswordPage;