"use client"

import { useState } from "react"
import MainLayout from "../components/layout/MainLayout"
import { FiDownload, FiCalendar } from "react-icons/fi"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Registrar componentes de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Reportes = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mes")

  // Datos de ejemplo para los gráficos
  const ventasPorMes = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: "Ventas ($)",
        data: [12500, 15800, 18200, 16500, 19800, 22300, 24850, 23400, 26700, 28900, 31200, 35000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "#3B82F6",
        borderWidth: 1,
      },
    ],
  }

  const ventasPorProducto = {
    labels: ["Vaporizadores", "Líquidos", "Accesorios", "Repuestos", "Kits"],
    datasets: [
      {
        label: "Ventas por Producto",
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
        borderColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
        borderWidth: 1,
      },
    ],
  }

  const clientesPorCategoria = {
    labels: ["Frecuentes", "Mayoristas", "Ocasionales"],
    datasets: [
      {
        label: "Clientes por Categoría",
        data: [42, 23, 35],
        backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(245, 158, 11, 0.7)"],
        borderColor: ["#10B981", "#3B82F6", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  }

  const ticketsPorEstado = {
    labels: ["Abiertos", "En Proceso", "Resueltos"],
    datasets: [
      {
        label: "Tickets por Estado",
        data: [15, 25, 60],
        backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(16, 185, 129, 0.7)"],
        borderColor: ["#EF4444", "#F59E0B", "#10B981"],
        borderWidth: 1,
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

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
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

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Reportes y Análisis</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-dark-800 rounded-md px-3 py-2">
              <FiCalendar className="h-4 w-4 text-gray-400" />
              <select
                className="bg-transparent text-white border-none focus:outline-none"
                value={periodoSeleccionado}
                onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              >
                <option value="semana">Última Semana</option>
                <option value="mes">Último Mes</option>
                <option value="trimestre">Último Trimestre</option>
                <option value="anio">Último Año</option>
              </select>
            </div>
            <button className="btn btn-primary flex items-center">
              <FiDownload className="mr-2 h-4 w-4" /> Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Ventas Mensuales</h3>
            <div className="h-[300px]">
              <Line data={ventasPorMes} options={chartOptions} />
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Ventas por Producto</h3>
            <div className="h-[300px]">
              <Pie data={ventasPorProducto} options={pieChartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Clientes por Categoría</h3>
            <div className="h-[300px]">
              <Pie data={clientesPorCategoria} options={pieChartOptions} />
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tickets de Soporte</h3>
            <div className="h-[300px]">
              <Bar data={ticketsPorEstado} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resumen de Métricas</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Ventas Totales</h4>
              <p className="text-2xl font-bold text-white">$275,250</p>
              <p className="text-xs text-green-400 mt-1">+12.5% vs periodo anterior</p>
            </div>
            <div className="bg-blue-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Clientes Nuevos</h4>
              <p className="text-2xl font-bold text-white">48</p>
              <p className="text-xs text-green-400 mt-1">+8.2% vs periodo anterior</p>
            </div>
            <div className="bg-blue-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Ticket Promedio</h4>
              <p className="text-2xl font-bold text-white">$125.50</p>
              <p className="text-xs text-green-400 mt-1">+5.3% vs periodo anterior</p>
            </div>
            <div className="bg-blue-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Tasa de Conversión</h4>
              <p className="text-2xl font-bold text-white">24.8%</p>
              <p className="text-xs text-red-400 mt-1">-2.1% vs periodo anterior</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Reportes
