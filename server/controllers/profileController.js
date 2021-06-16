function profileController(req, res) {
    console.log(req.session);

    return res.json({
        message: 'Profile',
        success: true,
        data: null
    });
}

export default profileController;