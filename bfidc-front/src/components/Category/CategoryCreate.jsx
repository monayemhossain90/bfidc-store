import {Fragment, useRef} from 'react';
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";
import {CreateCategoryRequest} from "../../ApiServices/CategoryApiRequest";

const CategoryCreate = () => {

    let categoryNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();

    const SaveCategory = async () => {

        let categoryName = categoryNameRef.value.trim();
        if(IsEmpty(categoryName)){
            ErrorToast("Category Name is Required");
        }
        else{
            let result = await CreateCategoryRequest(categoryName,ProcessingBtnRef);
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
                                    <h5 >Save Category</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Category Name</label>
                                        <input ref={(input)=>categoryNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveCategory} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Create Category</button>
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

export default CategoryCreate;