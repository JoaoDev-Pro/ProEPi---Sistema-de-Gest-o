// backend\src\index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authController = require('./auth/authController');
const inventoryController = require('./inventory/inventoryController');
const operationsController = require('./operations/operationsController');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rotas de Autenticação
app.post('/api/auth/login', authController.login);
app.post('/api/auth/setup', authController.createInitialAdmin); // Usar uma vez e depois remover/comentar

// Rotas Protegidas (Requerem Token)
const { verifyToken } = authController;

// Inventário
app.get('/api/products', verifyToken, inventoryController.getAllProducts);
app.post('/api/products', verifyToken, inventoryController.createProduct);
app.delete('/api/products/:id', verifyToken, inventoryController.deleteProduct);

// Operações
app.post('/api/movements', verifyToken, operationsController.registerMovement);
app.get('/api/movements', verifyToken, operationsController.getHistory);

// Inicialização
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});