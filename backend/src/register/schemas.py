# src/register/schemas.py
from typing import Literal, Union
from datetime import date
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr
    password: str


class PersonaFisicaRegisterRequest(UserBase):
    user_type: Literal["persona_fisica"]
    apellidoPaterno: str
    apellidoMaterno: str | None = None
    fechaNacimiento: date
    nacionalidad: Literal["mexicana", "extranjera"]
    telefono: str
    rfc: str


class PersonaMoralRegisterRequest(UserBase):
    user_type: Literal["persona_moral"]
    razonSocial: str
    fechaConstitucion: date
    actividadEconomica: str
    rfc: str
    telefono: str
    representanteNombre: str
    representantePaterno: str
    representanteMaterno: str | None = None


class AdminRegisterRequest(UserBase):
    user_type: Literal["admin"]


# Union for FastAPI to detect variants
RegisterRequest = Union[
    PersonaFisicaRegisterRequest,
    PersonaMoralRegisterRequest,
    AdminRegisterRequest
]
