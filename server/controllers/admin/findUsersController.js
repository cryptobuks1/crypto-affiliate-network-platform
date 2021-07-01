import userModel from "../../models/user.model";

async function findUsers(req, res) {
    try {
        const users = await userModel.findUsers({});

        return res.json({
            message: `found ${users.length} users`,
            success: true,
            data: users
        });

    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default findUsers;