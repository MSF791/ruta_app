from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# Configurar la base de datos
engine = create_engine('postgresql+psycopg2://postgres:1234@localhost/clima')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Conectar y obtener una sesión directamente
def connect_db():
    return SessionLocal()  

# Función de dependencia para obtener una sesión de la base de datos
def get_db():
    db = connect_db()
    try:
        yield db
    finally:
        db.close()