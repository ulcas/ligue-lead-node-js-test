import { body, param } from 'express-validator';

export const validateProject = [
    body('title')
        .exists().withMessage('title é obrigatório')
        .isString().withMessage('title deve ser uma string')
        .isLength({ min: 3 }).withMessage('title deve ter pelo menos 3 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('description deve ser uma string')
];

export const validateTask = [
    body('title')
        .exists().withMessage('title é obrigatório')
        .isString().withMessage('title deve ser uma string')
        .isLength({ min: 3 }).withMessage('title deve ter pelo menos 3 caracteres'),
    body('description')
        .optional()
        .isString().withMessage('description deve ser uma string'),
    body('status')
        .optional()
        .isIn(['pendente','em_andamento','concluido'])
        .withMessage('status fornecido não é válido. Status permitidos: pendente, em_andamento ou concluido')
];

export const validateIdParam = (paramName = 'id') => [
    param(paramName)
        .exists().withMessage(`${paramName} é obrigatório`)
        .isInt({ gt: 0 }).withMessage(`${paramName} deve ser um número inteiro positivo`)
];
