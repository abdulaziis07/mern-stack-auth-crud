import UserModel from '../models/users.model.js';

export class UsersRepository {
  constructor() {
    this.userModel = UserModel;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findById(userId) {
    return await this.userModel.findOne({ _id: userId });
  }

  async findByUsername(userUsername) {
    return await this.userModel.findOne({ username: userUsername });
  }

  async create(userData) {
    return await this.userModel.create({ ...userData });
  }

  async update(userId, userData) {
    return await this.userModel.updateOne({ _id: userId }, { $set: userData });
  }

  async delete(userId) {
    return await this.userModel.deleteOne({ _id: userId });
  }
}
