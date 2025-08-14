export default function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const payload = {
        error: true,
        message: err.message || 'Internal Server Error'
    };

    if (process.env.NODE_ENV !== 'production' && err.stack) {
        payload.stack = err.stack;
    }

    res.status(status).json(payload);
}