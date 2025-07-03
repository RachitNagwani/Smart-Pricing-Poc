const express = require('express');
const router = express.Router();

const markets = [
  { id: '1', name: 'India' },
  { id: '2', name: 'USA' },
  { id: '3', name: 'UK' },
];

// Public or protected — you can choose to protect it with the middleware
router.get('/', (req, res) => {
  res.json(markets);
});

module.exports = router;