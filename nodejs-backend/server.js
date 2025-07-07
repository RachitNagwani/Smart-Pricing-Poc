const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const verifyTokenAndMarket = require('./jwt_verification');
const customverifyTokenAndMarket = require('./custom_jwt_tokenVerification')
const getBackendUrlForMarket = require('./getBackenUrlsForMarket.js');
const marketRoutes = require('./market');
const tokenRoutes = require('./generate_token');

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());
app.use(express.json());

app.use('/markets', marketRoutes);

app.use('/getToken', tokenRoutes);

// app.use('/api', verifyTokenAndMarket);

app.use('/api', customverifyTokenAndMarket);

app.use('/api', async (req, res) => {
    const market = req.headers['x-market'];
    const backendBaseUrl = getBackendUrlForMarket(market);
    const targetUrl = backendBaseUrl + req.originalUrl;
  try {

    console.log(`➡️ Forwarding request to ${targetUrl}`);

    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: { ...req.headers, host: undefined },
      data: req.body
    });

    const responseData = {
      ...response.data,
      _forwardedTo: `${targetUrl}`  
    };

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('❌ Error forwarding to backend:', err.message);
    res.status(err.response?.status || 500).json({ error: `➡️ Forwarding request to ${targetUrl}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Node middleware server running at http://localhost:${PORT}`);
});
