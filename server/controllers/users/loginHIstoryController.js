import loginHistoryModel from "../../models/loginHistory.model";

async function getLoginHistory(req, res) {
    try {
        const history = await loginHistoryModel.getMyHistory(req.session.uid);
        return res.json({
            message: 'found your history',
            success: true,
            data: history
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default getLoginHistory;