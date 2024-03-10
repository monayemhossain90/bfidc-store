import {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CurrencyFormat from 'react-currency-format';
import {selectProducts, selectStoreValue} from "../../redux/state-slice/productSlice.js";
import {AiFillDelete} from "react-icons/ai";
import {Table} from "antd";
import {
    DeleteProductRequest,
    GetAllProductsRequest,
    SearchProductsByDateRequest
} from "../../ApiServices/ProductApiRequest.js";
import {FaRegEdit} from "react-icons/fa";
import {BsCart4} from "react-icons/bs";
import {TbCoinTaka} from "react-icons/tb";
import {RxDashboard} from "react-icons/rx";
import {CategoryListRequest} from "../../ApiServices/CategoryApiRequest.js";
import {selectCategoryList} from "../../redux/state-slice/categoryslice.js";
import {DeleteAlert} from "../../helper/DeleteAlert.js";
import {useNavigate} from "react-router-dom";
import {
    SetAddModalShow2,
    SetExistUnit,
    SetMinusModalShow2,
    SetProductID
} from "../../redux/state-slice/modalSlice.js";
import AddModal2 from "../Modal/AddModal2.jsx";
import MinusModal2 from "../Modal/MinusModal2.jsx";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Quantity",
        dataIndex: "unit",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Total",
        dataIndex: "total",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
    {
        title: "Issues/Stock",
        dataIndex: "stock",
    },
];



const Dashboard = () => {
    const ProductList = useSelector(selectProducts);
    const CategoryList = useSelector(selectCategoryList);
    const StoreValue = useSelector(selectStoreValue);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState("0");


    useEffect(() => {
        (async () => {
            await GetAllProductsRequest(searchKeyword);
            await CategoryListRequest(1,1000,"0");
        })();
    }, [searchKeyword])




    //DeleteItem
    const DeleteItem = async (id) => {
        let Result = await DeleteAlert();
        if (Result.isConfirmed === true) {
            let DeleteResult = await DeleteProductRequest(id);
            if (DeleteResult === true) {
                await GetAllProductsRequest(searchKeyword);
            }
        }
    }





    const tableData = [];
    if(ProductList.length > 0){
        for (let i = 0; i < ProductList.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: ProductList[i]['ProductName'],
                brand: ProductList[i]['BrandName'],
                category: ProductList[i]['CategoryName'],
                unit: ProductList[i]['Unit'],
                price: ProductList[i]['Price'],
                total: ProductList[i]['Unit'] * ProductList[i]['Price'],
                action: (
                    <>
                        <button onClick={()=>navigate(`/ProductUpdatePage/${ProductList[i]['_id']}`)} className=" fs-3 text-success bg-transparent border-0">
                            <FaRegEdit />
                        </button>
                        <button onClick={()=>DeleteItem(ProductList[i]['_id'])} className=" fs-3 text-danger bg-transparent border-0">
                            <AiFillDelete />
                        </button>
                    </>
                ),
                stock: (
                    <>
                        <button
                            onClick={()=>{
                                dispatch(SetProductID(ProductList[i]['_id']))
                                dispatch(SetExistUnit(ProductList[i]['Unit']))
                                dispatch(SetAddModalShow2(true))
                            }}
                            className="btn btn-primary text-info  btn-outline-light p-2 ml-3 mb-0 btn-md"
                        >
                            Restock
                        </button>

                        <button
                            onClick={()=>{
                                dispatch(SetProductID(ProductList[i]['_id']))
                                dispatch(SetExistUnit(ProductList[i]['Unit']))
                                dispatch(SetMinusModalShow2(true))
                            }}
                            className="btn btn-success text-danger btn-outline-light  p-2 mb-0 btn-md ms-2"
                        >
                            Issue
                        </button></>
                )

            });
        }
    }


    const searchKeywordOnChange = async (e) => {
        setSearchKeyword(e.target.value)
        if ((e.target.value).length === 0) {
            setSearchKeyword("0")
            await GetAllProductsRequest("0");
        }
    }


    const ShowAllProducts = async () => {
        await GetAllProductsRequest("0");
    }


    //SearchProductByDate
    const handleSearchProductByDate = async (date) => {
        if(date !==""){
            await SearchProductsByDateRequest(date);
        }
    }


    return (
           <Fragment>
               <div className="container-fluid">
                   <div className="row">
                       <h3>Inventory States</h3>
                       <div className="col-md-4 p-2">
                           <div className="card products text-white">
                               <div className="card-body d-flex align-items-center gap-3">
                                   <BsCart4 size={30}/>
                                   <div className="">
                                       <span>Total Products</span>
                                       <br/>
                                       <span className="text-white" style={{fontSize:"20px"}}>
                                           {ProductList?.length || 0}
                                       </span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-4 p-2">
                           <div className="card store-value text-white">
                               <div className="card-body d-flex align-items-center gap-3">
                                   <TbCoinTaka size={30}/>
                                   <div className="">
                                       <span>Total Store Value</span>
                                       <br/>
                                       <span className="text-white" style={{fontSize:"20px"}}>
                                           <CurrencyFormat className="text-white" value={StoreValue || 0} displayType={'text'} thousandSeparator={true} prefix={'Tk '} />
                                       </span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-4 p-2">
                           <div className="card categories text-white">
                               <div className="card-body d-flex align-items-center gap-3">
                                   <RxDashboard size={30}/>
                                   <div className="">
                                       <span>All Categories</span>
                                       <br/>
                                       <span className="text-white" style={{fontSize:"20px"}}>
                                           {CategoryList?.length || 0}
                                       </span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="row mt-5">
                       <div className="col-12 d-flex align-items-center justify-content-between py-4">
                           <h3>Inventory Items</h3>
                           <div className="d-flex gap-5">
                               <div>
                                   <button onClick={ShowAllProducts} className="btn btn-success">Show all products</button>
                               </div>
                               <div>
                                   Search by date:
                                   <input
                                       onChange={(e)=>handleSearchProductByDate(e.target.value)}
                                       className="px-3 py-2 search-box"
                                       type="date"
                                   />
                               </div>
                               <div>
                                   <input value={searchKeyword==="0" ? "" : searchKeyword} onChange={searchKeywordOnChange} className="px-3 py-2 search-box" type="text" placeholder="Search by name"/>
                               </div>
                           </div>
                       </div>
                       <div className="col-12">
                           <Table columns={columns} dataSource={tableData} />
                       </div>
                   </div>
               </div>

               <AddModal2 searchKeyword={searchKeyword}/>
               <MinusModal2 searchKeyword={searchKeyword}/>
           </Fragment>
    );
};
export default Dashboard;