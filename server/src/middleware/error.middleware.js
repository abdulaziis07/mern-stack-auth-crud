import HttpException from '../utils/exceptions/HttpException.js';

function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    try {
        if (error instanceof HttpException) {
            return res.status(status).json({ errors: { status, message } });
        }
        res.status(status).json({ status, message });
        next();
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;
