# models.py
from typing import Literal
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey
from database import Base


# Enums

role_enum = Enum("admin", "client", name="user_role")
nationality_enum = Enum("mexicana", "extranjera", name="nacionalidad_enum")


# Models

class UsersORM(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    role = Column(role_enum, nullable=False)

    persona_fisica = relationship(
        "PersonasFisicasORM",
        back_populates="user",
        uselist=False)
    persona_moral = relationship(
        "PersonasMoralesORM",
        back_populates="user",
        uselist=False)


class PersonasFisicasORM(Base):
    __tablename__ = 'personas_fisicas'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False)
    lastname_1 = Column(String(50), nullable=False)
    lastname_2 = Column(String(50))
    birth_date = Column(DateTime, nullable=False)
    nationality = Column(nationality_enum, nullable=False)
    rfc = Column(String(20), nullable=False)
    phone = Column(String(15), nullable=False)

    user = relationship("UsersORM", back_populates="persona_fisica")


class PersonasMoralesORM(Base):
    __tablename__ = 'personas_morales'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False)
    company_legal_name = Column(String(50), nullable=False)
    constitution_date = Column(DateTime, nullable=False)
    activity = Column(String(50), nullable=False)
    rfc = Column(String(20), nullable=False)
    phone = Column(String(15), nullable=False)
    lastname_1 = Column(String(50), nullable=False)
    lastname_2 = Column(String(50))

    user = relationship("UsersORM", back_populates="persona_moral")
