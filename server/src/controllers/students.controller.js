import { Router } from 'express';
import { StudentsService } from '../services/students.service.js';
import { studentsValidation } from '../validations/students.validation.js';

class StudentsController {
    constructor() {
        this.router = Router();
        this.studentsService = new StudentsService();
        this.routes();
    }

    routes() {
        this.router.get('/', async (req, res, next) => {
            try {
                const students = await this.studentsService.findAllStudent();
                res.status(200).json({
                    status: 'ok',
                    message: 'success to get all students',
                    data: students
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            const { id: studentId } = req.params;
            try {
                const student = await this.studentsService.findStudentById(studentId);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to get student by id',
                    data: student
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.post('/', async (req, res, next) => {
            const { body: studentData } = req;
            const { error, value } = studentsValidation(studentData);
            if (error)
                return res.status(400).json({
                    error: {
                        message: error.details[0].message
                    }
                });
            try {
                const student = await this.studentsService.createStudent(value);
                res.status(201).json({
                    status: 'ok',
                    message: 'success to create new student',
                    data: student
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.patch('/:id', async (req, res, next) => {
            const { id: studentId } = req.params;
            const { body: studentData } = req;
            const { error, value } = studentsValidation(studentData);
            if (error)
                return res.status(400).json({
                    error: {
                        message: error.details[0].message
                    }
                });
            try {
                const student = await this.studentsService.updateStudent(studentId, value);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to update student',
                    data: student
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.delete('/:id', async (req, res, next) => {
            const { id: studentId } = req.params;
            try {
                const student = await this.studentsService.deleteStudent(studentId);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to delete student',
                    data: student
                });
            } catch (error) {
                next(error);
            }
        });
    }
}

export default new StudentsController().router;
