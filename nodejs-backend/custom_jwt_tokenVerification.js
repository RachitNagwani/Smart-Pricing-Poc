const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_super_secret_key'; // match with token generator

function customverifyTokenAndMarket(req, res, next) {
  const authHeader = req.headers.authorization;
  const selectedMarket = req.headers['x-market'];

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No Bearer token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const marketInToken = decoded.market;
    if (!selectedMarket || !marketInToken || selectedMarket !== marketInToken) {
      return res.status(403).json({ error: 'Market mismatch' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = customverifyTokenAndMarket;
