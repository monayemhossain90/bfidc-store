import {Fragment, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {selectProductBrandDropDown, selectProductCategoryDropDown} from "../../redux/state-slice/productSlice";
import {
    CreateProductRequest,
    ProductBrandDropDownRequest,
    ProductCategoryDropDownRequest
} from "../../ApiServices/ProductApiRequest";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";

const ProductCreate = () => {
    let productNameRef,brandIdRef, categoryIdRef, unitRef,priceRef,detailsRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();

    useEffect(()=>{
        (async () => {
           await ProductCategoryDropDownRequest();
           await ProductBrandDropDownRequest();
        })();
    },[])



    let ProductBrandDropDown = useSelector(selectProductBrandDropDown);
    let ProductCategoryDropDown = useSelector(selectProductCategoryDropDown);


    const SaveProduct = async () => {
        let productName = productNameRef.value.trim();
        let brandID = brandIdRef.value.trim();
        let categoryID = categoryIdRef.value.trim();
        let unit = unitRef.value.trim();
        let price = priceRef.value.trim();
        let details = detailsRef.value.trim();

        if(IsEmpty(productName)){
            ErrorToast("Product Name Required !")
        }
        else if(IsEmpty(brandID)){
            ErrorToast("Product Brand Required !")
        }
        else if(IsEmpty(categoryID)){
            ErrorToast("Product Category Required !")
        }
        else if(IsEmpty(unit)){
            ErrorToast("Product Unit Required !")
        }
        else if(IsEmpty(price)){
            ErrorToast("Product Price Required !")
        }
        else if(IsEmpty(details)){
            ErrorToast("Product Details Required !")
        }
        else{
            let result = await CreateProductRequest(productName,brandID,categoryID,unit, price,details,ProcessingBtnRef);
            if(result===true){
                navigate('/ProductListPage');
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
                                    <h5 >Save New Product</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Name</label>
                                        <input ref={(input)=>productNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>


                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Brand</label>
                                        <select ref={(select)=>brandIdRef=select} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ProductBrandDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.BrandName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Category</label>
                                        <select ref={(select)=>categoryIdRef=select} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ProductCategoryDropDown.map((item,i)=>{
                                                    return( <option  key={i.toLocaleString()} value={item._id}>{item.CategoryName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-4 p-2">
                                        <label className="form-label">Unit</label>
                                        <input ref={(input)=>unitRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Price</label>
                                        <input ref={(input)=>priceRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Details</label>
                                        <input ref={(input)=>detailsRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveProduct} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Create Product</button>
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

export default ProductCreate;