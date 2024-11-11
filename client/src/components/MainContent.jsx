import React from "react";
import Typewriter from "react-typewriter-effect";
import { FaHiking, FaBiking, FaRunning, FaMapMarkedAlt, FaCloudSun } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-50">
      
      {/* Hero Section */}
      <header className="w-full py-16 px-4 text-center flex flex-col items-center">
        <div className="mb-4">
          <Typewriter
            textStyle={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#333",
            }}
            startDelay={100}
            cursorColor="black"
            text="Bienvenido a Adventure Planner!"
            typeSpeed={75}
            hideCursorAfterText={true}
          />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl">
          Planifica tus aventuras al aire libre con rutas óptimas y datos climáticos en tiempo real.
          Ideal para aficionados a la naturaleza y deportistas.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition ease-in-out">
          Explora Rutas Cercanas
        </button>
      </header>

      {/* Features Section */}
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-gray-800">
          Características Principales
        </h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl px-4">
          {/* Feature 1 */}
          <div className="text-center p-4 bg-blue-100 rounded-lg shadow-md w-64">
            <FaCloudSun className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Clima en Tiempo Real</h3>
            <p className="text-gray-600">Consulta las condiciones climáticas actuales en tu ubicación para planificar de manera segura.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-4 bg-green-100 rounded-lg shadow-md w-64">
            <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Rutas Cercanas</h3>
            <p className="text-gray-600">Encuentra las mejores rutas para senderismo, ciclismo, o correr cerca de ti.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-4 bg-yellow-100 rounded-lg shadow-md w-64">
            <FaHiking className="text-4xl text-yellow-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Senderismo</h3>
            <p className="text-gray-600">Explora rutas de senderismo adaptadas a tus preferencias y nivel de dificultad.</p>
          </div>

          {/* Feature 4 */}
          <div className="text-center p-4 bg-purple-100 rounded-lg shadow-md w-64">
            <FaBiking className="text-4xl text-purple-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Ciclismo</h3>
            <p className="text-gray-600">Descubre rutas de ciclismo recomendadas y seguras en tu área.</p>
          </div>

          {/* Feature 5 */}
          <div className="text-center p-4 bg-red-100 rounded-lg shadow-md w-64">
            <FaRunning className="text-4xl text-red-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Rutas para Correr</h3>
            <p className="text-gray-600">Encuentra rutas para correr y mantén tu entrenamiento en cualquier lugar.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full py-16 px-4 bg-blue-200 flex flex-col items-center">
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
          Únete a Nuestra Comunidad de Aventureros
        </h2>
        <p className="text-center max-w-xl text-gray-700 mb-8">
          Accede a información en tiempo real, comparte tus rutas favoritas y mantente conectado con otros amantes de la naturaleza.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition ease-in-out">
          Comenzar Ahora
        </button>
      </section>
    </div>
  );
}
