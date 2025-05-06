"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FiPackage } from "react-icons/fi"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Credenciales inválidas. Por favor, intente de nuevo.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intente de nuevo más tarde.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-dark-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-blue-dark-800 p-8 rounded-lg border border-blue-dark-700">
        <div className="text-center">
          <div className="flex justify-center">
            <FiPackage className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Vape CRM</h2>
          <p className="mt-2 text-sm text-gray-400">Inicie sesión para acceder al sistema</p>
        </div>

        {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input mt-1"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input mt-1"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login