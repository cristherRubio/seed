from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import UsersORM
from utils.security import verify_password, create_access_token
from src.auth.schemas import LoginRequest, TokenResponse


auth_router = APIRouter()


@auth_router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UsersORM).where(UsersORM.email == request.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token = create_access_token({"sub": user.email})
    return {"access_token": token}
