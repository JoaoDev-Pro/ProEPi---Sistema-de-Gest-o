// backend\src\operations\operationsController.js
const { db } = require('../config/firebase');

exports.registerMovement = async (req, res) => {
  const { productId, type, quantity } = req.body;
  // type deve ser "IN" ou "OUT"
  
  const productRef = db.collection('products').doc(productId);
  const movementRef = db.collection('movements').doc();

  try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(productRef);
      if (!doc.exists) {
        throw new Error("Produto não encontrado");
      }

      const currentStock = doc.data().currentStock || 0;
      let newStock = currentStock;

      if (type === 'IN') {
        newStock += parseInt(quantity);
      } else if (type === 'OUT') {
        if (currentStock < quantity) {
          throw new Error("Estoque insuficiente");
        }
        newStock -= parseInt(quantity);
      } else {
        throw new Error("Tipo de movimentação inválido");
      }

      // Atualiza o estoque
      t.update(productRef, { currentStock: newStock });

      // Registra o histórico
      t.set(movementRef, {
        productId,
        type,
        quantity: parseInt(quantity),
        timestamp: new Date().toISOString(),
        userId: req.userId // Pego do Token JWT
      });
    });

    res.json({ message: 'Movimentação registrada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter Histórico
exports.getHistory = async (req, res) => {
  try {
    // Busca as últimas 50 movimentações
    const snapshot = await db.collection('movements')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
      
    const movements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};