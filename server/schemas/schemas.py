from pydantic import BaseModel

class UserBase(BaseModel):
    username:str
    first_name:str
    last_name:str
    email:str  
    cellphone:str
    password:str

class RouteBase(BaseModel):
    punto_inicio:str
    punto_destino:str
    punto_intermedios:str
    tipo_transporte:str
    nombre_ruta:str