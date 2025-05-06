"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de verificación de autenticación
    const token = localStorage.getItem("token")
    if (token) {
      // Simulamos un usuario autenticado
      setUser({
        username: "admin",
        email: "admin@example.com",
        full_name: "Administrador",
      })
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // Simulación de login
    if (username === "admin" && password === "password") {
      const token = "fake-jwt-token"
      localStorage.setItem("token", token)
      setUser({
        username: "admin",
        email: "admin@example.com",
        full_name: "Administrador",
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
