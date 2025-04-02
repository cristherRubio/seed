# database.py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# Sync engine for migrations
SYNC_DATABASE_URL = DATABASE_URL.replace("+asyncpg", "")
sync_engine = create_engine(SYNC_DATABASE_URL, echo=True)

Base = declarative_base()
