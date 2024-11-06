//React
import { useState } from "react";

//components
import MainContent from "../components/MainContent";
import { Login } from "../components/Login";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleHomeClick = () => {
    setActiveComponent("");
  };

  const LoginView = () => {
    setActiveComponent("login")
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "login":
        return (
          <div>
             <Login/>
          </div>
        );
    default:
      return(
        <div>
            <MainContent />
        </div>
      )
      
    }
  }

  return (
    <div className="min-h-screen flex bg-blue-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-blue-700 text-white w-64 p-5 z-20`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-right text-white mb-4"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-4">Menu</h2>
        <nav>
          <ul className="text-xl">
            <li className="my-2">
              <a href="/" className="text-white hover:text-blue-200">
                Inicio
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-white hover:text-blue-200">
                Perfil
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-white hover:text-blue-200">
                Configuración
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className={sidebarOpen ? "flex-1 flex flex-col ml-0 blur-sm" : "flex-1 flex flex-col ml-0"}>
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-700 text-2xl"
          >
            ☰
          </button>
          <div className="flex">
          <button className="bg-blue-600 rounded-lg text-white p-2 shadow-lg mr-4 hover:bg-blue-700 ease-in-out" onClick={LoginView}>Iniciar Sesión - Registro</button>
          </div>
        </header>

        <main className={sidebarOpen ? "flex-1 p-6 blur-sm" : "flex-1 p-6"}>
          {renderComponent()}
        </main>

        {/* Footer */}
        <footer className={sidebarOpen ? "bg-blue-700 text-white text-center p-4 blur-sm" : "bg-blue-700 text-white text-center p-4"}>
          © 2024 - Julian Tique
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
