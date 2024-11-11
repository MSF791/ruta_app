//React
import { useState } from "react";

//components
import MainContent from "../components/MainContent";
import { Login } from "../components/LoginView";
import ProfileView from "./ProfileView";
import { useAuth } from "../hooks/AuthProvider";
import { RouteView } from "./RouteView";
import FormRouteView from "../components/maps/FormRoute";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const { isAuthenticated, logOut } = useAuth();

  const LoginView = () => {
    setActiveComponent("login");
  };

  const ProfileViewClick = () => {
    setSidebarOpen(false);
    setActiveComponent("profile");
  };

  const RouteViewClick = () => {
    setSidebarOpen(false)
    setActiveComponent("route_view")
  }

  const FormRouteViewClick = () => {
    setActiveComponent("form_route")
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "login":
        return (
          <div>
            <Login />
          </div>
        );
      case "profile":
        return (
          <div>
            <ProfileView />
          </div>
        );
      case "route_view":
        return (
          <div>
            <RouteView form={FormRouteViewClick}/>
          </div>
        )
      case "form_route":
        return (
          <div>
            <FormRouteView/>
          </div>
        )
      default:
        return (
          <div>
            <MainContent />
          </div>
        );
    }
  };

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
              <a
                onClick={ProfileViewClick}
                className="text-white hover:text-blue-200 cursor-pointer"
              >
                Perfil
              </a>
            </li>
            <li className="my-2">
              <a onClick={RouteViewClick} className="text-white hover:text-blue-200 cursor-pointer">
                Planear Rutas 
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={
          sidebarOpen
            ? "flex-1 flex flex-col ml-0 blur-sm"
            : "flex-1 flex flex-col ml-0"
        }
      >
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-700 text-2xl"
          >
            ☰
          </button>
          <div className="flex">
            {isAuthenticated ? (
              <button
                className="bg-red-600 rounded-lg text-white p-2 shadow-lg mr-4 hover:bg-red-700 ease-in-out"
                onClick={logOut}
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                className="bg-blue-600 rounded-lg text-white p-2 shadow-lg mr-4 hover:bg-blue-700 ease-in-out"
                onClick={LoginView}
              >
                Iniciar Sesión - Registro
              </button>
            )}
          </div>
        </header>

        <main className={sidebarOpen ? "flex-1 p-6 blur-sm" : "flex-1 p-6"}>
          {renderComponent()}
        </main>

        {/* Footer */}
        <footer
          className={
            sidebarOpen
              ? "bg-blue-700 text-white text-center p-4 blur-sm"
              : "bg-blue-700 text-white text-center p-4"
          }
        >
          © 2024 - Julian Tique
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
