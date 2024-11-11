import { useAuth } from "../../hooks/AuthProvider";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ModalLoad } from "../../components/modals/ModalLoad";
import { ModalSuccess } from "../../components/modals/ModalSuccess";
import { ModalFail } from "../../components/modals/ModalFail";
import { useModal } from "../../hooks/ModalContext";
import { SaveRoute } from "../../api/routes";

function FormRouteView() {
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
    setValue("id", user.id);
  } else {
    useEffect(() => {
      if (!fail) {
        openModalFail("Por Favor Inicie Sesión");
      }
    }, []);
  }

  const [map, setMap] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [waypoints, setWaypoints] = useState([]); // Puntos intermedios
  const [routeLine, setRouteLine] = useState(null); // Línea entre puntos

  useEffect(() => {
    const newMap = L.map("map").setView([4.60971, -74.08175], 10); // Coordenadas de Bogotá
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(newMap);

    setMap(newMap);

    // Limpiar el mapa cuando el componente se desmonta
    return () => {
      newMap.remove();
    };
  }, []);

  const addMarker = (coords, popupText, removeCallback) => {
    const marker = L.marker(coords).addTo(map);

    // Añadir tooltip que muestra el texto en hover
    marker.bindTooltip(popupText, { permanent: false, direction: "top" });

    // Evento para eliminar el marcador al hacer clic
    marker.on("click", () => {
      map.removeLayer(marker); // Remueve el marcador del mapa
      removeCallback(); // Actualiza el estado
    });
  };

  const updateRouteLine = () => {
    // Elimina la línea anterior si existe
    if (routeLine) {
      map.removeLayer(routeLine);
    }

    // Crea una nueva línea entre los puntos de inicio y destino
    if (startPoint && endPoint) {
      const newLine = L.polyline([startPoint, ...waypoints, endPoint], {
        color: "blue",
        weight: 4,
      }).addTo(map);
      setRouteLine(newLine);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;

    if (!startPoint) {
      setStartPoint([lat, lng]);
      addMarker([lat, lng], "Punto de inicio", () => setStartPoint(null));
    } else if (!endPoint) {
      setEndPoint([lat, lng]);
      addMarker([lat, lng], "Punto de destino", () => setEndPoint(null));
    } else {
      const newWaypoint = [lat, lng];
      setWaypoints([...waypoints, newWaypoint]);
      addMarker(newWaypoint, "Punto intermedio", () =>
        setWaypoints(waypoints.filter((wp) => wp !== newWaypoint))
      );
    }
  };

  // Actualiza la línea cada vez que se establece el punto de inicio, fin o puntos intermedios
  useEffect(() => {
    updateRouteLine();
  }, [startPoint, endPoint, waypoints]);

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map, startPoint, endPoint, waypoints]);

  if(startPoint && endPoint){
    setValue("punto_inicio", startPoint.join(", "))
    setValue("punto_destino", endPoint.join(", "))
  }
  if(waypoints){
    setValue("punto_intermedios", waypoints.join(", "))
  }

  const SaveRouteForm = handleSubmit(async (data) => {
    try{
      if (isAuthenticated) {
        console.log(data)
        await SaveRoute (data);
        openModalSuccess(true);
        closeModalLoad(false);
      }
    }catch(error){
      closeModalLoad(false);
      openModalFail("Por favor vuelvalo a intentar")
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

      {fail && (
        <ModalFail
          isOpen={fail} // Cambia openModalFail a fail
          onClose={closeModalFail}
          errorMessage={failMessage}
        />
      )}

      <form
        className="max-w-md mx-auto"
        autoComplete="off"
        onSubmit={SaveRouteForm}
      >
        <h1 className="text-2xl font-extrabold text-center mb-2">
          Planear Ruta
        </h1>
        <p className="mb-2">
          Info: El primer click indicará el punto de inicio, el segundo el punto
          de destino, y el resto de clicks serán para puntos intermedios
        </p>
        <div id="map" className="z-0 w-full h-[400px]"></div>
        <div className="my-4">
          <h2 className="text-xl font-bold">Detalles de la Ruta:</h2>
          <p>
            Punto de inicio:{" "}
            {startPoint ? startPoint.join(", ") : "No definido"}
          </p>
          <p>
            Punto de destino: {endPoint ? endPoint.join(", ") : "No definido"}
          </p>
          <p>Puntos intermedios:</p>
          <ul>
            {waypoints.map((point, index) => (
              <li key={index}>{point.join(", ")}</li>
            ))}
          </ul>
        </div>
        <input
          type="hidden"
          {...register("punto_inicio")}
        />
        <input
          type="hidden"
          {...register("punto_destino")}
        />
        <input
          type="hidden"
          {...register("punto_intermedios")}
        />
        <div className="relative z-0 w-full mt-2 mb-5 group">
          <input
            type="text"
            id="tipo_transporte"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("tipo_transporte", {
              required: "Este campo es obligatorio",
            })}
          />
          <label
            htmlFor="tipo_transporte"
            className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo Trasporte
          </label>
        </div>
        <div className="relative z-0 w-full mt-2 mb-5 group">
          <input
            type="text"
            id="nombre_ruta"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("nombre_ruta", {
              required: "Este campo es obligatorio",
            })}
          />
          <label
            htmlFor="nombre_ruta"
            className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre De La Ruta (opcional)
          </label>
        </div>
        <input
          type="hidden"
          {...register("id", { required: "Por Favor Inicie Sesion" })}
        />
        <div className="relative z-0 w-full mt-2 mb-5 group">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Selecciona una opcion
          </label>
          <select
            id="countries"
            // {...register("dificulty", {
            //   required: "Este campo es obligatorio",
            // })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option disabled defaultValue="easy">
              Nivel De Dificultad
            </option>
            <option value="easy">Principiante</option>
            <option value="normal">Amateur</option>
            <option value="hard">Dificil</option>
            <option value="very_hard">Profesional</option>
          </select>
        </div>

        {errors.id && (
          <span className="text-red-600 mb-3">{errors.id.message}</span>
        )}
        <div className="flex justify-center items-center">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRouteView;
