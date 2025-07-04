import os

MARKET = os.getenv('MARKET', 'UK').upper()

def get_market_data(market=None):
    #  MARKET = (market or 'UK').upper() # used for params
    #  print(f"DEBUG: MARKET param used in this request: {MARKET}")
     if MARKET == 'IND':
        return {"market": "India", "currency": "INR", "timezone": "IST"}
     elif MARKET == 'UK':
        return {"market": "United Kingdom", "currency": "GBP", "timezone": "GMT"}
     elif MARKET == 'US':
        return {"market": "United States", "currency": "USD", "timezone": "EST"}
     else:
        return {"error": "Unknown market"}
