# src/register/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from utils.security import hash_password
from models import UsersORM, PersonasFisicasORM, PersonasMoralesORM
from src.register.schemas import RegisterRequest


register_router = APIRouter()


@register_router.post("/create_user")
async def create_user(
        request: RegisterRequest,
        db: AsyncSession = Depends(get_db)):
    # Check if email already exists
    existing_user = await db.execute(
        select(UsersORM).where(UsersORM.email == request.email)
    )
    if existing_user.scalars().first():
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado")

    try:
        # Create user
        new_user = UsersORM(
            name=request.name,
            email=request.email,
            password=hash_password(request.password),
            role="admin" if request.user_type not in
            ["persona_fisica", "persona_moral"] else "client"
        )
        db.add(new_user)
        await db.flush()

        # Branch based on user type
        if request.user_type == "persona_fisica":
            persona = PersonasFisicasORM(
                user_id=new_user.id,
                lastname_1=request.apellidoPaterno,
                lastname_2=request.apellidoMaterno or "",
                birth_date=request.fechaNacimiento,
                nationality=request.nacionalidad,
                rfc=request.rfc,
                phone=request.telefono,
            )
            db.add(persona)

        elif request.user_type == "persona_moral":
            persona = PersonasMoralesORM(
                user_id=new_user.id,
                company_legal_name=request.razonSocial,
                constitution_date=request.fechaConstitucion,
                activity=request.actividadEconomica,
                rfc=request.rfc,
                phone=request.telefono,
                lastname_1=request.representantePaterno,
                lastname_2=request.representanteMaterno or "",
            )
            db.add(persona)

        await db.commit()
        await db.refresh(new_user)

        return {"message": "Usuario registrado", "user_id": new_user.id}
    except Exception as e:
        print(str(e))
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(e))
