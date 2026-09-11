"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// importar o arquivo com as credenciais do banco de dados
const data_source_1 = require("../data-source");
const router = express_1.default.Router();
// Inicializar a conexão com o banco de dados
data_source_1.AppDataSource.initialize()
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
exports.default = router;
