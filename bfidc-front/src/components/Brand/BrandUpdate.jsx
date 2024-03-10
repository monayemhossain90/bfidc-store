import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {FillBrandFormRequest, UpdateBrandRequest} from "../../ApiServices/BrandApiRequest";
import {useSelector} from "react-redux";
import {selectBrandName} from "../../redux/state-slice/brandSlice";
import {useEffect, useRef} from "react";

const BrandUpdate = ({id}) => {
    let brandNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();

    useEffect(()=>{
        (async () => {
            await FillBrandFormRequest(id);
        })();
    },[id])



    let BrandName = useSelector(selectBrandName);

    const SaveChange = async () => {
        let brandName = brandNameRef.value.trim();
        if(IsEmpty(brandName)){
            ErrorToast("Brand Name is Required");
        }
        else{
            let result = await UpdateBrandRequest(brandName,id,ProcessingBtnRef);
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
                                    <h5>Update Brand</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Brand Name</label>
                                        <input key={Date.now()} defaultValue={BrandName} ref={(input)=>brandNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Save Change</button>
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

export default BrandUpdate;