import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const UserModel = model('users', usersSchema);
export default UserModel;
