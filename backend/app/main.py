# app/main.py
from fastapi import FastAPI
from app.routes import clientes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Incluir rutas
app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])
app.include_router(proveedores_router.router, prefix="/proveedores", tags=["Proveedores"])

@app.get("/")
def read_root():
    return {"message": "Bienvenido al CRM de Vaporizadores"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)