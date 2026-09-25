import express from 'express';
// importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from '../data-source';
const router = express.Router();
// Inicializar a conexão com o banco de dados
AppDataSource.initialize()
    .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
})
    .catch((error) => {
    console.error('Erro na conexão com o banco de dados:', error);
});
router.get('/', (req, res) => {
    res.send('Bem vindo!!!testando tela de login');
});
// Exportar a instrução da rota
export default router;
