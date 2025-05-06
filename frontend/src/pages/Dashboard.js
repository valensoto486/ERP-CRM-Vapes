"use client"

import { useState, useEffect } from "react"
import MainLayout from "../components/layout/MainLayout"
import { FiDollarSign, FiUsers, FiShoppingCart, FiPackage } from "react-icons/fi"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Registrar componentes de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [loading, setLoading] = useState(true)

  // Datos de ejemplo para el dashboard
  const dashboardData = {
    totalClientes: 156,
    ventasMensuales: 24850,
    ticketsAbiertos: 12,
    totalProveedores: 18,
  }

  // Datos de ejemplo para gráficos
  const salesData = [
    { name: "Ene", ventas: 12500 },
    { name: "Feb", ventas: 15800 },
    { name: "Mar", ventas: 18200 },
    { name: "Abr", ventas: 16500 },
    { name: "May", ventas: 19800 },
    { name: "Jun", ventas: 22300 },
    { name: "Jul", ventas: 24850 },
  ]

  const ticketData = [
    { name: "Ene", resueltos: 65, pendientes: 28 },
    { name: "Feb", resueltos: 59, pendientes: 48 },
    { name: "Mar", resueltos: 80, pendientes: 40 },
    { name: "Abr", resueltos: 81, pendientes: 19 },
    { name: "May", resueltos: 56, pendientes: 96 },
    { name: "Jun", resueltos: 55, pendientes: 27 },
    { name: "Jul", resueltos: 40, pendientes: 32 },
  ]

  useEffect(() => {
    // Simulamos carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Configuración para el gráfico de líneas (ventas)
  const salesChartData = {
    labels: salesData.map((item) => item.name),
    datasets: [
      {
        label: "Ventas ($)",
        data: salesData.map((item) => item.ventas),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.1,
      },
    ],
  }

  // Configuración para el gráfico de barras (tickets)
  const ticketsChartData = {
    labels: ticketData.map((item) => item.name),
    datasets: [
      {
        label: "Resueltos",
        data: ticketData.map((item) => item.resueltos),
        backgroundColor: "#3B82F6",
      },
      {
        label: "Pendientes",
        data: ticketData.map((item) => item.pendientes),
        backgroundColor: "#EF4444",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      x: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#F9FAFB",
        },
      },
      tooltip: {
        backgroundColor: "#1E293B",
        borderColor: "#334155",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
      },
    },
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <h2 className="text-3xl font-bold text-white">Resumen General</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Total Clientes</div>
              <FiUsers className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{dashboardData.totalClientes}</div>
              <p className="text-xs text-green-400">+12% desde el mes pasado</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Ventas Mensuales</div>
              <FiDollarSign className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">${dashboardData.ventasMensuales}</div>
              <p className="text-xs text-green-400">+8.2% desde el mes pasado</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Tickets Abiertos</div>
              <FiShoppingCart className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{dashboardData.ticketsAbiertos}</div>
              <p className="text-xs text-red-400">+5 desde ayer</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-gray-200">Proveedores</div>
              <FiPackage className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{dashboardData.totalProveedores}</div>
              <p className="text-xs text-green-400">+2 desde el mes pasado</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Ventas Mensuales</h3>
            <div className="h-[300px]">
              <Line data={salesChartData} options={chartOptions} />
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tickets de Soporte</h3>
            <div className="h-[300px]">
              <Bar data={ticketsChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Clientes Recientes</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-dark-600 flex items-center justify-center">
                    <FiUsers className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Cliente {i}</p>
                    <p className="text-xs text-gray-400">cliente{i}@ejemplo.com</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-400">
                    Hace {i} día{i > 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tickets Recientes</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      i % 3 === 0 ? "bg-red-900" : i % 2 === 0 ? "bg-yellow-900" : "bg-green-900"
                    }`}
                  >
                    <FiShoppingCart
                      className={`h-5 w-5 ${
                        i % 3 === 0 ? "text-red-400" : i % 2 === 0 ? "text-yellow-400" : "text-green-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Ticket #{1000 + i}</p>
                    <p className="text-xs text-gray-400">
                      {i % 3 === 0 ? "Problema" : i % 2 === 0 ? "Consulta" : "Solicitud"}
                    </p>
                  </div>
                  <div
                    className={`ml-auto text-xs rounded-full px-2 py-1 ${
                      i % 3 === 0
                        ? "bg-red-900 text-red-300"
                        : i % 2 === 0
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-green-900 text-green-300"
                    }`}
                  >
                    {i % 3 === 0 ? "Pendiente" : i % 2 === 0 ? "En proceso" : "Resuelto"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
