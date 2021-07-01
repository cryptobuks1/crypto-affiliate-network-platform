import userModel from '../../models/user.model';

async function updateMany(req, res) {
    if (req.body.length <= 0) return res.json({
        message: 'at least one update is required',
        success: false,
        data: null
    });

    try {
        const result = await userModel.updateMany(req.body);

        return res.json({
            message: result,
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default updateMany;