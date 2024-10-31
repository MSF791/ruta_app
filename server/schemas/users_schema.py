from pydantic import BaseModel

class createUser(BaseModel):
    username:str
    first_name:str
    last_name:str
    email:str  
    cellphone:str
    password:str