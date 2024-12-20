from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

Base = declarative_base()

# Modelo de SQLAlchemy
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    cellphone = Column(String, nullable=True)
    password = Column(String, nullable=False)

class Route(Base):
    __tablename__ = 'routes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    punto_inicio = Column(String, nullable=False)
    punto_destino = Column(String, nullable=False)
    punto_intermedios = Column(String, nullable=False)
    tipo_transporte = Column(String, nullable=False)
    nombre_ruta = Column(String, nullable=True)