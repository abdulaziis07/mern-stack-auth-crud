import StudentModel from '../models/students.model.js';

export class StudentsRepository {
    constructor() {
        this.studentModel = StudentModel;
    }

    async findAll() {
        return await this.studentModel.find();
    }

    async findById(studentId) {
        return await this.studentModel.findOne({ _id: studentId });
    }

    async findByName(studentName) {
        return await this.studentModel.findOne({ name: studentName });
    }

    async create(studentData) {
        return await this.studentModel.create({ ...studentData });
    }

    async update(studentId, studentData) {
        return await this.studentModel.updateOne({ _id: studentId }, { $set: studentData });
    }

    async delete(studentId) {
        return await this.studentModel.deleteOne({ _id: studentId });
    }
}
