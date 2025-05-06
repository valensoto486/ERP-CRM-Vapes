import { useLocation } from "react-router-dom"
import { FiBell, FiSearch, FiUser } from "react-icons/fi"

const Header = () => {
  const location = useLocation()

  // Función para obtener el título basado en la ruta actual
  

  return (
    <header className="flex h-16 items-center justify-between border-b bg-blue-dark-800 px-6">
      <h1 className="text-xl font-semibold text-white"></h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar..."
            className="w-64 bg-blue-dark-950 pl-8 text-white placeholder:text-gray-400 border-blue-dark-700 focus:outline-none focus:ring-2 focus:ring-blue-dark-500 rounded-md py-2 px-3"
          />
        </div>

        <button className="text-gray-300 hover:bg-blue-dark-800 hover:text-white p-2 rounded-md">
          <FiBell className="h-5 w-5" />
        </button>

        <div className="relative group">
          <button className="rounded-full text-gray-300 hover:bg-blue-dark-800 hover:text-white p-2">
            <FiUser className="h-5 w-5" />
          </button>
          <div className="absolute right-0 mt-2 w-56 bg-blue-dark-800 text-white border border-blue-dark-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="px-4 py-2 border-b border-blue-dark-700">
              <p className="font-semibold">Usuario Administrador</p>
            </div>
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-blue-dark-700">Perfil</button>
              <button className="w-full text-left px-4 py-2 hover:bg-blue-dark-700">Configuración</button>
            </div>
            <div className="py-1 border-t border-blue-dark-700">
              <button className="w-full text-left px-4 py-2 hover:bg-blue-dark-700">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
