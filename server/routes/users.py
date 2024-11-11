from fastapi import APIRouter, Depends, HTTPException
from models.models import User
from config.db import get_db
from sqlalchemy.orm import Session
from schemas.schemas import UserBase
from util.utils import generate_token, get_current_user
from sqlalchemy.exc import IntegrityError
from fastapi.responses import JSONResponse
import bcrypt

user = APIRouter()

@user.get('/users')
def get_users():
    return "Usuarios"

@user.post('/users')
def register_user(user_data: UserBase, db: Session = Depends(get_db)):
    try:
        # Dump de los datos del usuario
        user = user_data.model_dump()

        # Encriptar la contraseña
        password = user["password"]
        password_encode = password.encode()
        salt = bcrypt.gensalt(15)
        hashed_password = bcrypt.hashpw(password_encode, salt)

        # Actualizar el campo 'password' con la contraseña encriptada
        user["password"] = hashed_password.decode()  # Decodifica para almacenar como string en la base de datos

        # Crear el nuevo usuario con la contraseña encriptada
        new_user = User(**user)

        # Agregar y guardar el nuevo usuario en la base de datos
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except IntegrityError as error:
        # Verificar si el error es por violación de unicidad en el username
        db.rollback() 
        if "username" in str(error.orig):
            raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso.")
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Ha ocurrido un error: {error}")

    return {"message": "Usuario registrado con éxito"}

@user.post('/login')
def login(data: dict, db: Session = Depends(get_db)):
    # Obtener el username y password del diccionario data
    username = data.get("username")
    password = data.get("password")
    
    # Buscar el usuario en la base de datos
    user = db.query(User).filter(User.username == username).first()

    # Validar si el usuario fue encontrado y si la contraseña es correcta
    if user is None or not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(status_code=404, detail="Usuario o contraseña incorrectos")

    # Generar el token si la autenticación es exitosa
    token = generate_token(user)
    # Crear la respuesta y configurar la cookie HttpOnly
    response = JSONResponse(content={"message": "Se ha logueado con éxito!"})
    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,  # Evita acceso desde JavaScript
        secure=True,    # Usa secure en producción (HTTPS)
        samesite="Lax", # Lax para prevenir ataques CSRF básicos
        max_age=3600    # Tiempo de expiración en segundos (1 hora)
    )
    return response

@user.get("/check-auth")
async def check_auth(current_user: dict = Depends(get_current_user)):
    return {"status": "authenticated", "user": current_user}

@user.post("/logout")
async def logout():
    response = JSONResponse(content={"message": "Sesión cerrada"})
    response.delete_cookie("auth_token")
    return response

@user.put('/users/edit')
def edit_user(FormData: dict, db: Session = Depends(get_db)):
    # Obtener el ID del usuario del FormData
    user_id = FormData.get("id")
    if not user_id:
        raise HTTPException(status_code=400, detail="ID de usuario es requerido")
    
    # Buscar el usuario en la base de datos
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Actualizar los campos que están en FormData
    for key, value in FormData.items():
        setattr(user, key, value)

    # Guardar los cambios en la base de datos
    db.commit()
    db.refresh(user)

    return {"message": "Usuario editado exitosamente", }