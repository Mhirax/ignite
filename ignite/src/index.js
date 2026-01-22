// index.js
import React from "react";
import { createRoot } from "react-dom/client"; // ✅ React 18 API
import { Provider } from "react-redux"; // ✅ uppercase Provider
import { createStore } from "redux";
import rootReducer from "./reducers";

import App from "./App";

// Create store with middleware
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Render with createRoot (React 18+)
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
