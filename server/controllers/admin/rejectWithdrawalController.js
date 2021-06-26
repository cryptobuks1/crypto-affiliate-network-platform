import withdrawalModel from '../../models/withdrawal.model';

async function rejectWithdrawal(req, res) {
    if (!req.body.id) return res.json({
        message: 'missing withdrawal id',
        success: false,
        data: null
    });
    try {
        await withdrawalModel.rejectWithdrawal(req.body.id);

        return res.json({
            message: 'withdrawal rejected',
            success: true,
            data: null
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

export default rejectWithdrawal;