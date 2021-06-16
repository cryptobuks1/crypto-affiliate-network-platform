import token from "../utils/token";

function auth(req, res, next) {
    const extraction = token.validateToken(req.headers['authorization']);
    req.session = {
        uid: extraction.data._id
    };
    return next();
}


export default auth;