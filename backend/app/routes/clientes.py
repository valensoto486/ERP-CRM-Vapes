# Clientes API
from fastapi import APIRouter, HTTPException
from app.database import db
from pydantic import BaseModel, Field

router = APIRouter()
clientes_collection = db["clientes"]

class Cliente(BaseModel):
    nombre: str
    correo: str
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

#Obtener un cliente por ID
@router.get("/{cliente_id}")
def obtener_cliente(cliente_id: str):
    cliente = clientes_collection.find_one({"_id": cliente_id}, {"_id": 0})
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

#Actualizar un cliente por ID
@router.put("/{cliente_id}")
def actualizar_cliente(cliente_id: str, cliente: dict):
    resultado = clientes_collection.update_one({"_id": cliente_id}, {"$set": cliente})
    if resultado.matched_count == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente actualizado exitosamente"}

#Eliminar un cliente por ID
@router.delete("/{cliente_id}")
def eliminar_cliente(cliente_id: str):
    resultado = clientes_collection.delete_one({"_id": cliente_id})
    if resultado.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente eliminado exitosamente"}
