function getBackendUrlForMarket(market) {
    const urls = {
      India: 'http://127.0.0.1:8002',
      USA: 'http://127.0.0.1:8001',
      UK: 'http://127.0.0.1:8000'
    };
    return urls[market] || 'http://default-backend:5000';
  }
  
  module.exports = getBackendUrlForMarket;