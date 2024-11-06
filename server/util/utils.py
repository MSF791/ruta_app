import jwt
import datetime
from constants.constants import (KEY)
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

def generate_token(user):
    data_user = {
        "id":user.id,
        "email":user.email,
        "cellphone":user.cellphone,
        'exp':datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    encoded = jwt.encode(data_user, KEY, algorithm="HS256")
    return encoded

# Verificar un token JWT
def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, KEY, algorithms=['HS256'])
        return payload
    except ExpiredSignatureError:
        raise ExpiredSignatureError("El token ha expirado")
    except InvalidTokenError:
        raise InvalidTokenError("El token es inválido")
