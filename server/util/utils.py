import jwt
import datetime
from constants.constants import (KEY)
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from fastapi import Request, HTTPException


def generate_token(user):
    data_user = {
        "id":user.id,
        "email":user.email,
        "cellphone":user.cellphone,
        "first_name":user.first_name,
        "last_name":user.last_name,
        'exp':datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    encoded = jwt.encode(data_user, KEY, algorithm="HS256")
    return encoded

async def get_current_user(request: Request):
    token = request.cookies.get("auth_token")
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado")
    
    try:
        payload = jwt.decode(token, KEY, algorithms=["HS256"])
        return payload 
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="El token ha expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")
