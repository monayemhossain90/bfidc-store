
const PurchaseReportService = require("../../services/report/PurchaseReportService");



exports.PurchaseByDate=async (req, res) => {
    let Result=await PurchaseReportService(req)
    res.status(200).json(Result)
}

