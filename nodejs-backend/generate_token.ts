const jwt = require('jsonwebtoken');

// ✅ Replace this with your secret or private key
const SECRET_KEY = 'my-super-secret-key'; // Use env variable in real apps

// ✅ Payload with a custom `market` field
const payload = {
  userId: 123,
  name: 'Test User',
  market: 'India', // 🔥 Injected market
  role: 'admin'
};

// ✅ Sign the token
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

console.log('🔥 Test JWT token:\n', token);
