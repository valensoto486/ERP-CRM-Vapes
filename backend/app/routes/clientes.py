# Clientes API
from fastapi import APIRouter, HTTPException
from app.database import db
from pydantic import BaseModel, Field, EmailStr

router = APIRouter()
clientes_collection = db["clientes"]

class Cliente(BaseModel):
    nombre: str
    correo: str #ID
    telefono: str
    direccion: str
    categoria: str #mayorista, ocasional o frecuente 
    notas: str = Field(default=None, max_length=500) 
#Crear un cliente
@router.post("/")
def crear_cliente(cliente: Cliente):
    cliente_dict = cliente.dict()
    clientes_collection.insert_one(cliente_dict)
    return {"message": "Cliente creado exitosamente"}

#Obtener todos los clientes
@router.get("/")
def obtener_clientes():
    clientes = list(clientes_collection.find({}, {"_id": 0}))
    return clientes

#Obtener un cliente por ID (correo)
@router.get("/{cliente_correo}")
def obtener_cliente(cliente_correo: str):
    cliente = clientes_collection.find_one({"correo": cliente_correo}, {"_id": 0})
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

#Actualizar un cliente por ID (correo)
@router.put("/{cliente_correo}")
def actualizar_cliente(cliente_correo: str, cliente: dict):
    resultado = clientes_collection.update_one({"correo": cliente_correo}, {"$set": cliente})
    if resultado.matched_count == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente actualizado exitosamente"}

#Eliminar un cliente por ID (correo)
@router.delete("/{cliente_correo}")
def eliminar_cliente(cliente_correo: str):
    resultado = clientes_collection.delete_one({"correo": cliente_id})
    if resultado.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente eliminado exitosamente"}
