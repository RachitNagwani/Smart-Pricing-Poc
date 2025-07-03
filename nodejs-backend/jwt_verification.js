const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

const TENANT_ID = process.env.TENANT_ID;
const AUDIENCE = process.env.AUDIENCE;
const ISSUER = `https://login.microsoftonline.com/${TENANT_ID}/v2.0`;

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

function verifyTokenAndMarket(req, res, next) {
  const authHeader = req.headers.authorization;
  const selectedMarket = req.headers['x-market'];

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No Bearer token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, {
    audience: AUDIENCE,
    issuer: ISSUER,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      console.error('❌ Token verification failed:', err.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const marketInToken = decoded.market;
    console.log(marketInToken, selectedMarket);

    // Uncomment to enforce strict match
    // if (!selectedMarket || !marketInToken || selectedMarket !== marketInToken) {
    //   return res.status(403).json({
    //     error: `Market mismatch. Header: ${selectedMarket}, Token: ${marketInToken}`
    //   });
    // }

    req.user = decoded;
    next();
  });
}

module.exports = verifyTokenAndMarket;