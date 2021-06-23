import personalModel from '../../models/personal.model';

async function getPersonalDetails(req, res) {
    try {
        const details = await personalModel.getPersonal(req.session.uid);
        return res.json({
            message: 'found it!',
            success: true,
            data: details,
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null,
        });
    }
}

export default getPersonalDetails;
