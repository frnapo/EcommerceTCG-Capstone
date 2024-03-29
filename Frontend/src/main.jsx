import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
