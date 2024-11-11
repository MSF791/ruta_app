import React from "react";
import { FaSpinner } from "react-icons/fa"; // Importa el ícono de spinner para animación de carga

export function ModalLoad({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-xs sm:max-w-sm p-4 sm:p-6 rounded-lg shadow-lg flex flex-col items-center">
        
        {/* Ícono de Carga con Animación */}
        <FaSpinner className="text-blue-500 text-3xl sm:text-5xl animate-spin" />
        
        {/* Mensaje de Carga */}
        <h2 className="mt-2 sm:mt-4 text-base sm:text-lg font-medium text-gray-700 text-center">Cargando...</h2>
      </div>
    </div>
  );
}
