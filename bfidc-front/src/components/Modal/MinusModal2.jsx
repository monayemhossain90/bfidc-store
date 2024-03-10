import {useDispatch, useSelector} from "react-redux";
import {
    selectExistUnit,
    selectMinusModalShow, selectMinusModalShow2, selectProductID,
    SetMinusModalShow, SetMinusModalShow2,
} from "../../redux/state-slice/modalSlice.js";
import {Modal} from "react-bootstrap";
import {useState} from "react";
import {ErrorToast} from "../../helper/ValidationHelper.js";
import {GetAllProductsRequest,UpdateStockRequest} from "../../ApiServices/ProductApiRequest.js";

const MinusModal2 = ({searchKeyword}) => {
    const dispatch = useDispatch();
    const MinusModalShow = useSelector(selectMinusModalShow2);
    const ProductID = useSelector(selectProductID);
    const ExistUnit = useSelector(selectExistUnit);
    const [unit, setUnit] = useState(0);



    const handleCancel = () => {
        dispatch(SetMinusModalShow2(false))
    };


    ///Update issues & Product
    const UpdateStock = async () => {
        if(unit < 1){
            ErrorToast("Stock is minimum 1 required");
        }else{
            let result = await UpdateStockRequest(Number(ExistUnit-unit),ProductID);
            if(result===true){
                setUnit(0);
                dispatch(SetMinusModalShow2(false))
                await GetAllProductsRequest(searchKeyword);
            }
        }
    }




    return (
        <>

            <Modal size="md" show={MinusModalShow} onHide={handleCancel} >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                    <h3 className="text-center mb-3">Issue Product Unit</h3>
                    <div className="text-center">
                        <input  value={unit} onChange={(e)=>setUnit(e.target.value)} className="w-50 px-3" type="number"/>
                        <div className=" d-flex justify-content-center mt-3">
                            <button onClick={()=>handleCancel()} className="btn btn-sm btn-danger">Cancel</button>
                            <button onClick={UpdateStock} className="btn btn-sm btn-secondary mx-2">Issue</button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default MinusModal2;