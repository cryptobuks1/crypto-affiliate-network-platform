import withdrawalModel from "../../models/withdrawal.model";

async function getWithdrawals(req, res) {
    try {
        const withdrawals = await withdrawalModel.getWithdrawals({});
        return res.json({
            message: `found ${withdrawals.length} withdrawals`,
            success: true,
            data: withdrawals
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default getWithdrawals;