import withdrawalModel from "../../models/withdrawal.model";

async function cancelWithdrawal(req, res) {
    if (!req.body.id) return res.json({
        message: 'missing withdrawal id',
        success: false,
        data: null
    });

    try {
        await withdrawalModel.cancelWithdrawal(req.body.id, req.session.uid);
        return res.json({
            message: 'withdrawal canceled',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default cancelWithdrawal;