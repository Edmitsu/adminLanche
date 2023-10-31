const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);

   
    req.userId = decoded.id;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    }
    res.status(401).json({ error: 'Token inválido. Faça login novamente.' });
  }
}

module.exports = checkToken;
