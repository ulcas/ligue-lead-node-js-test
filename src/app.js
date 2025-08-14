import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

const app = express();

app.use(helmet());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: true,
        message: 'Muitas requisições. Tente novamente mais tarde.'
    }
});
app.use(limiter);

app.use(express.json());

app.use('/api', routes);

app.use(notFound);

app.use(errorHandler);

export default app;