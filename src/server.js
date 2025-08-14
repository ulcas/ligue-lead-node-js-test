import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './models/index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('❌ Erro ao conectar no banco de dados:', error);
}
