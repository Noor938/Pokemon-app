import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloContextProvider } from "./context/ApolloContext";

ReactDOM.render(
  <React.StrictMode>
    <ApolloContextProvider>
      <App />
    </ApolloContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
