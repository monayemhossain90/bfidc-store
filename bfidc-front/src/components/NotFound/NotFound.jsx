import React, {Fragment} from 'react';
import PageImg from "../../assets/images/404.png";
const NotFound = () => {
    return (
        <Fragment>
            <div className="center-screen">
                <img className="animated fadeIn" src={PageImg} alt=""/>
            </div>
        </Fragment>
    );
};

export default NotFound;