// index.js
import React from "react";
import { createRoot } from "react-dom/client"; // ✅ React 18 API
import { Provider } from "react-redux"; // ✅ uppercase Provider
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";
import App from "./App";

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store with middleware
const store = createStore(
  rootReducer,
  composeEnchancer(applyMiddleware(thunk))
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

