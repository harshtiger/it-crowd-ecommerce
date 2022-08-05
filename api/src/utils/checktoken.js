
const { verifyToken } = require('./tokenmag');

module.exports = (req, res, next) => {

  const auth = req.headers.authorization; //in case there is a token -> auth = 'Bearer <token>'

  if (typeof auth !== 'undefined' && auth.startsWith('Bearer')) {
    try {
      const tokenFromHeader = auth.substring(7);
      const userFromToken = verifyToken(tokenFromHeader);
      req.user = userFromToken.user;
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid or expired token' });
    }
  } else {
    res.status(404).json({ error: 'Token must be provided' });
  }
};