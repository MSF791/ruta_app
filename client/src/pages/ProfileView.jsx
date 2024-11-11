import { useAuth } from "../hooks/AuthProvider";
import { useForm } from "react-hook-form";
import { EditUser } from "../api/users";
import { ModalLoad } from "../components/modals/ModalLoad";
import { ModalSuccess } from "../components/modals/ModalSuccess";
import { ModalFail } from "../components/modals/ModalFail";
import { useModal } from "../hooks/ModalContext";
import { useEffect } from "react";

function ProfileView() {
  const { isAuthenticated, user } = useAuth();

  const {
    loading,
    success,
    fail,
    failMessage,
    openModalLoad,
    closeModalLoad,
    openModalSuccess,
    closeModalSuccess,
    openModalFail,
    closeModalFail,
  } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  if (isAuthenticated) {
    setValue("email", user.email);
    setValue("cellphone", user.cellphone);
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("id", user.id);
  } else {
    useEffect(() => {
      if (!fail) {
        openModalFail("Por Favor Inicie Sesión");
      }
    }, []);
  }

  const EditUserData = handleSubmit(async (data) => {
    openModalLoad(true);
    try {
      if (isAuthenticated) {
        await EditUser(data);
        openModalSuccess(true);
        closeModalLoad(false);
      }
    } catch (error) {
      closeModalLoad(false);
      failMessage("Vuelvalo a intentar por favor.");
      setFail(true);
    }
  });

  return (
    <div>
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
      <h1 className="text-center mb-3">Perfil</h1>
      <form
        className="max-w-md mx-auto"
        autoComplete="off"
        onSubmit={EditUserData}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Correo
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("first_name", {
                required: "Este campo es obligatorio",
              })}
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("last_name", {
                required: "Este campo es obligatorio",
              })}
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellido
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("cellphone", {
              required: "Este campo es obligatorio",
            })}
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Celular
          </label>
        </div>
        <input
          type="hidden"
          {...register("id", { required: "Por Favor Inicie Sesion" })}
        />
        <div className="flex justify-center items-center">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileView;
