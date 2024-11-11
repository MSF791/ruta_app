import { useForm } from "react-hook-form";
import { useState } from "react";
import { ModalSuccess } from "../modals/ModalSuccess";
import { ModalLoad } from "../modals/ModalLoad";
import { ModalFail } from "../modals/ModalFail";
import { LogInToken } from "../../api/login";

export function LoginForm({ changeSide }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const LoginUser = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await LogInToken(data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setFail(true);
      setFailMessage(error.response.data.detail);
      setLoading(false);
    }
  });
  return (
    <div className="flex-shrink-0 w-full flex items-center justify-center p-6 md:p-8">
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
      <form
        className="w-full max-w-sm space-y-6"
        autoComplete="off"
        onSubmit={LoginUser}
      >
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
            id="username_login"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
            placeholder="Tu nombre de usuario"
            {...register("username", { required: "Este Campo Es Obligatorio" })}
          />
          {errors.username && errors.username.message && (
            <span className="text-red-700">{errors.username.message}</span>
          )}
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
            id="password_login"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
            placeholder="Tu contraseña"
            {...register("password", { required: "Este Campo Es Obligatorio" })}
          />
          {errors.password && errors.password.message && (
            <span className="text-red-700">{errors.password.message}</span>
          )}
        </div>
        <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
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
  );
}
