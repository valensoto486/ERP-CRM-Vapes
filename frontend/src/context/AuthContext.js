"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem("token")
    if (token) {
      // Configurar el token en los headers de axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      // Obtener información del usuario
      fetchUserInfo()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/users/me`)
      setUser(response.data)
    } catch (error) {
      console.error("Error al obtener información del usuario:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)

      const response = await axios.post(`${API_URL}/auth/token`, formData)
      const { access_token } = response.data

      // Guardar token en localStorage
      localStorage.setItem("token", access_token)

      // Configurar el token en los headers de axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`

      // Obtener información del usuario
      await fetchUserInfo()

      return true
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      return false
    }
  }

  const logout = () => {
    // Eliminar token de localStorage
    localStorage.removeItem("token")

    // Eliminar token de los headers de axios
    delete axios.defaults.headers.common["Authorization"]

    // Limpiar estado del usuario
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
