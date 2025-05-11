# app/main.py
from fastapi import FastAPI
from app.routes import clientes

app = FastAPI()

# Incluir rutas
app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])

@app.get("/")
def read_root():
    return {"message": "Bienvenido al CRM de Vaporizadores"}
