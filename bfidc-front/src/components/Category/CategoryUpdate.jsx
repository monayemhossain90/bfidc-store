import {Fragment, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {
    FillCategoryFormRequest,
    UpdateCategoryRequest
} from "../../ApiServices/CategoryApiRequest";
import {useSelector} from "react-redux";
import {selectCategoryName} from "../../redux/state-slice/categoryslice";

const CategoryUpdate = ({id}) => {

    let categoryNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    let CategoryName = useSelector(selectCategoryName);

    useEffect(()=>{
        (async () => {
           await FillCategoryFormRequest(id);
        })();

    },[id])





    const SaveChange = async () => {
        let categoryName = categoryNameRef.value.trim();
        if(IsEmpty(categoryName)){
            ErrorToast("Category Name is Required");
        }
        else{
            let result = await UpdateCategoryRequest(categoryName,id,ProcessingBtnRef);
            if(result === true){
                navigate('/CategoryListPage');
            }
        }
    }



    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Update Category</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Category Name</label>
                                        <input key={Date.now()} defaultValue={CategoryName} ref={(input)=>categoryNameRef=input} className="form-control form-control-sm" type="text"/>
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
        </Fragment>
    );
};

export default CategoryUpdate;