import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>

  );
}

export default App;
