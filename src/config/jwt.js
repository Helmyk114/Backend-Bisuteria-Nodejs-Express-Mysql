require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'tu-clave-secreta';

const generateJwtToken = (userId, role) => {
  const expiresIn = '60h'; // Duración del token

  const token = jwt.sign({ userId, role }, secretKey, { expiresIn });
  return token;
};

const verifyJwtToken = (token) => {
  try {
    const { userId, role } = jwt.verify(token, secretKey);
    return { userId, role };
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
