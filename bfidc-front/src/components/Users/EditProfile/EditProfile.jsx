import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    ErrorToast,
    getBase64,
    IsEmail,
    IsEmpty,
    IsMobile,
} from "../../../helper/ValidationHelper";
import {ProfileUpdateRequest, SelectProfileDetailsRequest} from "../../../ApiServices/UsersAPIRequest";
import {Fragment, useEffect, useRef} from "react";

const EditProfile = (props) => {
    let emailRef, firstNameRef, lastNameRef, mobileRef, userImgPreviewRef,userImgRef,ProcessingBtnRef = useRef();
    const {email, firstName, lastName, photo, mobile} = useSelector((state)=>state.profile.ProfileData) || {};
    const navigate = useNavigate();


    useEffect(()=>{
        (async () => {
            await SelectProfileDetailsRequest();
        })();
    },[])


    const PreviewImage = () => {
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=> {
            userImgPreviewRef.src=base64Img;
        })
    }




    const UpdateMyProfile = async () => {

        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let photo = userImgPreviewRef.src;

        if(IsEmail(email)){
            ErrorToast("Valid Email Adress Required!");
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required!");
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required!");
        }
        else if(IsEmpty(mobile)){
            ErrorToast("Mobile Number Required!");
        }
        else if(IsMobile(mobile)){
            ErrorToast("Valid Mobile Number Required!");
        }
        else{

          let Result = await  ProfileUpdateRequest(email,firstName,lastName,mobile,photo,ProcessingBtnRef);
                if(Result===true){
                    navigate('/Profile');
                }
        }
    }






    return (
        <Fragment>
            <title>{props.title}</title>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="text-center">
                                    <img ref={(input)=>userImgPreviewRef=input} className="icon-nav-img-lg" src={photo} alt=""/>
                                    </div>
                                    <hr/>
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Profile Picture</label>
                                            <input onChange={PreviewImage} ref={(input)=>userImgRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Email Address</label>
                                            <input key={Date.now()} readOnly={true} defaultValue={email} ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>First Name</label>
                                            <input key={Date.now()} defaultValue={firstName} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Last Name</label>
                                            <input key={Date.now()} defaultValue={lastName} ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Mobile</label>
                                            <input key={Date.now()} defaultValue={mobile} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <button onClick={UpdateMyProfile} ref={(button)=>ProcessingBtnRef=button}  className="btn w-100 float-end btnBackground animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditProfile;