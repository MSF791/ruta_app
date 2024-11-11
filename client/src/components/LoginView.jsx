import { useState } from "react";
import { useForm } from "react-hook-form";
import { SaveUser } from "../api/users";
import { LoginForm } from "./login/LoginForm";
import { ModalSuccess } from "./modals/ModalSuccess";
import { ModalLoad } from "./modals/ModalLoad";
import { ModalFail } from "./modals/ModalFail";

export function Login() {
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const closeModalFail = () => {
    setFail(false);
  };

  const openModalFail = () => {
    setFail(true);
  };

  const closeModalSuccess = () => {
    setSuccess(false);
  };

  const openModalSuccess = () => {
    setSuccess(true);
  };

  const openModalLoad = () => {
    setLoading(true);
  };

  const changeSide = () => {
    setClick(!click);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await SaveUser(data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const e = error.response?.data?.detail;

      if (e === "El nombre de usuario ya está en uso.") {
        setFailMessage("El nombre de usuario ya existe.");
      } else {
        setFailMessage("Por favor vuelva a intentarlo.");
      }

      setFail(true);
    }
  });

  return (
    <div className="flex min-h-screen justify-center p-4">
      {/* Contenedor principal */}
      <div className="relative flex w-full max-w-[870px] h-auto md:h-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Contenedor animado para los formularios */}
        <div
          className={`transition-transform duration-700 transform flex w-full ${
            click ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {/* Columna del formulario de inicio de sesión */}
          <LoginForm changeSide={changeSide}/>

          {/* Columna del formulario de registro */}
          <div
            className={`flex-shrink-0 w-full flex items-center justify-center p-6 md:p-8 overflow-y-auto ${
              click ? "block" : "hidden"
            }`}
          >
            <form
              className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 space-y-6"
              autoComplete="off"
              onSubmit={registerUser}
            >
              <h2 className="text-3xl font-bold text-center col-span-full">
                Registrarse
              </h2>

              <div>
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700"
                >
                  Usuario <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu usuario"
                  {...register("username", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.username && errors.username.message && (
                  <span className="text-red-700">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="first_name"
                  className="block text-md font-medium text-gray-700"
                >
                  Nombre <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu nombre"
                  {...register("first_name", {
                    required: "Este Campo Es Obligatorio",
                  })}
                />
                {errors.first_name && errors.first_name.message && (
                  <span className="text-red-700">
                    {errors.first_name.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-md font-medium text-gray-700"
                >
                  Apellido <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu apellido"
                  {...register("last_name", {
                    required: "Este Campo Es Obligatorio",
                  })}
                />
                {errors.last_name && errors.last_name.message && (
                  <span className="text-red-700">
                    {errors.last_name.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  Correo Electrónico <span className="text-red-700">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu correo"
                  {...register("email", {
                    required: "Este Campo Es Obligatorio",
                  })}
                />
                {errors.email && errors.email.message && (
                  <span className="text-red-700">{errors.email.message}</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="cellphone"
                  className="block text-md font-medium text-gray-700"
                >
                  Teléfono <span className="text-red-700">*</span>
                </label>
                <input
                  type="tel"
                  id="cellphone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu teléfono"
                  {...register("cellphone", {
                    required: "Este Campo Es Obligatorio",
                  })}
                />
                {errors.cellphone && errors.cellphone.message && (
                  <span className="text-red-700">
                    {errors.cellphone.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700"
                >
                  Contraseña <span className="text-red-700">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
                  placeholder="Tu contraseña"
                  {...register("password", {
                    required: "Este Campo Es Obligatorio",
                  })}
                />
                {errors.password && errors.password.message && (
                  <span className="text-red-700">
                    {errors.password.message}
                  </span>
                )}
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
                className="bg-white p-2 text-black mt-4 rounded-md ease-in-out transition duration-150 hover:text-white hover:bg-transparent hover:border"
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
                className="bg-white p-2 text-black mt-4 rounded-md ease-in-out transition duration-150 hover:text-white hover:bg-transparent hover:border"
                onClick={changeSide}
              >
                Inicia Sesión
              </button>
              <br />
            </div>
          )}
        </div>
      </div>
      {/* Modal de carga */}
      {loading && <ModalLoad isOpen={openModalLoad} />}

      {/* Modal de éxito */}
      {success && (
        <ModalSuccess isOpen={openModalSuccess} onClose={closeModalSuccess} />
      )}

      {/* Modal de fallo */}
      {fail && (
        <ModalFail
          isOpen={openModalFail}
          onClose={closeModalFail}
          errorMessage={failMessage}
        />
      )}
    </div>
  );
}
