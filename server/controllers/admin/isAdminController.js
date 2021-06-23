async function isAdmin(req, res) {
    return res.json({ message: 'has to be admin', success: true, data: true });
}

export default isAdmin;
