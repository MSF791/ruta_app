from fastapi import FastAPI
from routes.users import user

app = FastAPI()

@app.get('/')
def home():
    return "Inicio"

app.include_router(user)