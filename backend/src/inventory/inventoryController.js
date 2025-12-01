// backend\src\inventory\inventoryController.js
const { db } = require('../config/firebase');

// Listar todos os EPIs
exports.getAllProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar novo EPI
exports.createProduct = async (req, res) => {
  const { name, description, photoUrl } = req.body;
  try {
    const newProduct = {
      name,
      description,
      photoUrl,
      currentStock: 0, // Começa com 0, usa-se entrada para adicionar estoque
      createdAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('products').add(newProduct);
    res.status(201).json({ id: docRef.id, ...newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar EPI
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection('products').doc(id).delete();
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};