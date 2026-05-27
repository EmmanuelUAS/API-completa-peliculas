const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_desarrollo';

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({
      mensaje: 'Formato de token invalido. Usa: Bearer <token>',
    });
  }

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token invalido o expirado' });
  }
}

module.exports = {
  JWT_SECRET,
  verificarToken,
};
