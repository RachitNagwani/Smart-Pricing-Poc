function getBackendUrlForMarket(market) {
    const urls = {
      India: 'https://smart-pricing-poc-backend1.salmonmeadow-cfb1b29f.eastus.azurecontainerapps.io',
      USA: 'https://smart-pricing-poc-backend2.salmonmeadow-cfb1b29f.eastus.azurecontainerapps.io',
      UK: 'https://smart-pricing-poc-backend3.salmonmeadow-cfb1b29f.eastus.azurecontainerapps.io'
    };
    return urls[market] || 'http://default-backend:5000';
  }
  
  module.exports = getBackendUrlForMarket;