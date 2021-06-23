import token from '../utils/token';

function extract(req, res, next) {
    if (req.headers['authorization'] !== undefined) {
        const extraction = token.validateToken(req.headers['authorization']);
        req.session = {
            uid: extraction.data._id,
        };
    }

    return next();
}

export default extract;
