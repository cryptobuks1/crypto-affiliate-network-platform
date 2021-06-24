import requestsModel from '../../models/requests.model';

async function approve(req, res) {
    try {
        const result = await requestsModel.approveRequest(
            req.body.id,
            req.body.amount
        );
        return res.json({
            message: `request is ${result.status}`,
            success: true,
            data: result,
        });
    } catch (err) {
        console.log(err);

        return res.json({
            message: `something went wrong`,
            success: false,
            data: null,
        });
    }
}

export default approve;
