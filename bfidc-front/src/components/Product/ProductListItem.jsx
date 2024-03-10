import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {DeleteAlert} from "../../helper/DeleteAlert.js";
import {DeleteProductRequest, ProductListRequest} from "../../ApiServices/ProductApiRequest.js";
import {useDispatch} from "react-redux";
import {SetAddModalShow, SetExistUnit, SetMinusModalShow, SetProductID} from "../../redux/state-slice/modalSlice.js";
import AddModal from "../Modal/AddModal.jsx";
import MinusModal from "../Modal/MinusModal.jsx";

const ProductListItem = ({item, perPage, searchKeyword}) => {
    const {ProductName, Unit, Price, BrandName, CategoryName, _id } = item || {};
    const dispatch =useDispatch();


    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed === true) {
            let DeleteResult = await DeleteProductRequest(id);
            if (DeleteResult === true) {
                await ProductListRequest(1, perPage, searchKeyword);
            }
        }
    }




    return (
        <>

            <tr>
                <td><p className="text-xs text-start">{ProductName}</p></td>
                <td><p className="text-xs text-start">{Unit}</p></td>
                <td><p className="text-xs text-start">{Price}</p></td>
                <td><p className="text-xs text-start">{Number(Unit *Price)}</p></td>
                <td><p className="text-xs text-start">{BrandName}</p></td>
                <td><p className="text-xs text-start">{CategoryName}</p></td>
                <td>
                    <Link to={`/ProductUpdatePage/${_id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                        <AiOutlineEdit size={15} />
                    </Link>
                    <button onClick={DeleteItem.bind(this, _id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                        <AiOutlineDelete size={15} />
                    </button>
                </td>
                <td>
                    <button
                        onClick={()=>{
                            dispatch(SetProductID(_id))
                            dispatch(SetExistUnit(Unit))
                            dispatch(SetAddModalShow(true))
                        }}
                        className="btn btn-primary text-info btn-outline-light p-2 ml-3 mb-0 btn-sm"
                    >
                      Restock
                    </button>


                    <button
                        onClick={()=>{
                            dispatch(SetProductID(_id))
                            dispatch(SetExistUnit(Unit))
                            dispatch(SetMinusModalShow(true))
                        }}
                        className="btn btn-success text-danger btn-outline-light  p-2 mb-0 btn-sm ms-2"
                    >
                        Issue
                    </button>
                </td>
            </tr>

            <AddModal perPage={perPage} searchKeyword={searchKeyword}/>
            <MinusModal perPage={perPage} searchKeyword={searchKeyword}/>

        </>
    );
};

export default ProductListItem;