import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class Credentials {
    static signAccessToken(payload, options) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN, {
            ...options
        });
    }

    static signRefreshToken(payload, options) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN, {
            ...options
        });
    }

    static verify(requestToken, jwtToken) {
        return jwt.verify(requestToken, jwtToken);
    }

    static async hash(requestPassword) {
        return await bcrypt.hash(requestPassword, 10);
    }

    static async compare(requestPassword, hashedPassword) {
        return await bcrypt.compare(requestPassword, hashedPassword);
    }
}

export default Credentials;
