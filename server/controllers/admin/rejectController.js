import requestsModel from '../../models/requests.model';

async function reject(req, res) {
    try {
        const result = await requestsModel.rejectRequest(req.body.id);
        return res.json({
            message: `request is ${result.status}`,
            success: true,
            data: result,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default reject;
