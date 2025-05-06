"use client"

import { useState } from "react"
import MainLayout from "../components/layout/MainLayout"
import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiShoppingCart,
  FiDollarSign,
  FiCheckCircle,
  FiArrowUpRight,
  FiEye,
} from "react-icons/fi"

const Ventas = () => {
  // Datos de ejemplo
  const oportunidadesData = [
    {
      id: 1,
      cliente: "Tienda VapeZone",
      titulo: "Suministro mensual de líquidos premium",
      valor: 5000,
      estado: "negociacion",
      fechaCreacion: "2023-04-01",
      fechaCierre: "2023-05-15",
      probabilidad: 75,
      descripcion: "Negociación para suministro mensual de líquidos premium para su tienda principal.",
    },
    {
      id: 2,
      cliente: "Distribuidora VapeMaster",
      titulo: "Contrato anual de vaporizadores",
      valor: 25000,
      estado: "propuesta",
      fechaCreacion: "2023-03-15",
      fechaCierre: "2023-06-30",
      probabilidad: 60,
      descripcion: "Propuesta para contrato anual de suministro de vaporizadores de alta gama.",
    },
    {
      id: 3,
      cliente: "Club de Vapeo EliteSmoke",
      titulo: "Patrocinio de eventos",
      valor: 8000,
      estado: "ganada",
      fechaCreacion: "2023-02-10",
      fechaCierre: "2023-03-20",
      probabilidad: 100,
      descripcion: "Patrocinio de eventos mensuales en el club durante un año.",
    },
    {
      id: 4,
      cliente: "Tienda Online VapeShop",
      titulo: "Suministro de accesorios",
      valor: 3500,
      estado: "potencial",
      fechaCreacion: "2023-04-10",
      fechaCierre: "2023-05-30",
      probabilidad: 30,
      descripcion: "Oportunidad de suministro de accesorios para su tienda online.",
    },
    {
      id: 5,
      cliente: "Cadena VapeLuxury",
      titulo: "Productos exclusivos",
      valor: 12000,
      estado: "calificado",
      fechaCreacion: "2023-03-25",
      fechaCierre: "2023-07-15",
      probabilidad: 50,
      descripcion: "Desarrollo de línea exclusiva de productos para su cadena de tiendas.",
    },
  ]

  const interaccionesData = [
    {
      id: 1,
      oportunidadId: 1,
      tipo: "llamada",
      descripcion: "Llamada para discutir términos del contrato",
      fecha: "2023-04-10",
      usuario: "Admin",
    },
    {
      id: 2,
      oportunidadId: 1,
      tipo: "email",
      descripcion: "Envío de propuesta actualizada con descuentos",
      fecha: "2023-04-12",
      usuario: "Admin",
    },
    {
      id: 3,
      oportunidadId: 2,
      tipo: "visita",
      descripcion: "Visita a sus instalaciones para presentar productos",
      fecha: "2023-03-20",
      usuario: "Vendedor",
    },
  ]

  const estadisticasData = {
    total_oportunidades: 15,
    total_valor: 85000,
    oportunidades_ganadas: 4,
    valor_ganado: 32000,
    tasa_exito: 26.7,
    porcentaje_valor_ganado: 37.6,
  }

  const [oportunidades] = useState(oportunidadesData)
  const [interacciones] = useState(interaccionesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOportunidad, setSelectedOportunidad] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isNewInteractionDialogOpen, setIsNewInteractionDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todas")
  const [activeDetailTab, setActiveDetailTab] = useState("info")
  const [estadisticas] = useState(estadisticasData)

  // Formulario para oportunidad
  const [formData, setFormData] = useState({
    cliente: "",
    titulo: "",
    valor: 0,
    estado: "potencial",
    fechaCierre: "",
    probabilidad: 50,
    descripcion: "",
  })

  // Formulario para interacción
  const [interaccionData, setInteraccionData] = useState({
    tipo: "llamada",
    descripcion: "",
  })

  const handleSelectOportunidad = (oportunidad) => {
    setSelectedOportunidad(oportunidad)
    setActiveDetailTab("info")
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

  const handleOpenDialog = (oportunidad = null) => {
    if (oportunidad) {
      setFormData({
        cliente: oportunidad.cliente,
        titulo: oportunidad.titulo,
        valor: oportunidad.valor,
        estado: oportunidad.estado,
        fechaCierre: oportunidad.fechaCierre,
        probabilidad: oportunidad.probabilidad,
        descripcion: oportunidad.descripcion,
      })
    } else {
      setFormData({
        cliente: "",
        titulo: "",
        valor: 0,
        estado: "potencial",
        fechaCierre: new Date().toISOString().split("T")[0],
        probabilidad: 50,
        descripcion: "",
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
    // En una versión funcional, aquí se eliminaría la oportunidad
    setSelectedOportunidad(null)
    setIsDeleteDialogOpen(false)
  }

  const handleSubmitInteraccion = (e) => {
    e.preventDefault()
    // En una versión funcional, aquí se guardaría la interacción
    setIsNewInteractionDialogOpen(false)
  }

  // Filtrar oportunidades según término de búsqueda y pestaña activa
  const filteredOportunidades = oportunidades.filter((oportunidad) => {
    const matchesSearch =
      oportunidad.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oportunidad.titulo.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "todas") return matchesSearch
    return matchesSearch && oportunidad.estado === activeTab
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "potencial":
        return "bg-blue-700"
      case "calificado":
        return "bg-purple-700"
      case "propuesta":
        return "bg-yellow-700"
      case "negociacion":
        return "bg-orange-700"
      case "ganada":
        return "bg-green-700"
      case "perdida":
        return "bg-red-700"
      default:
        return "bg-gray-700"
    }
  }

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case "potencial":
        return "Potencial"
      case "calificado":
        return "Calificado"
      case "propuesta":
        return "Propuesta"
      case "negociacion":
        return "Negociación"
      case "ganada":
        return "Ganada"
      case "perdida":
        return "Perdida"
      default:
        return estado
    }
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Automatización de Ventas</h2>
          <button className="btn btn-primary flex items-center" onClick={() => handleOpenDialog()}>
            <FiPlus className="mr-2 h-4 w-4" /> Nueva Oportunidad
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Total Oportunidades</div>
              <FiShoppingCart className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{estadisticas.total_oportunidades}</div>
              <p className="text-xs text-gray-400">Activas en este momento</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Valor Total</div>
              <FiDollarSign className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">${estadisticas.total_valor.toFixed(2)}</div>
              <p className="text-xs text-gray-400">En todas las oportunidades</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Oportunidades Ganadas</div>
              <FiCheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{estadisticas.oportunidades_ganadas}</div>
              <p className="text-xs text-green-400">{Math.round(estadisticas.tasa_exito)}% de tasa de éxito</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Valor Ganado</div>
              <FiArrowUpRight className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">${estadisticas.valor_ganado.toFixed(2)}</div>
              <p className="text-xs text-green-400">
                {Math.round(estadisticas.porcentaje_valor_ganado)}% del valor total
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-2.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="     Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-8"
            />
          </div>
        </div>

        <div className="border-b border-blue-dark-700 mb-4">
          <div className="flex flex-wrap">
            <button
              className={`px-4 py-2 ${
                activeTab === "todas" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("todas")}
            >
              Todas
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "potencial" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("potencial")}
            >
              Potenciales
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "calificado" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("calificado")}
            >
              Calificadas
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "propuesta" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("propuesta")}
            >
              Propuestas
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "negociacion" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("negociacion")}
            >
              Negociación
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "ganada" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("ganada")}
            >
              Ganadas
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "perdida" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("perdida")}
            >
              Perdidas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Título</th>
                    <th>Valor</th>
                    <th>Estado</th>
                    <th>Fecha Cierre</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOportunidades.map((oportunidad) => (
                    <tr key={oportunidad.id} onClick={() => handleSelectOportunidad(oportunidad)}>
                      <td className="font-medium text-white">{oportunidad.cliente}</td>
                      <td className="text-gray-300">{oportunidad.titulo}</td>
                      <td className="text-gray-300">${oportunidad.valor.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${getEstadoColor(oportunidad.estado)} text-white`}>
                          {getEstadoLabel(oportunidad.estado)}
                        </span>
                      </td>
                      <td className="text-gray-300">{oportunidad.fechaCierre}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-gray-300 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedOportunidad(oportunidad)
                              handleOpenDialog(oportunidad)
                            }}
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-gray-300 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedOportunidad(oportunidad)
                            }}
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-red-500 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedOportunidad(oportunidad)
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
            {selectedOportunidad ? (
              <div className="card">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-dark-600 flex items-center justify-center">
                      <FiShoppingCart className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedOportunidad.titulo}</h3>
                      <p className="text-gray-400">{selectedOportunidad.cliente}</p>
                    </div>
                  </div>

                  <div className="border-b border-blue-dark-700 mb-4">
                    <div className="flex">
                      <button
                        className={`px-4 py-2 ${
                          activeDetailTab === "info" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveDetailTab("info")}
                      >
                        Información
                      </button>
                      <button
                        className={`px-4 py-2 ${
                          activeDetailTab === "interacciones"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-gray-400"
                        }`}
                        onClick={() => setActiveDetailTab("interacciones")}
                      >
                        Interacciones
                      </button>
                    </div>
                  </div>

                  {activeDetailTab === "info" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Valor:</div>
                        <div className="text-white">${selectedOportunidad.valor.toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Estado:</div>
                        <div>
                          <span className={`badge ${getEstadoColor(selectedOportunidad.estado)} text-white`}>
                            {getEstadoLabel(selectedOportunidad.estado)}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Fecha de creación:</div>
                        <div className="text-white">{selectedOportunidad.fechaCreacion}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Fecha de cierre:</div>
                        <div className="text-white">{selectedOportunidad.fechaCierre}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Probabilidad:</div>
                        <div className="text-white">{selectedOportunidad.probabilidad}%</div>
                      </div>
                      <div className="mt-4">
                        <div className="text-gray-400 mb-2">Descripción:</div>
                        <div className="text-white p-3 bg-blue-dark-700 rounded-md">
                          {selectedOportunidad.descripcion}
                        </div>
                      </div>
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
                      {interacciones.filter((i) => i.oportunidadId === selectedOportunidad.id).length > 0 ? (
                        <div className="space-y-3">
                          {interacciones
                            .filter((i) => i.oportunidadId === selectedOportunidad.id)
                            .map((interaccion) => (
                              <div key={interaccion.id} className="rounded-md border border-blue-dark-700 p-3">
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
                  <FiShoppingCart className="h-16 w-16 text-blue-dark-600 mb-4" />
                  <p className="text-gray-400 text-center">Seleccione una oportunidad para ver sus detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear/editar oportunidad */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedOportunidad && isDialogOpen ? "Editar Oportunidad" : "Nueva Oportunidad"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <label htmlFor="titulo" className="text-white">
                      Título
                    </label>
                    <input
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="valor" className="text-white">
                      Valor ($)
                    </label>
                    <input
                      id="valor"
                      name="valor"
                      type="number"
                      value={formData.valor}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="estado" className="text-white">
                      Estado
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="potencial">Potencial</option>
                      <option value="calificado">Calificado</option>
                      <option value="propuesta">Propuesta</option>
                      <option value="negociacion">Negociación</option>
                      <option value="ganada">Ganada</option>
                      <option value="perdida">Perdida</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="fechaCierre" className="text-white">
                      Fecha de Cierre
                    </label>
                    <input
                      id="fechaCierre"
                      name="fechaCierre"
                      type="date"
                      value={formData.fechaCierre}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="probabilidad" className="text-white">
                      Probabilidad (%)
                    </label>
                    <input
                      id="probabilidad"
                      name="probabilidad"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.probabilidad}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
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
              ¿Está seguro de que desea eliminar la oportunidad "{selectedOportunidad?.titulo}"? Esta acción no se puede
              deshacer.
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
            <p className="text-gray-400 mb-4">Registre una nueva interacción para esta oportunidad.</p>
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

export default Ventas
