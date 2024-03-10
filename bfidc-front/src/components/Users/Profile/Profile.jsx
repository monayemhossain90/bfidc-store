import {AiOutlineEdit} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {SelectProfileDetailsRequest} from "../../../ApiServices/UsersAPIRequest";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const Profile = () => {
    const {email, firstName, lastName, photo, mobile} = useSelector((state)=>state.profile.ProfileData) || {};

    useEffect(()=>{
        (async () => {
            await SelectProfileDetailsRequest();
        })();
    },[])




    return (
        <>
            <title>{}</title>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid text-center">
                                    <img className="icon-nav-img-lg" src={photo} alt=""/>
                                    <hr/>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-12 p-2">
                                             <h6 className="textAlign">
                                                 <span className="profileTxtSize1">Name</span> :
                                                 {firstName} {lastName}
                                             </h6>
                                        </div>
                                        <div className="col-md-12 p-2">
                                          <h6 className="textAlign">
                                              <span className="profileTxtSize1"> Email</span> : {email}
                                          </h6>
                                        </div>
                                        <div className="col-md-12 p-2">
                                           <h6 className="textAlign"> <span className="profileTxtSize1"> Mobile</span> :
                                               {mobile}
                                            </h6>
                                        </div>
                                        <div className="row col-md-12 p-0 mt-3">
                                            <div className="col-md-6 p-0 mt-3">
                                                <NavLink to="/EditProfile"  end>
                                                    <button className="btn btn-secondary btnCapitalize"><AiOutlineEdit className="side-bar-item-icon text-white"/>Edit Profile</button>
                                                </NavLink>
                                            </div>
                                            <div className="col-md-6 p-0 mt-3">
                                                <NavLink to="/ChangePassword"  end>
                                                    <button className="btn btn-primary btnCapitalize">  <AiOutlineEdit className="side-bar-item-icon text-white"/>Change Password</button>
                                                </NavLink>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;