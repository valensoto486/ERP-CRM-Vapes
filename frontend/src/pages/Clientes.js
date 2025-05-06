"use client"

import { useState, useEffect } from "react"
import MainLayout from "../components/layout/MainLayout"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiUser } from "react-icons/fi"
import axios from "axios"
import { API_URL } from "../config"

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [interacciones, setInteracciones] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCliente, setSelectedCliente] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isNewInteractionDialogOpen, setIsNewInteractionDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")

  // Formulario para cliente
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    categoria: "ocasional",
    notas: "",
  })

  // Formulario para interacción
  const [interaccionData, setInteraccionData] = useState({
    tipo: "llamada",
    descripcion: "",
  })

  useEffect(() => {
    fetchClientes()
  }, [])

  useEffect(() => {
    if (selectedCliente) {
      fetchInteracciones(selectedCliente._id)
    }
  }, [selectedCliente])

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/clientes`)
      setClientes(response.data)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchInteracciones = async (clienteId) => {
    try {
      const response = await axios.get(`${API_URL}/clientes/${clienteId}/interacciones`)
      setInteracciones(response.data)
    } catch (error) {
      console.error("Error al obtener interacciones:", error)
    }
  }

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente)
    setActiveTab("info")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleInteraccionChange = (e) => {
    const { name, value } = e.target
    setInteraccionData({
      ...interaccionData,
      [name]: value,
    })
  }

  const handleOpenDialog = (cliente = null) => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        categoria: cliente.categoria,
        notas: cliente.notas || "",
      })
    } else {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        categoria: "ocasional",
        notas: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedCliente && isDialogOpen) {
        // Actualizar cliente existente
        await axios.put(`${API_URL}/clientes/${selectedCliente._id}`, formData)
      } else {
        // Crear nuevo cliente
        await axios.post(`${API_URL}/clientes`, formData)
      }
      fetchClientes()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al guardar cliente:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/clientes/${selectedCliente._id}`)
      fetchClientes()
      setSelectedCliente(null)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error("Error al eliminar cliente:", error)
    }
  }

  const handleSubmitInteraccion = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/clientes/${selectedCliente._id}/interacciones`, {
        ...interaccionData,
        clienteId: selectedCliente._id,
        fecha: new Date().toISOString().split("T")[0],
        usuario: "Usuario Actual",
      })
      fetchInteracciones(selectedCliente._id)
      setIsNewInteractionDialogOpen(false)
      setInteraccionData({
        tipo: "llamada",
        descripcion: "",
      })
    } catch (error) {
      console.error("Error al guardar interacción:", error)
    }
  }

  // Filtrar clientes según término de búsqueda
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm),
  )

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case "frecuente":
        return "bg-green-700"
      case "mayorista":
        return "bg-blue-700"
      case "ocasional":
        return "bg-yellow-700"
      default:
        return "bg-gray-700"
    }
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Gestión de Clientes</h2>
          <button className="btn btn-primary flex items-center" onClick={() => handleOpenDialog()}>
            <FiPlus className="mr-2 h-4 w-4" /> Nuevo Cliente
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-8"
            />
          </div>
          <select className="select w-[180px]" defaultValue="todos">
            <option value="todos">Todas las categorías</option>
            <option value="frecuente">Frecuentes</option>
            <option value="mayorista">Mayoristas</option>
            <option value="ocasional">Ocasionales</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="table-container">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Categoría</th>
                      <th>Última Compra</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClientes.map((cliente) => (
                      <tr key={cliente._id} onClick={() => handleSelectCliente(cliente)}>
                        <td className="font-medium text-white">{cliente.nombre}</td>
                        <td className="text-gray-300">{cliente.email}</td>
                        <td className="text-gray-300">{cliente.telefono}</td>
                        <td>
                          <span className={`badge ${getCategoriaColor(cliente.categoria)} text-white`}>
                            {cliente.categoria === "frecuente"
                              ? "Frecuente"
                              : cliente.categoria === "mayorista"
                                ? "Mayorista"
                                : "Ocasional"}
                          </span>
                        </td>
                        <td className="text-gray-300">{cliente.ultimaCompra || "N/A"}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 text-gray-300 hover:bg-blue-dark-700 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCliente(cliente)
                                handleOpenDialog(cliente)
                              }}
                            >
                              <FiEdit className="h-4 w-4" />
                            </button>
                            <button
                              className="p-1 text-red-500 hover:bg-blue-dark-700 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCliente(cliente)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div>
            {selectedCliente ? (
              <div className="card">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-dark-600 flex items-center justify-center">
                      <FiUser className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedCliente.nombre}</h3>
                      <p className="text-gray-400">{selectedCliente.email}</p>
                    </div>
                  </div>

                  <div className="border-b border-blue-dark-700 mb-4">
                    <div className="flex">
                      <button
                        className={`px-4 py-2 ${
                          activeTab === "info" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("info")}
                      >
                        Información
                      </button>
                      <button
                        className={`px-4 py-2 ${
                          activeTab === "interacciones" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("interacciones")}
                      >
                        Interacciones
                      </button>
                    </div>
                  </div>

                  {activeTab === "info" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Teléfono:</div>
                        <div className="text-white">{selectedCliente.telefono}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Categoría:</div>
                        <div>
                          <span className={`badge ${getCategoriaColor(selectedCliente.categoria)} text-white`}>
                            {selectedCliente.categoria === "frecuente"
                              ? "Frecuente"
                              : selectedCliente.categoria === "mayorista"
                                ? "Mayorista"
                                : "Ocasional"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Última compra:</div>
                        <div className="text-white">{selectedCliente.ultimaCompra || "N/A"}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Total compras:</div>
                        <div className="text-white">{selectedCliente.totalCompras || 0}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Valor total:</div>
                        <div className="text-white">${selectedCliente.valorTotal?.toFixed(2) || "0.00"}</div>
                      </div>
                      {selectedCliente.notas && (
                        <div className="mt-4">
                          <div className="text-gray-400 mb-2">Notas:</div>
                          <div className="text-white p-3 bg-blue-dark-700 rounded-md">{selectedCliente.notas}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-white font-medium">Historial de interacciones</h4>
                        <button
                          className="btn btn-primary btn-sm flex items-center"
                          onClick={() => setIsNewInteractionDialogOpen(true)}
                        >
                          <FiPlus className="mr-2 h-3 w-3" /> Nueva
                        </button>
                      </div>
                      {interacciones.length > 0 ? (
                        <div className="space-y-3">
                          {interacciones.map((interaccion) => (
                            <div key={interaccion._id} className="rounded-md border border-blue-dark-700 p-3">
                              <div className="flex justify-between">
                                <span
                                  className={`badge ${
                                    interaccion.tipo === "llamada"
                                      ? "bg-green-700"
                                      : interaccion.tipo === "email"
                                        ? "bg-blue-700"
                                        : "bg-purple-700"
                                  }`}
                                >
                                  {interaccion.tipo}
                                </span>
                                <span className="text-sm text-gray-400">{interaccion.fecha}</span>
                              </div>
                              <p className="mt-2 text-white">{interaccion.descripcion}</p>
                              <p className="mt-1 text-sm text-gray-400">Por: {interaccion.usuario}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">No hay interacciones registradas.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <FiUser className="h-16 w-16 text-blue-dark-600 mb-4" />
                  <p className="text-gray-400 text-center">Seleccione un cliente para ver sus detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear/editar cliente */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedCliente && isDialogOpen ? "Editar Cliente" : "Nuevo Cliente"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="nombre" className="text-white">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="telefono" className="text-white">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="categoria" className="text-white">
                      Categoría
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="frecuente">Frecuente</option>
                      <option value="mayorista">Mayorista</option>
                      <option value="ocasional">Ocasional</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="notas" className="text-white">
                    Notas
                  </label>
                  <textarea
                    id="notas"
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    placeholder="Información adicional sobre el cliente..."
                    className="input"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminación */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
            <p className="text-gray-400 mb-6">
              ¿Está seguro de que desea eliminar a {selectedCliente?.nombre}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsDeleteDialogOpen(false)} className="btn btn-outline">
                Cancelar
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para nueva interacción */}
      {isNewInteractionDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nueva Interacción</h3>
            <p className="text-gray-400 mb-4">Registre una nueva interacción con {selectedCliente.nombre}.</p>
            <form onSubmit={handleSubmitInteraccion}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="tipo" className="text-white">
                    Tipo
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={interaccionData.tipo}
                    onChange={handleInteraccionChange}
                    className="select"
                  >
                    <option value="llamada">Llamada</option>
                    <option value="email">Email</option>
                    <option value="visita">Visita</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="descripcion" className="text-white">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={interaccionData.descripcion}
                    onChange={handleInteraccionChange}
                    placeholder="Detalles de la interacción..."
                    className="input"
                    rows="4"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsNewInteractionDialogOpen(false)} className="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Clientes
