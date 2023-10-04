import PryComponent from "./PryComponent";
import { suggestions } from "./constants";
function App() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center mt-24">
      <h1 className="text-3xl mb-2 font-bold text-white text-center drop-shadow-lg w-full">
        Autocomplete Component
      </h1>
      <p className="mx-auto md:w-[600px] w-[90vw] text-gray-200 font-medium text-center">
        Following are the options that will appear in suggestions:{" "}
      </p>
      <p className="mx-auto md:w-[600px] w-[90vw] mb-2 text-gray-200">
        {suggestions.join(", ")}
      </p>
      <PryComponent />
    </div>
  );
}

export default App;
