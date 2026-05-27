const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const usuarioDemo = {
  id: 1,
  usuario: 'admin',
  password: '123456',
};

const router = express.Router();

router.post('/login', (req, res) => {
  const { usuario, password } = req.body || {};

  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: 'Usuario y password son requeridos',
    });
  }

  if (usuario !== usuarioDemo.usuario || password !== usuarioDemo.password) {
    return res.status(401).json({
      mensaje: 'Credenciales invalidas',
    });
  }

  const token = jwt.sign(
    {
      id: usuarioDemo.id,
      usuario: usuarioDemo.usuario,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    mensaje: 'Login exitoso',
    token,
  });
});

module.exports = router;
