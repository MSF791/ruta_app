from fastapi import APIRouter, Depends, HTTPException
from models.models import User
from config.db import get_db
from sqlalchemy.orm import Session
from schemas.users_schema import UserBase
from util.utils import generate_token

user = APIRouter()

@user.get('/users')
def get_users():
    return "Usuarios"

@user.post('/users')
def register_user(user_data: UserBase, db: Session = Depends(get_db)):
    # Crear instancia del usuario
    new_user = User(**user_data.model_dump())

    # Agregar y guardar el nuevo usuario en la base de datos
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuario registrado con éxito"}

@user.post('/login')
def login(data:dict, db: Session = Depends(get_db)):
    # Obtener el username y password del diccionario data
    username = data.get("username")
    password = data.get("password")
    # Buscar el usuario en la base de datos
    user = db.query(User).filter(User.username == username, User.password == password).first()

    # Validar si el usuario fue encontrado
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario o contraseña incorrectos")

    token = generate_token(user)
    return {"message":"Se ha logueado con exito!","token":token}