import kycModel from "../../models/kyc.model";

async function getKycs(req, res) {
    try {
        const kycs = await kycModel.findKycs({});
        return res.json({
            message: 'found something',
            success: true,
            data: kycs
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default getKycs;