import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {selectLoader} from "../../redux/state-slice/settingsSlice";
const FullscreenLoader = () => {
    const settings = useSelector(selectLoader);
    return (
        <Fragment>
            <div  className={settings + " LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"/>
                </div>
            </div>
        </Fragment>
    );
};
export default FullscreenLoader;