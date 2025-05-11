# Proveedores API
from fastapi import APIRouter, HTTPException
from app.database import db
from pydantic import BaseModel, Field, EmailStr

router = APIRouter()
proveedores_collection = db["proveedores"]

class Proveedor(BaseModel):
    nombre: str
    contacto: str
    telefono: str
    correo: EmailStr #ID
    productos: List[str] = []
    condiciones_pago: Optional[str] = None
    
#Crear un proveedor
@router.post("/")
def crear_proveedor(proveedor: Proveedor):
    data = proveedor.dict()
    if data.get("id"):
        del data["id"]
    result = proveedores_collection.insert_one(data)
    data["id"] = str(result.inserted_id)
    return {"message": "Proveedor creado exitosamente"}

#Obtener todos los proveedores
@router.get("/")
def obtener_proveedores():
    proveedores = []
    for proveedor in proveedores_collection.find():
        proveedor["id"] = str(proveedor["_id"])
        del proveedor["_id"]
        proveedores.append(proveedor)
    return proveedores

#Obtener un proveedor por ID (correo)
@router.get("/{correo}")
def obtener_proveedor(correo: str):
    proveedor = proveedores_collection.find_one({"correo": correo})
    if proveedor:
        proveedor["id"] = str(proveedor["_id"])
        del proveedor["_id"]
        return proveedor
    return {"message": "Proveedor no encontrado"}

#Actualizar un proveedor por ID (correo)
@router.put("/{correo}")
def actualizar_proveedor(correo: str, proveedor: Proveedor):
    result = proveedores_collection.update_one(
        {"correo": correo},
        {"$set": proveedor.dict()}
    )
    if result.modified_count == 1:
        return {"message": "Proveedor actualizado"}
    return {"message": "Proveedor no encontrado o sin cambios"}

#Eliminar un proveedor por ID (correo)
@router.delete("/{correo}")
def eliminar_proveedor(correo: str):
    result = proveedores_collection.delete_one({"correo": correo})
    if result.deleted_count == 1:
        return {"message": "Proveedor eliminado"}
    return {"message": "Proveedor no encontrado"}
