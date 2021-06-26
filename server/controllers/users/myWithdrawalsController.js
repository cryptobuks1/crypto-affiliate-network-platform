import withdrawalModel from "../../models/withdrawal.model";

async function myWithdrawals(req, res) {
    try {
        const withdrawals = await withdrawalModel.getWithdrawals({ belongsTo: req.session.uid });
        return res.json({
            message: 'found your withdrawals',
            success: true,
            data: withdrawals
        });

    } catch (err) {
        console.log(err);

        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default myWithdrawals;