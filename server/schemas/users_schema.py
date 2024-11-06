from pydantic import BaseModel

class UserBase(BaseModel):
    username:str
    first_name:str
    last_name:str
    email:str  
    cellphone:str
    password:str