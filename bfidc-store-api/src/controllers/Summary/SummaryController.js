
const PurchaseSummaryService = require("../../services/summary/PurchaseSummaryService");


exports.PurchaseSummary=async (req, res) => {
    let Result=await PurchaseSummaryService(req)
    res.status(200).json(Result)
}

