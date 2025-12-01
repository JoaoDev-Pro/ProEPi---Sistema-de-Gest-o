const admin = require('firebase-admin');
require('dotenv').config();

let serviceAccount;

// Tenta ler da Variável de Ambiente (Para o Render/Produção)
if (process.env.FIREBASE_CREDENTIALS) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  } catch (err) {
    console.error('Erro ao fazer parse das credenciais do Firebase:', err);
  }
} 
// Se não tiver variável, tenta ler o arquivo físico (Para o seu PC Local)
else {
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (err) {
    console.error('Arquivo serviceAccountKey.json não encontrado e variável FIREBASE_CREDENTIALS não definida.');
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.error("Falha fatal: Não foi possível autenticar no Firebase.");
}

const db = admin.firestore();

module.exports = { db, admin };