"use client"

import { useState } from "react"
import MainLayout from "../components/layout/MainLayout"
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiPackage } from "react-icons/fi"

const Proveedores = () => {
  // Datos de ejemplo
  const proveedoresData = [
    {
      id: 1,
      nombre: "VapeTech Inc.",
      contacto: "Roberto García",
      email: "roberto@vapetech.com",
      telefono: "555-111-2233",
      direccion: "Calle Principal 123, Ciudad",
      condicionesPago: "30 días",
      productos: ["Vaporizadores Premium", "Líquidos Orgánicos", "Accesorios"],
    },
    {
      id: 2,
      nombre: "CloudMasters",
      contacto: "Laura Sánchez",
      email: "laura@cloudmasters.com",
      telefono: "555-444-5566",
      direccion: "Av. Secundaria 456, Ciudad",
      condicionesPago: "15 días",
      productos: ["Vaporizadores Económicos", "Líquidos Variados", "Repuestos"],
    },
    {
      id: 3,
      nombre: "VapeWorld",
      contacto: "Carlos Mendoza",
      email: "carlos@vapeworld.com",
      telefono: "555-777-8899",
      direccion: "Plaza Central 789, Ciudad",
      condicionesPago: "Pago inmediato",
      productos: ["Vaporizadores de Lujo", "Ediciones Limitadas", "Kits Completos"],
    },
    {
      id: 4,
      nombre: "EcoVape",
      contacto: "Ana Torres",
      email: "ana@ecovape.com",
      telefono: "555-222-3344",
      direccion: "Calle Verde 321, Ciudad",
      condicionesPago: "45 días",
      productos: ["Vaporizadores Ecológicos", "Líquidos Naturales", "Accesorios Biodegradables"],
    },
    {
      id: 5,
      nombre: "TechSmoke",
      contacto: "Miguel Ángel",
      email: "miguel@techsmoke.com",
      telefono: "555-666-7788",
      direccion: "Av. Tecnológica 654, Ciudad",
      condicionesPago: "30 días",
      productos: ["Vaporizadores Inteligentes", "Líquidos Premium", "Gadgets"],
    },
  ]

  const [proveedores] = useState(proveedoresData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("info")

  // Formulario para proveedor
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    condicionesPago: "30 días",
    productos: [],
  })

  const handleSelectProveedor = (proveedor) => {
    setSelectedProveedor(proveedor)
    setActiveTab("info")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "productos") {
      // Convertir string separado por comas a array
      setFormData({
        ...formData,
        productos: value.split(",").map((item) => item.trim()),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleOpenDialog = (proveedor = null) => {
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre,
        contacto: proveedor.contacto,
        email: proveedor.email,
        telefono: proveedor.telefono,
        direccion: proveedor.direccion,
        condicionesPago: proveedor.condicionesPago,
        productos: proveedor.productos,
      })
    } else {
      setFormData({
        nombre: "",
        contacto: "",
        email: "",
        telefono: "",
        direccion: "",
        condicionesPago: "30 días",
        productos: [],
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
    // En una versión funcional, aquí se eliminaría el proveedor
    setSelectedProveedor(null)
    setIsDeleteDialogOpen(false)
  }

  // Filtrar proveedores según término de búsqueda
  const filteredProveedores = proveedores.filter(
    (proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Gestión de Proveedores</h2>
          <button className="btn btn-primary flex items-center" onClick={() => handleOpenDialog()}>
            <FiPlus className="mr-2 h-4 w-4" /> Nuevo Proveedor
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-8"
            />
          </div>
          <select className="select w-[180px]" defaultValue="todos">
            <option value="todos">Todas las condiciones</option>
            <option value="inmediato">Pago inmediato</option>
            <option value="15">15 días</option>
            <option value="30">30 días</option>
            <option value="45+">45 días o más</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Contacto</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Condiciones</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProveedores.map((proveedor) => (
                    <tr key={proveedor.id} onClick={() => handleSelectProveedor(proveedor)}>
                      <td className="font-medium text-white">{proveedor.nombre}</td>
                      <td className="text-gray-300">{proveedor.contacto}</td>
                      <td className="text-gray-300">{proveedor.email}</td>
                      <td className="text-gray-300">{proveedor.telefono}</td>
                      <td className="text-gray-300">{proveedor.condicionesPago}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-gray-300 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProveedor(proveedor)
                              handleOpenDialog(proveedor)
                            }}
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-red-500 hover:bg-blue-dark-700 rounded-md"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProveedor(proveedor)
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
            {selectedProveedor ? (
              <div className="card">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-dark-600 flex items-center justify-center">
                      <FiPackage className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedProveedor.nombre}</h3>
                      <p className="text-gray-400">{selectedProveedor.email}</p>
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
                          activeTab === "productos" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab("productos")}
                      >
                        Productos
                      </button>
                    </div>
                  </div>

                  {activeTab === "info" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Contacto:</div>
                        <div className="text-white">{selectedProveedor.contacto}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Teléfono:</div>
                        <div className="text-white">{selectedProveedor.telefono}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Dirección:</div>
                        <div className="text-white">{selectedProveedor.direccion}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Condiciones de pago:</div>
                        <div className="text-white">{selectedProveedor.condicionesPago}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Productos que ofrece</h4>
                      <div className="space-y-2">
                        {selectedProveedor.productos.map((producto, index) => (
                          <div key={index} className="rounded-md border border-blue-dark-700 p-3 text-white">
                            {producto}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-dark-700 rounded-md text-gray-300 text-sm">
                        <p>
                          Nota: La relación de productos con proveedores estará disponible cuando se conecte con el ERP.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                  <FiPackage className="h-16 w-16 text-blue-dark-600 mb-4" />
                  <p className="text-gray-400 text-center">Seleccione un proveedor para ver sus detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear/editar proveedor */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-dark-800 text-white border border-blue-dark-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {selectedProveedor && isDialogOpen ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="nombre" className="text-white">
                      Nombre de la Empresa
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
                    <label htmlFor="contacto" className="text-white">
                      Persona de Contacto
                    </label>
                    <input
                      id="contacto"
                      name="contacto"
                      value={formData.contacto}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <div className="grid gap-2">
                  <label htmlFor="direccion" className="text-white">
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="condicionesPago" className="text-white">
                    Condiciones de Pago
                  </label>
                  <select
                    id="condicionesPago"
                    name="condicionesPago"
                    value={formData.condicionesPago}
                    onChange={handleInputChange}
                    className="select"
                  >
                    <option value="Pago inmediato">Pago inmediato</option>
                    <option value="15 días">15 días</option>
                    <option value="30 días">30 días</option>
                    <option value="45 días">45 días</option>
                    <option value="60 días">60 días</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="productos" className="text-white">
                    Productos que ofrece
                  </label>
                  <textarea
                    id="productos"
                    name="productos"
                    value={formData.productos.join(", ")}
                    onChange={handleInputChange}
                    placeholder="Ingrese los productos separados por comas..."
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
              ¿Está seguro de que desea eliminar a {selectedProveedor?.nombre}? Esta acción no se puede deshacer.
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
    </MainLayout>
  )
}

export default Proveedores
