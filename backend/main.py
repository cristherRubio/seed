# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.register.router import register_router
from src.auth.router import auth_router


app = FastAPI(title="SEED API")

# CORS settings for local dev and frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # FIXME: Change to specific origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(register_router, prefix="/register", tags=["Register"])
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
