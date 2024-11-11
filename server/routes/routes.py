from fastapi import APIRouter, Depends, HTTPException
from schemas.schemas import RouteBase
from config.db import get_db
from sqlalchemy.orm import Session
from models.models import Route

route = APIRouter()

@route.post('/route')
def save_route(RouteData:RouteBase, db: Session = Depends(get_db)):
    print(f'esta es la data {RouteData}')
    try:
        RouteData = RouteData.model_dump()
        new_route = Route(**RouteData)

        db.add(new_route)
        db.commit()
        db.refresh(new_route)
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Ha ocurrido un error: {error}")
    return {"message":"route save succesfully"}