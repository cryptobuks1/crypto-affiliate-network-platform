import requestsModel from '../../models/requests.model';

async function getRequestsSliceController(req, res) {
    let filter = {};

    if (req.params.status !== 'all') {
        filter = { status: req.params.status };
    }

    try {
        const requests = await requestsModel.findRequestsSlice(filter, parseInt(req.params.slice));
        return res.json({
            message: `found ${requests.length} requests`,
            success: true,
            data: requests,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default getRequestsSliceController;
