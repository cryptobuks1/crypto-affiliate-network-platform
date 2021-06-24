import kycModel from '../../models/kyc.model';

async function newKyc(req, res) {
    if (!req.body.files || req.body.files.length <= 0)
        return res.json({
            message: 'please include at least one file',
            success: false,
            data: null,
        });
    try {
        const result = await kycModel.newKyc({
            files: req.body.files,
            belongsTo: req.session.uid,
        });
        return res.json({
            message: 'your request has been submitted',
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

export default newKyc;
