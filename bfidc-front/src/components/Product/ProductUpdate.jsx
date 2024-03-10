import {Fragment, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {
    selectProductBrandDropDown,
    selectProductCategoryDropDown
} from "../../redux/state-slice/productSlice";
import {
    FillProductFormRequest,
    ProductBrandDropDownRequest,
    ProductCategoryDropDownRequest, UpdateProductRequest
} from "../../ApiServices/ProductApiRequest";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";

const ProductUpdate = ({id}) => {

    let productNameRef,brandIdRef, categoryIdRef, unitRef,priceRef, detailsRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    const {ProductName, CategoryID, BrandID, Unit, Price, Details} = useSelector((state)=> state.product.ProductData) || {};
    let ProductBrandDropDown = useSelector(selectProductBrandDropDown);
    let ProductCategoryDropDown = useSelector(selectProductCategoryDropDown);



    useEffect(()=>{
        (async () => {
           await ProductCategoryDropDownRequest();
           await ProductBrandDropDownRequest();
           await FillProductFormRequest(id);
        })();
    },[id])



    const SaveChange = async () => {
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
            let result = await UpdateProductRequest(productName,brandID,categoryID,unit,price,details,id,ProcessingBtnRef);
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
                                    <h5 >Update Product</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Name</label>
                                        <input key={Date.now()} defaultValue={ProductName} ref={(input)=>productNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>


                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Brand</label>
                                        <select key={Date.now()}  ref={(select)=>brandIdRef=select} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ProductBrandDropDown.map((item,i)=>{
                                                    return( <option selected={item._id === BrandID} key={i.toLocaleString()} value={item._id}>{item.BrandName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Category</label>
                                        <select key={Date.now()} ref={(select)=>categoryIdRef=select} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ProductCategoryDropDown.map((item,i)=>{
                                                    return( <option selected={item._id === CategoryID} key={i.toLocaleString()} value={item._id}>{item.CategoryName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-4 p-2">
                                        <label className="form-label">Unit</label>
                                        <input key={Date.now()} defaultValue={Unit} ref={(input)=>unitRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Price</label>
                                        <input key={Date.now()} defaultValue={Price} ref={(input)=>priceRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Details</label>
                                        <input key={Date.now()} defaultValue={Details} ref={(input)=>detailsRef=input} className="form-control form-control-sm" type="text"/>
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

export default ProductUpdate;