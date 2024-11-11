import WeatherView from "../components/Weather/WeatherView";
import MapsView from "../components/maps/MapsView";

export function RouteView({ form }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl text-center font-extrabold mb-4">Clima Actual</h1>
        <WeatherView/>
      </div>
      <div>
        <MapsView form={form}/>
      </div>
    </div>
  );
}
