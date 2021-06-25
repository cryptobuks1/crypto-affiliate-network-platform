import kycModel from "../../models/kyc.model";
import userModel from '../../models/user.model';

async function reject(req, res) {
    if (!req.body.id) return res.json({
        message: 'missing kyc id',
        success: false,
        data: null
    });

    try {

        const result = await kycModel.updateKyc({ _id: req.body.id }, {
            status: 'rejected',
            updatedAt: new Date()
        });

        await userModel.updateUser(result.belongsTo, {
            identityVerified: false,
            updatedAt: new Date()
        });

        return res.json({
            message: 'rejected',
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

export default reject;