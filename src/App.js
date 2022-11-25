import "./App.css";
import routers from "./Routes/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* px-4 md:px-24 lg:px-8 mx-auto md:max-w-full lg:max-w-screen-2xl */}
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
