import Credentials from '../utils/auth/credentials.js';

async function authMiddleware(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const verify = await Credentials.verify(token, process.env.ACCESS_TOKEN);
        req.user = verify;
        next();
    } catch (error) {
        next(error);
    }
}

export default authMiddleware;
