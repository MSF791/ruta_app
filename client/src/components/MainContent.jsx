import Typewriter from "react-typewriter-effect";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16">
      <div className="flex justify-center items-center h-full">
        <Typewriter
          textStyle={{
            fontSize: "2rem", // Tamaño de fuente base
            fontWeight: "bold",
            color: "#000000",
          }}
          startDelay={100}
          cursorColor="black"
          text="Bienvenido!"
          typeSpeed={85}
          hideCursorAfterText={true}
        />
      </div>

      <div className="mt-3 md:mt-5 lg:mt-8">
        <p className="text-center text-sm md:text-base lg:text-lg font-medium text-gray-700">
          Aquí podrás planear las mejores rutas para enfrentarte a todo tipo de
          retos. <br />
          Podrás ver el clima en tiempo real con tu ubicación.
        </p>
      </div>
    </div>
  );
}
