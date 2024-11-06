import { useState } from "react";

export function Login() {
  const [click, setClick] = useState(false);

  const changeSide = () => {
    setClick(!click);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Contenedor principal */}
      <div className="relative flex w-full max-w-[870px] h-[400px] md:h-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Contenedor animado para los formularios */}
        <div
          className={`transition-transform duration-700 transform flex w-full ${
            click ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {/* Columna del formulario de inicio de sesión */}
          <div className="flex-shrink-0 w-full flex items-center justify-center p-6 md:p-8">
            <form className="w-full max-w-sm space-y-6" autoComplete="off">
              <h2 className="text-3xl font-bold text-center">Iniciar Sesión</h2>
              <div>
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700"
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu contraseña"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Iniciar Sesión
              </button>
              <a
                className="text-blue-600 cursor-pointer underline block text-center mt-4"
                onClick={changeSide}
              >
                ¿No tienes cuenta?, regístrate aquí
              </a>
            </form>
          </div>

          {/* Columna del formulario de registro */}
          <div
            className={`flex-shrink-0 w-full flex items-center justify-center p-6 md:p-8 ${
              click ? "block" : "hidden"
            }`}
          >
            <form
              className="w-full max-w-3xl grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 space-y-4 md:space-y-0"
              autoComplete="off"
            >
              <h2 className="text-3xl font-bold text-center col-span-full">
                Registrarse
              </h2>

              <div>
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu usuario"
                />
              </div>

              <div>
                <label
                  htmlFor="first_name"
                  className="block text-md font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-md font-medium text-gray-700"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu apellido"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu correo"
                />
              </div>

              <div>
                <label
                  htmlFor="cellphone"
                  className="block text-md font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="cellphone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu contraseña"
                />
              </div>

              <button
                type="submit"
                className="col-span-full w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Regístrate
              </button>

              <a
                className="text-blue-600 cursor-pointer underline block text-center mt-4"
                onClick={changeSide}
              >
                Inicia Sesion Aqui
              </a>
            </form>
          </div>
        </div>

        {/* Columna de color con botones para cambiar entre formularios */}
        <div className="w-[550px] bg-blue-600 flex-col items-center justify-center text-white z-10 hidden sm:flex">
          {click === false ? (
            <div className="text-center p-2">
              <h2 className="text-2xl font-bold">¡Bienvenido!</h2>
              <p className="mt-2">
                ¿Estás listo para comenzar una nueva aventura?
              </p>
              <button
                className="bg-white p-2 text-black mt-4 rounded-md"
                onClick={changeSide}
              >
                Regístrate Aquí
              </button>
            </div>
          ) : (
            <div className="text-center p-2">
              <h2 className="text-2xl font-bold">¡Regístrate Aquí!</h2>
              <p className="mt-2">
                ¡Disfruta de todas nuestras funciones con tan solo un click!
              </p>
              <button
                className="bg-white p-2 text-black mt-4 rounded-md"
                onClick={changeSide}
              >
                Inicia Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
