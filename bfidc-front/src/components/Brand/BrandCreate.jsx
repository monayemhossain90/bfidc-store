import {useRef} from 'react';
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {CreateBrandRequest} from "../../ApiServices/BrandApiRequest";
import {useNavigate} from "react-router-dom";

const BrandCreate = () => {

    let brandNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();



    const SaveBrand = async () => {
        let brandName = brandNameRef.value.trim();
        if(IsEmpty(brandName)){
            ErrorToast("Brand Name is Required");
        }
        else{
           let result = await CreateBrandRequest(brandName,ProcessingBtnRef);
           if(result === true){
               navigate('/BrandListPage');
           }
        }
    }



    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Save Brand</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Brand Name</label>
                                        <input ref={(input)=>brandNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveBrand} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Brand Create</button>
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

export default BrandCreate;