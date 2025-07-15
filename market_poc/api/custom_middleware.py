import jwt
from django.utils.deprecation import MiddlewareMixin

class DecodeJWTMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        market = request.META.get('HTTP_X_MARKET', '').lower()
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                # Decode without verifying signature (for dev/debug only!)
                payload = jwt.decode(token, options={"verify_signature": False})
                request.user_data = {"market": market, "user": payload.get("userId")}
            except jwt.DecodeError:
                request.user_data = None
        else:
            request.user_data = None