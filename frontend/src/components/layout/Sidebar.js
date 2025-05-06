"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FiLayout,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiLifeBuoy,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <FiLayout className="h-5 w-5" />,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: <FiUsers className="h-5 w-5" />,
  },
  {
    title: "Proveedores",
    href: "/proveedores",
    icon: <FiPackage className="h-5 w-5" />,
  },
  {
    title: "Ventas",
    href: "/ventas",
    icon: <FiShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Soporte",
    href: "/soporte",
    icon: <FiLifeBuoy className="h-5 w-5" />,
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: <FiBarChart2 className="h-5 w-5" />,
  },
]

const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`relative h-screen border-r bg-blue-dark-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-blue-dark-700 px-4">
        <h1 className={`text-xl font-bold text-white transition-opacity ${collapsed ? "opacity-0" : "opacity-100"}`}>
          Vape CRM
        </h1>
        <button className="text-white hover:bg-blue-dark-700 p-1 rounded-md" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
              location.pathname === item.href
                ? "bg-blue-dark-600 text-white"
                : "text-gray-300 hover:bg-blue-dark-700 hover:text-white"
            }`}
          >
            {item.icon}
            <span className={`transition-opacity ${collapsed ? "opacity-0 hidden" : "opacity-100"}`}>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
