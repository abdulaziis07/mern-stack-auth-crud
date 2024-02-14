import UserModel from '../models/users.model.js';

export class AuthRepository {
    constructor() {
        this.userModel = UserModel;
    }

    async findByEmail(userEmail) {
        return await this.userModel.findOne({ email: userEmail });
    }

    async findById(userId) {
        return await this.userModel.findOne({ _id: userId });
    }

    async create(userData, hashedPassword) {
        return await this.userModel.create({
            ...userData,
            password: hashedPassword
        });
    }

    async update(userId, newRefreshToken) {
        await this.userModel.updateOne(
            { _id: userId },
            {
                refreshToken: newRefreshToken
            }
        );
    }
}
