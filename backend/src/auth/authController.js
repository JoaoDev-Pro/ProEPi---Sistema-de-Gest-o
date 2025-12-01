// backend\src\auth\authController.js
const { db } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware para proteger rotas
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  try {
    const bearer = token.split(' ')[1];
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    let user = null;
    snapshot.forEach(doc => user = { id: doc.id, ...doc.data() });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });

    res.json({ auth: true, token, user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rota auxiliar para criar o primeiro ADMIN (apenas para setup inicial)
exports.createInitialAdmin = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 8);
  await db.collection('users').add({
    email,
    password_hash: hash,
    role: 'ADMIN'
  });
  res.json({ message: 'Admin criado' });
};