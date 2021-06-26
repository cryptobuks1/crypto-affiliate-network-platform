import withdrawalModel from "../../models/withdrawal.model";

async function requestWithdrawal(req, res) {
    if (!req.body.asset) return res.json({
        message: 'missing asset',
        success: false,
        data: null
    });

    if (!req.body.amount || req.body.amount < 1) return res.json({
        message: 'amount too low',
        success: false,
        data: null
    });

    if (!req.body.walletAddr) return res.json({
        message: 'missing wallet address',
        success: false,
        data: null
    });

    try {
        const result = await withdrawalModel.requestWithdrawal({
            ...req.body,
            belongsTo: req.session.uid
        });

        return res.json({
            message: 'withdrawal requested',
            success: true,
            data: result
        });

    } catch (err) {
        return res.json({
            message: err,
            success: false,
            data: null
        });
    }
}

export default requestWithdrawal;