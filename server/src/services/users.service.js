import { UsersRepository } from '../repositories/users.repository.js';
import HttpException from '../utils/exceptions/HttpException.js';

export class UsersService extends UsersRepository {
    async findAllUser() {
        const users = await this.findAll();
        return users;
    }

    async findUserById(userId) {
        const findUser = await this.findById(userId);
        if (!findUser) throw new HttpException(400, 'User does not exist');
        return findUser;
    }

    async createUser(userData) {
        const findUser = await this.findByUsername(userData.username);
        if (findUser) throw new HttpException(400, 'User already exist');

        const createUserData = await this.create(userData);
        return createUserData;
    }

    async updateUser(userId, userData) {
        const findUser = await this.findById(userId);
        if (!findUser) throw new HttpException(400, 'User does not exist');

        const updateUserData = await this.update(userId, userData);
        return updateUserData;
    }

    async deleteUser(userId) {
        const findUser = await this.findById(userId);
        if (!findUser) throw new HttpException(400, 'User does not exist');

        const deleteUserData = await this.delete(userId);
        return deleteUserData;
    }
}
