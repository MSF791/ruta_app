import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importa el ícono de éxito de Font Awesome

export function ModalSuccess({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        {/* Contenido del Modal */}
        <div className="text-center text-black">
          {/* Ícono de Éxito */}
          <div className="flex justify-center mb-2">
            <FaCheckCircle className="text-green-500" size={64} /> {/* Ícono de éxito con color y tamaño */}
          </div>

          <h2 className="text-2xl font-bold mb-4">¡Operación Exitosa!</h2>
          <p className="text-gray-600 mb-6">Su operación se ha completado exitosamente.</p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
