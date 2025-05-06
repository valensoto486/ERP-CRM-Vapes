import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import Proveedores from "./pages/Proveedores"
import Ventas from "./pages/Ventas"
import Soporte from "./pages/Soporte"
import Reportes from "./pages/Reportes"
import Login from "./pages/Login"

function App() {
  // Simulamos que el usuario está autenticado
  const isAuthenticated = true

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
      <Route path="/proveedores" element={isAuthenticated ? <Proveedores /> : <Navigate to="/login" />} />
      <Route path="/ventas" element={isAuthenticated ? <Ventas /> : <Navigate to="/login" />} />
      <Route path="/soporte" element={isAuthenticated ? <Soporte /> : <Navigate to="/login" />} />
      <Route path="/reportes" element={isAuthenticated ? <Reportes /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
