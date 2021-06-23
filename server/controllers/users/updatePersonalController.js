import personalModel from '../../models/personal.model';
import userModel from '../../models/user.model';

async function updatePersonalDetails(req, res) {
    try {
        await userModel.updateUser(req.session.uid, {
            affiliateCode: req.body.affiliateCode,
        });

        const result = await personalModel.updatePersonal(
            req.session.uid,
            req.body
        );
        return res.json({
            message: 'personal details updated',
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

export default updatePersonalDetails;
