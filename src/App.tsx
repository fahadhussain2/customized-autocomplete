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
      <ul className="columns-1 sm:columns-2 mx-auto my-2 md:w-[500px] w-[90vw] text-gray-200">
        {
          suggestions.map((suggestion, index) => {
            return <li key={index}>{suggestion}</li>
          })
        }
      </ul>
      <PryComponent />
    </div>
  );
}

export default App;
