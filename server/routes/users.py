from fastapi import APIRouter, Depends, HTTPException
from models.models import User
from config.db import get_db
from sqlalchemy.orm import Session
from schemas.users_schema import createUser

user = APIRouter()

@user.get('/users')
def get_users():
    return "Usuarios"

@user.post('/users')
def register_user(user_data: createUser, db: Session = Depends(get_db)):
    # Crear instancia del usuario
    new_user = User(**user_data.model_dump())

    # Agregar y guardar el nuevo usuario en la base de datos
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuario registrado con éxito"}