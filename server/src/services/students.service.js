import { StudentsRepository } from '../repositories/students.repository.js';
import HttpException from '../utils/exceptions/HttpException.js';

export class StudentsService extends StudentsRepository {
    async findAllStudent() {
        const students = await this.findAll();
        return students;
    }

    async findStudentById(studentId) {
        const findStudent = await this.findById(studentId);
        if (!findStudent) throw new HttpException(400, 'Student does not exist');
        return findStudent;
    }

    async createStudent(studentData) {
        const findStudent = await this.findByName(studentData.name);
        if (findStudent) throw new HttpException(400, 'Student already exist');

        const createStudentData = await this.create(studentData);
        return createStudentData;
    }

    async updateStudent(studentId, studentData) {
        const findStudent = await this.findById(studentId);
        if (!findStudent) throw new HttpException(400, 'Student does not exist');

        const updateStudentData = await this.update(studentId, studentData);
        return updateStudentData;
    }

    async deleteStudent(studentId) {
        const findStudent = await this.findById(studentId);
        if (!findStudent) throw new HttpException(400, 'Student does not exist');

        const deleteStudentData = await this.delete(studentId);
        return deleteStudentData;
    }
}
