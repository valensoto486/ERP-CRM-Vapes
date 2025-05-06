import Sidebar from "./Sidebar"
import Header from "./Header"

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-blue-dark-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-blue-dark-900">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
