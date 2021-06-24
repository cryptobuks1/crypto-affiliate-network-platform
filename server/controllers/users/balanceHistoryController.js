import balanceHistoryModel from '../../models/balanceHistory.model';

async function balanceHistory(req, res) {
    try {
        const history = await balanceHistoryModel.getHistory({
            belongsTo: req.session.uid,
        });
        return res.json({
            message: 'found something',
            success: true,
            data: history,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default balanceHistory;
