const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Replace with a secure secret key in production!
const SECRET_KEY = 'my_super_secret_key';

const availableMarkets = ['India', 'USA', 'UK'];

function getRandomMarket() {
  const index = Math.floor(Math.random() * availableMarkets.length);
  return availableMarkets[index];
}

router.post('/', (req, res) => {
  
  const user = Number(req.body.user);
  console.log(req.body)
  const randomMarket = availableMarkets[user-1]

  const payload = {
    userId: 'test-user',
    market: randomMarket
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h',
    issuer: 'your-node-middleware'
  });

  res.json({
    token,
    assignedMarket: randomMarket
  });
});

module.exports = router;
