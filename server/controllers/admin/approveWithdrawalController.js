import withdrawalModel from '../../models/withdrawal.model';

async function approveWithdrawal(req, res) {
    if (!req.body.id) return res.json({
        message: 'missing withdrawal id',
        success: false,
        data: null
    });
    try {
        await withdrawalModel.approveWithdrawal(req.body.id);

        return res.json({
            message: 'withdrawal approved',
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

export default approveWithdrawal;