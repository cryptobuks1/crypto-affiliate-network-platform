import earningsModel from '../../models/earnings.model';

async function myEarnings(req, res) {
    try {
        const earnings = await earningsModel.myEarnings(req.session.uid);
        return res.json({
            message: 'found your earnings',
            success: true,
            data: earnings
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default myEarnings;