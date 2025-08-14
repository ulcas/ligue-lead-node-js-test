import { Router } from 'express';
import { projectController } from '../controllers/projectController.js';
import { taskController } from '../controllers/taskController.js';
import { validateProject, validateTask, validateIdParam } from '../middlewares/validators.js';
import validationHandler from '../middlewares/validationHandler.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API de Projetos e Tarefas do Desafio da Ligue Lead!' });
});
router.post('/projects', validateProject, validationHandler, projectController.create);
router.get('/projects', projectController.list);
router.get('/projects/:id', validateIdParam(), validationHandler, projectController.get);
router.get('/projects/:id/github/:username', validateIdParam(), validationHandler, projectController.fetchGithub);
router.put('/projects/:id', validateIdParam(), validateProject, validationHandler, projectController.update);
router.delete('/projects/:id', validateIdParam(), validationHandler, projectController.remove);
router.post('/projects/:projectId/tasks',
    validateIdParam('projectId'),
    validateTask, validationHandler,
    taskController.create
);
router.put('/tasks/:id', validateIdParam(), validationHandler, taskController.update);
router.delete('/tasks/:id', validateIdParam(), validationHandler, taskController.remove);

export default router;

