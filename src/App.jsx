import React from "react";
import generateStore from "./redux/store";
import Pokemones from "./components/Pokemones";
import { Provider } from "react-redux";

function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <div className="container mt-1">
        <Pokemones />
      </div>
    </Provider>
  );
}

export default App;
