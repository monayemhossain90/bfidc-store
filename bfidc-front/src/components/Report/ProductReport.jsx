import {useRef} from 'react';
import {useSelector} from "react-redux";
import moment from "moment/moment";
import exportFromJSON from "export-from-json";
import CurrencyFormat from "react-currency-format";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {selectProductReportDataList} from "../../redux/state-slice/productSlice.js";
import {ProductReportByDateRequest} from "../../ApiServices/ReportApiRequest.js";

const ProductReport = () => {
    let fromRef,toRef=useRef();
    const DataList = useSelector(selectProductReportDataList)

    const CreateReport = async () => {
        let fromDate = fromRef.value;
        console.log(fromDate)
        let toDate = toRef.value;
        if (IsEmpty(fromDate)) {
            ErrorToast("From Date Required")
        } else if (IsEmpty(toDate)) {
            ErrorToast("To Date Required")
        } else {
             await ProductReportByDateRequest(fromDate,toDate);
        }
    }

    const OnExport = (exportType,data) => {
        const fileName = 'PurchaseReport'
        if(data.length>0){
            let ReportData=[]
            data.map((item)=>{
                let listItem={
                    "Product":item['ProductName'],
                    "Unit":item['Unit'],
                    "Price": item['Price'],
                    "Brand": item['BrandName'],
                    "Category": item['CategoryName'],
                    "Date":moment(item['createdAt']).format('MMMM Do YYYY')
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5 >Product Report by Date</h5>
                                <hr className="bg-light"/>

                                <div className="col-4 p-2">
                                    <label className="form-label">Date Form:</label>
                                    <input  ref={(input)=>fromRef=input} className="form-control form-control-sm" type="date"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Date To:</label>
                                    <input  ref={(input)=>toRef=input} className="form-control form-control-sm" type="date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    <button onClick={CreateReport} className="btn btn-sm my-3 btn-success">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    DataList.length>0?(
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            {/*<h6>Total: {DataList[0]['Total'].length>0?<CurrencyFormat value={DataList[0]['Total'][0]['TotalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$ '} />:0} </h6>*/}
                                            <button onClick={OnExport.bind(this,'csv',DataList)}  className="btn btn-sm my-2 btn-success">Download CSV</button>
                                            <button onClick={OnExport.bind(this,'xls',DataList)}   className="btn btn-sm my-2 ms-2 btn-success">Download XLS</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div>
    );
};

export default ProductReport;