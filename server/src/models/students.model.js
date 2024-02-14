import { Schema, model } from 'mongoose';

const studentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    }
});

const StudentModel = model('students', studentsSchema);
export default StudentModel;
