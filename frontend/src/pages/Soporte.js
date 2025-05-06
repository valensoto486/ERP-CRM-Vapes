"use client"

import { useState } from "react"
import MainLayout from "../components/layout/MainLayout"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiMessageSquare, FiUser, FiFilter } from "react-icons/fi"

const Soporte = () => {
  // Datos de ejemplo
  const ticketsData = [
    {
      id: 1,
      cliente: "Juan Pérez",
      asunto: "Problema con vaporizador modelo VX200",
      descripcion: "El dispositivo no carga correctamente después de 2 horas conectado.",
      estado: "abierto",
      prioridad: "alta",
      fechaCreacion: "2023-04-10",
      asignado: "Soporte Técnico",
    },
    {
      id: 2,
      cliente: "María López",
      asunto: "Consulta sobre garantía",
      descripcion: "Necesito información sobre la garantía de mi compra reciente.",
      estado: "en_proceso",
      prioridad: "media",
      fechaCreacion: "2023-04-08",
      asignado: "Atención al Cliente",
    },
    {
      id: 3,
      cliente: "Carlos Rodríguez",
      asunto: "Solicitud de devolución",
      descripcion: "Quiero devolver un producto que no cumple con mis expectativas.",
      estado: "resuelto",
      prioridad: "baja",
      fechaCreacion: "2023-04-05",
      asignado: "Devoluciones",
    },
    {
      id: 4,
      cliente: "Ana Martínez",
      asunto: "Falla en líquido para vapeo",
      descripcion: "El líquido que compré tiene un sabor extraño, diferente al que probé en tienda.",
      estado: "abierto",
      prioridad: "media",
      fechaCreacion: "2023-04-09",
      asignado: "Control de Calidad",
    },
    {
      id: 5,
      cliente: "Roberto Gómez",
      asunto: "Consulta sobre compatibilidad",
      descripcion: "Necesito saber si el modelo X es compatible con los accesorios del modelo Y.",
      estado: "en_proceso",
      prioridad: "baja",
      fechaCreacion: "2023-04-07",
      asignado: "Soporte Técnico",
    },
  ]

  const mensajesData = [
    {
      id: 1,
      ticketId: 1,
      remitente: "Juan Pérez",
      contenido: "He intentado cargar el dispositivo con diferentes cables y enchufes, pero sigue sin funcionar.",
      fecha: "2023-04-10 10:30",
      esCliente: true,
    },
    {
      id: 2,
      ticketId: 1,
      remitente: "Soporte Técnico",
      contenido:
        "Por favor, intente mantener presionado el botón de encendido durante 10 segundos y luego conecte el cargador. ¿Puede probar esto y comentarnos el resultado?",
      fecha: "2023-04-10 11:15",
      esCliente: false,
    },
    {
      id: 3,
      ticketId: 1,
      remitente: "Juan Pérez",
      contenido: "He seguido sus instrucciones pero sigue sin cargar. La luz indicadora no se enciende en absoluto.",
      fecha: "2023-04-10 11:45",
      esCliente: true,
    },
    {
      id: 4,
      ticketId: 2,
      remitente: "María López",
      contenido: "Compré un vaporizador modelo Z500 hace una semana y quisiera saber cuánto tiempo de garantía tiene.",
      fecha: "2023-04-08 15:20",
      esCliente: true,
    },
    {
      id: 5,
      ticketId: 2,
      remitente: "Atención al Cliente",
      contenido:
        "Todos nuestros vaporizadores tienen una garantía de 6 meses por defectos de fabricación. ¿Necesita que le enviemos el certificado de garantía por correo?",
      fecha: "2023-04-08 16:05",
      esCliente: false,
    },
  ]

  const [tickets] = useState(ticketsData)
  const [mensajes] = useState(mensajesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")
  const [newMessage, setNewMessage] = useState("")

  // Formulario para ticket
  const [formData, setFormData] = useState({
    cliente: "",
    asunto: "",
    descripcion: "",
    prioridad: "media",
    asignado: "Soporte Técnico",
  })

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOpenDialog = (ticket = null) => {
    if (ticket) {
      setFormData({
        cliente: ticket.cliente,
        asunto: ticket.asunto,
        descripcion: ticket.descripcion,
        prioridad: ticket.prioridad,
        asignado: ticket.asignado,
      })
    } else {
      setFormData({
        cliente: "",
        asunto: "",
        descripcion: "",
        prioridad: "media",
        asignado: "Soporte Técnico",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // En una versión funcional, aquí se enviarían los datos al backend
    setIsDialogOpen(false)
  }

  const handleDelete = () => {
    // En una versión funcional, aquí se eliminaría el ticket
    setSelectedTicket(null)
    setIsDeleteDialogOpen(false)
  }

  const handleReply = (e) => {
    e.preventDefault()
    // En una versión funcional, aquí se enviaría la respuesta
    setNewMessage("")
    setIsReplyDialogOpen(false)
  }

  // Filtrar tickets según término de búsqueda y pestaña activa
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.asunto.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "todos") return matchesSearch
    return matchesSearch && ticket.estado === activeTab
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "abierto":
        return "bg-red-700"
      case "en_proceso":
        return "bg-yellow-700"
      case "resuelto":
        return "bg-green-700"
      default:
        return "bg-gray-700"
    }
  }

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case "abierto":
        return "Abierto"
      case "en_proceso":
        return "En Proceso"
      case "resuelto":
        return "Resuelto"
      default:
        return estado
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "bg-red-700"
      case "media":
        return "bg-yellow-700"
      case "baja":
        return "bg-green-700"
      default:
        return "bg-gray-700"
    }
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Servicio al Cliente</h2>
          <button className="btn btn-primary flex items-center" onClick={() => handleOpenDialog()}>
            <FiPlus className="mr-2 h-4 w-4" /> Nuevo Ticket
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-2.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="    Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="h-4 w-4 text-gray-400" />
            <select className="select w-[180px]" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
              <option value="todos">Todos los tickets</option>
              <option value="abierto">Abiertos</option>
              <option value="en_proceso">En proceso</option>
              <option value="resuelto">Resueltos</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Asunto</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} onClick={() => handleSelectTicket(ticket)}>
                      <td className="font-medium text-white">{ticket.cliente}</td>
                      <td className="text-gray-300">{ticket.asunto}</td>
                      <td>
                        <span className={`badge ${getEstadoColor(ticket.estado)} text-white`}>
                          {getEstadoLabel(ticket.estado)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getPrioridadColor(ticket.prioridad)} text-white`}>
                          {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
                        </span>
                      </td>
                      <td className="text-gray-300">{ticket.fechaCreacion}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-gray-300 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedTicket(ticket)
                              handleOpenDialog(ticket)
                            }}
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-red-500 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedTicket(ticket)
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
            </div>
          </div>

          <div>
            {selectedTicket ? (
              <div className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-dark-600 flex items-center justify-center">
                        <FiUser className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedTicket.cliente}</h3>
                        <p className="text-sm text-gray-400">{selectedTicket.fechaCreacion}</p>
                      </div>
                    </div>
                    <span className={`badge ${getEstadoColor(selectedTicket.estado)} text-white`}>
                      {getEstadoLabel(selectedTicket.estado)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white">{selectedTicket.asunto}</h4>
                    <p className="mt-2 text-gray-300">{selectedTicket.descripcion}</p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm text-gray-400">Prioridad: </span>
                      <span className={`badge ${getPrioridadColor(selectedTicket.prioridad)} text-white ml-2`}>
                        {selectedTicket.prioridad.charAt(0).toUpperCase() + selectedTicket.prioridad.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Asignado: </span>
                      <span className="text-white">{selectedTicket.asignado}</span>
                    </div>
                  </div>

                  <div className="border-t border-blue-dark-700 pt-4 mb-4">
                    <h4 className="text-white font-medium mb-4">Conversación</h4>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {mensajes
                        .filter((m) => m.ticketId === selectedTicket.id)
                        .map((mensaje) => (
                          <div
                            key={mensaje.id}
                            className={`p-3 rounded-lg ${
                              mensaje.esCliente ? "bg-blue-dark-700 mr-12" : "bg-blue-dark-600 ml-12"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-white">{mensaje.remitente}</span>
                              <span className="text-xs text-gray-400">{mensaje.fecha}</span>
                            </div>
                            <p className="text-gray-200">{mensaje.contenido}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Escriba su respuesta..."
                        className="input flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button className="btn btn-primary" onClick={() => setIsReplyDialogOpen(true)}>
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <FiMessageSquare className="h-16 w-16 text-blue-dark-600 mb-4" />
                  <p className="text-gray-400 text-center">Seleccione un ticket para ver sus detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear/editar ticket */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedTicket && isDialogOpen ? "Editar Ticket" : "Nuevo Ticket"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="cliente" className="text-white">
                    Cliente
                  </label>
                  <input
                    id="cliente"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="asunto" className="text-white">
                    Asunto
                  </label>
                  <input
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="descripcion" className="text-white">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="input"
                    rows="4"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="prioridad" className="text-white">
                      Prioridad
                    </label>
                    <select
                      id="prioridad"
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="asignado" className="text-white">
                      Asignado a
                    </label>
                    <select
                      id="asignado"
                      name="asignado"
                      value={formData.asignado}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="Soporte Técnico">Soporte Técnico</option>
                      <option value="Atención al Cliente">Atención al Cliente</option>
                      <option value="Devoluciones">Devoluciones</option>
                      <option value="Control de Calidad">Control de Calidad</option>
                    </select>
                  </div>
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
              ¿Está seguro de que desea eliminar el ticket "{selectedTicket?.asunto}"? Esta acción no se puede deshacer.
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

      {/* Modal para responder */}
      {isReplyDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Responder al Ticket</h3>
            <form onSubmit={handleReply}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="respuesta" className="text-white">
                    Mensaje
                  </label>
                  <textarea
                    id="respuesta"
                    name="respuesta"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input"
                    rows="6"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsReplyDialogOpen(false)} className="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default Soporte
