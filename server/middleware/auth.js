function auth(req, res, next) {
    if (!req.session || !req.session.uid) {
        return res.json({
            message: 'please sign in',
            success: false,
            data: null,
        });
    }

    return next();
}

export default auth;
