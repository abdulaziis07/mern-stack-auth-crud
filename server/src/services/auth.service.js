import { AuthRepository } from '../repositories/auth.repository.js';
import Credentials from '../utils/auth/credentials.js';
import HttpException from '../utils/exceptions/HttpException.js';

export class AuthService extends AuthRepository {
    authToken = null;

    async register(userData) {
        const hashedPassword = await Credentials.hash(userData.password);
        const user = await this.create(userData, hashedPassword);
        return user;
    }

    async login(requestPassword, userEmail) {
        const user = await this.findByEmail(userEmail);
        if (!user) throw new HttpException(400, 'Wrong user email');

        const compareUser = await Credentials.compare(requestPassword, user.password);
        if (!compareUser) throw new HttpException(400, 'Wrong user password');

        const accessToken = Credentials.signAccessToken(
            { user: user._id },
            {
                expiresIn: '1h'
            }
        );

        const refreshToken = Credentials.signRefreshToken(
            { user: user._id },
            {
                expiresIn: '1d'
            }
        );

        const loginUser = await this.update(user._id, refreshToken);
        this.authToken = accessToken;

        return loginUser;
    }
}
