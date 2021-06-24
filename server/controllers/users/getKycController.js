import kycModel from '../../models/kyc.model';

async function getKyc(req, res) {
    try {
        const kyc = await kycModel.findKyc({ belongsTo: req.session.uid });
        return res.json({
            message: 'found one',
            success: true,
            data: kyc,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default getKyc;
