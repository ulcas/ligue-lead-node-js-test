import { validationResult } from 'express-validator';

export default function validationHandler(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, message: 'Erro de validação', details: errors.array() });
    }
    next();
}