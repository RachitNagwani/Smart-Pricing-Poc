import os

# Read the market once when the server starts
MARKET = os.getenv('MARKET', 'UK').strip().upper()
print(f'DEBUG: MARKET param used in this request: "{MARKET}"')

def get_market_data():
    """
    Returns market-specific data based on the environment.
    """
    if MARKET == 'IND':
        return {"market": "India", "currency": "INR", "timezone": "IST"}
    elif MARKET == 'UK':
        return {"market": "United Kingdom", "currency": "GBP", "timezone": "GMT"}
    elif MARKET == 'USA':
        return {"market": "United States", "currency": "USD", "timezone": "EST"}
    else:
        return {"error": "Unknown market"}
